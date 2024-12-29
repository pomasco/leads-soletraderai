import { supabase } from './supabase';

export async function initializeDatabase() {
  const { error: agentsError } = await supabase.rpc('initialize_agents_schema', {});
  if (agentsError) {
    console.error('Error initializing agents schema:', agentsError);
    throw agentsError;
  }
}

// SQL functions to be executed in Supabase SQL editor:
/*
-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create agents table
create table if not exists public.agents (
    id text primary key,
    name text not null,
    description text,
    category text,
    icon text,
    credit_cost integer default 1,
    webhook_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_agents table
create table if not exists public.user_agents (
    user_id uuid references auth.users(id),
    agent_id text references agents(id),
    settings jsonb default '{}'::jsonb,
    is_active boolean default true,
    last_used timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (user_id, agent_id)
);

-- Insert Leadsy agent
insert into public.agents (id, name, description, category, icon, credit_cost)
values (
    'leadsy',
    'Leadsy',
    'Advanced lead generation from Google Maps',
    'lead_generation',
    'users',
    1
) on conflict (id) do nothing;

-- Set up RLS
alter table public.agents enable row level security;
alter table public.user_agents enable row level security;

-- Allow users to view agents
create policy "Allow users to view agents" on public.agents
    for select
    to authenticated
    using (true);

-- Allow users to manage their own agents
create policy "Allow users to manage their agents" on public.user_agents
    for all
    to authenticated
    using (auth.uid() = user_id);
*/

// SQL functions to be executed in Supabase SQL editor:
/*
-- Create agents table
create table if not exists public.agents (
    id text primary key,
    name text not null,
    description text,
    category text,
    icon text,
    credit_cost integer default 1,
    webhook_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_agents table
create table if not exists public.user_agents (
    user_id uuid references auth.users(id),
    agent_id text references agents(id),
    settings jsonb default '{}'::jsonb,
    is_active boolean default true,
    last_used timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (user_id, agent_id)
);

-- Insert Leadsy agent
insert into public.agents (id, name, description, category, icon, credit_cost)
values (
    'leadsy',
    'Leadsy',
    'Advanced lead generation from Google Maps',
    'lead_generation',
    'users',
    1
) on conflict (id) do nothing;

-- Set up RLS
alter table public.agents enable row level security;
alter table public.user_agents enable row level security;

-- Allow users to view agents
create policy "Allow users to view agents" on public.agents
    for select
    to authenticated
    using (true);

-- Allow users to manage their own agents
create policy "Allow users to manage their agents" on public.user_agents
    for all
    to authenticated
    using (auth.uid() = user_id);

-- Create test_searches table
create table if not exists public.test_searches (
    user_id uuid references auth.users(id) primary key,
    last_used timestamp with time zone not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for test_searches
alter table public.test_searches enable row level security;

-- Allow users to manage their own test searches
create policy "Allow users to manage their test searches" on public.test_searches
    for all
    to authenticated
    using (auth.uid() = user_id);

-- Create function to initialize agents schema
create or replace function public.initialize_agents_schema()
returns void
language plpgsql security definer
as $$
begin
  -- Create tables and policies here
  -- (Copy the above SQL statements)
end;
$$;

-- Waitlist schema
create table if not exists public.waitlist (
    id uuid default uuid_generate_v4() primary key,
    email text unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    status text default 'pending'::text not null,
    metadata jsonb default '{}'::jsonb
);

-- Set up RLS (Row Level Security)
alter table public.waitlist enable row level security;

-- Create policy to allow inserts from authenticated and anonymous users
create policy "Allow anonymous inserts to waitlist" on public.waitlist
    for insert
    to anon, authenticated
    with check (true);

-- Create policy to allow users to view their own entries
create policy "Users can view own entries" on public.waitlist
    for select
    to authenticated
    using (auth.uid() = id);

-- Create indexes
create index if not exists waitlist_email_idx on public.waitlist (email);
create index if not exists waitlist_created_at_idx on public.waitlist (created_at);
create index if not exists waitlist_status_idx on public.waitlist (status);

-- Function to check if email exists
create or replace function public.check_waitlist_email(email_address text)
returns boolean
language plpgsql security definer
as $$
begin
  return exists (
    select 1 from public.waitlist where email = email_address
  );
end;
$$;
*/