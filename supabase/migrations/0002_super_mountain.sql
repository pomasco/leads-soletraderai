/*
  # Update Role System Schema

  1. New Tables
    - `roles`: Defines available roles in the system
    - `user_roles`: Maps users to their roles
    - `organizations`: Stores company and agency details
    - `organization_members`: Maps users to organizations with roles
    - `verification_requests`: Tracks business verification status

  2. Security
    - Enable RLS on all new tables
    - Add policies for role-based access control
    - Add verification status checks

  3. Changes
    - Add role management functions
    - Add verification request handling
*/

-- Create roles table
create table if not exists public.roles (
    id text primary key,
    name text not null,
    description text,
    core_role text not null,
    capabilities text[] not null default '{}',
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null
);

-- Create user_roles table
create table if not exists public.user_roles (
    user_id uuid references auth.users(id) on delete cascade,
    role_id text references roles(id) on delete cascade,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null,
    primary key (user_id, role_id)
);

-- Create organizations table
create table if not exists public.organizations (
    id uuid default uuid_generate_v4() primary key,
    type text not null check (type in ('company', 'agency')),
    name text not null,
    business_number text, -- ABN/ACN for Australian companies
    country text not null,
    verification_status text not null default 'pending' check (verification_status in ('pending', 'verified', 'rejected')),
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- Create organization_members table
create table if not exists public.organization_members (
    organization_id uuid references organizations(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    role_id text references roles(id) on delete cascade,
    is_owner boolean default false,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null,
    primary key (organization_id, user_id)
);

-- Create verification_requests table
create table if not exists public.verification_requests (
    id uuid default uuid_generate_v4() primary key,
    organization_id uuid references organizations(id) on delete cascade,
    status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
    verification_fields jsonb not null,
    reviewer_id uuid references auth.users(id),
    reviewed_at timestamptz,
    created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.verification_requests enable row level security;

-- Roles policies
create policy "Roles are viewable by all authenticated users"
    on public.roles for select
    to authenticated
    using (true);

-- User roles policies
create policy "Users can view their own roles"
    on public.user_roles for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Admins can manage user roles"
    on public.user_roles for all
    to authenticated
    using (
        exists (
            select 1 from public.user_roles ur
            where ur.user_id = auth.uid()
            and ur.role_id = 'admin'
        )
    );

-- Organizations policies
create policy "Organizations are viewable by members"
    on public.organizations for select
    to authenticated
    using (
        exists (
            select 1 from public.organization_members om
            where om.organization_id = id
            and om.user_id = auth.uid()
        )
    );

create policy "Organizations can be created by authenticated users"
    on public.organizations for insert
    to authenticated
    with check (true);

create policy "Organizations can be updated by owners"
    on public.organizations for update
    to authenticated
    using (
        exists (
            select 1 from public.organization_members om
            where om.organization_id = id
            and om.user_id = auth.uid()
            and om.is_owner = true
        )
    );

-- Organization members policies
create policy "Organization members are viewable by organization members"
    on public.organization_members for select
    to authenticated
    using (
        exists (
            select 1 from public.organization_members om
            where om.organization_id = organization_id
            and om.user_id = auth.uid()
        )
    );

create policy "Organization owners can manage members"
    on public.organization_members for all
    to authenticated
    using (
        exists (
            select 1 from public.organization_members om
            where om.organization_id = organization_id
            and om.user_id = auth.uid()
            and om.is_owner = true
        )
    );

-- Verification requests policies
create policy "Verification requests are viewable by organization members"
    on public.verification_requests for select
    to authenticated
    using (
        exists (
            select 1 from public.organization_members om
            where om.organization_id = organization_id
            and om.user_id = auth.uid()
        )
    );

create policy "Organizations can create verification requests"
    on public.verification_requests for insert
    to authenticated
    with check (
        exists (
            select 1 from public.organization_members om
            where om.organization_id = organization_id
            and om.user_id = auth.uid()
            and om.is_owner = true
        )
    );

create policy "Admins can manage verification requests"
    on public.verification_requests for all
    to authenticated
    using (
        exists (
            select 1 from public.user_roles ur
            where ur.user_id = auth.uid()
            and ur.role_id = 'admin'
        )
    );

-- Insert default roles
insert into public.roles (id, name, description, core_role, capabilities, metadata) values
    ('admin', 'Admin', 'Platform administrator with full system access', 'service_role', 
     array['MANAGE_USERS', 'MANAGE_PLATFORM', 'VIEW_ANALYTICS', 'MANAGE_INTEGRATIONS', 'APPROVE_AI_REQUESTS'],
     '{"system": true}'::jsonb),
    ('company', 'Company', 'Registered business entity', 'authenticated',
     array['MANAGE_COMPANY', 'MANAGE_TEAM', 'VIEW_COMPANY_ANALYTICS', 'MANAGE_WORKFLOWS'],
     '{"requiresVerification": true, "verificationFields": ["abn", "acn"]}'::jsonb),
    ('agency', 'Agency', 'Service provider managing client workflows', 'authenticated',
     array['MANAGE_CLIENT_WORKFLOWS', 'VIEW_CLIENT_ANALYTICS', 'MANAGE_AGENCY_MEMBERS'],
     '{"requiresVerification": true, "verificationFields": ["abn", "acn"]}'::jsonb),
    ('authorized_user', 'Authorized User', 'Verified individual user', 'authenticated',
     array['MANAGE_PERSONAL_AGENTS', 'CONFIGURE_WORKFLOWS', 'ACCESS_DASHBOARD'],
     '{}'::jsonb),
    ('team_member', 'Team Member', 'Company team member', 'authenticated',
     array['ACCESS_COMPANY_RESOURCES', 'USE_COMPANY_WORKFLOWS'],
     '{"requiresInvite": true}'::jsonb),
    ('agency_member', 'Agency Member', 'Agency team member', 'authenticated',
     array['MANAGE_CLIENT_WORKFLOWS', 'VIEW_CLIENT_ANALYTICS'],
     '{"requiresInvite": true}'::jsonb)
on conflict (id) do nothing;

-- Helper functions
create or replace function public.get_user_roles(p_user_id uuid)
returns setof public.roles
language sql
security definer
as $$
    select r.* from public.roles r
    inner join public.user_roles ur on ur.role_id = r.id
    where ur.user_id = p_user_id;
$$;

create or replace function public.has_capability(p_user_id uuid, p_capability text)
returns boolean
language sql
security definer
as $$
    select exists (
        select 1 from public.user_roles ur
        inner join public.roles r on r.id = ur.role_id
        where ur.user_id = p_user_id
        and p_capability = any(r.capabilities)
    );
$$;

-- Trigger to update organizations.updated_at
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger update_organizations_updated_at
    before update on public.organizations
    for each row
    execute function public.update_updated_at_column();