/*
  # Initial Database Schema

  1. New Tables
    - `agents`: Stores AI agent configurations and metadata
    - `user_agents`: Links users with their employed agents
    - `credits`: Tracks user credit balances
    - `searches`: Stores search history and results
    - `test_searches`: Tracks free test search usage
    - `waitlist`: Manages waitlist signups

  2. Security
    - RLS enabled on all tables
    - Policies for authenticated access
    - Secure credit management

  3. Changes
    - Initial schema creation
    - Basic data seeding
*/

-- Enable UUID extension
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
    created_at timestamptz default now() not null
);

-- Create user_agents table
create table if not exists public.user_agents (
    user_id uuid references auth.users(id) on delete cascade,
    agent_id text references agents(id) on delete cascade,
    settings jsonb default '{}'::jsonb,
    is_active boolean default true,
    last_used timestamptz,
    created_at timestamptz default now() not null,
    primary key (user_id, agent_id)
);

-- Create credits table
create table if not exists public.credits (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    amount integer default 0,
    last_updated timestamptz default now() not null
);

-- Create searches table
create table if not exists public.searches (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    agent_id text references agents(id) on delete cascade not null,
    keywords text[] not null,
    location jsonb not null,
    num_results integer not null,
    status text default 'pending' not null,
    results jsonb,
    created_at timestamptz default now() not null,
    completed_at timestamptz
);

-- Create test_searches table
create table if not exists public.test_searches (
    user_id uuid references auth.users(id) on delete cascade primary key,
    last_used timestamptz not null,
    created_at timestamptz default now() not null
);

-- Create waitlist table
create table if not exists public.waitlist (
    id uuid default uuid_generate_v4() primary key,
    email text unique not null,
    status text default 'pending' not null,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.agents enable row level security;
alter table public.user_agents enable row level security;
alter table public.credits enable row level security;
alter table public.searches enable row level security;
alter table public.test_searches enable row level security;
alter table public.waitlist enable row level security;

-- Agents policies
create policy "Agents are viewable by authenticated users" on public.agents
    for select to authenticated using (true);

-- User agents policies
create policy "Users can manage their own agents" on public.user_agents
    for all to authenticated using (auth.uid() = user_id);

-- Credits policies
create policy "Users can view their own credits" on public.credits
    for select to authenticated using (auth.uid() = user_id);

-- Searches policies
create policy "Users can manage their own searches" on public.searches
    for all to authenticated using (auth.uid() = user_id);

-- Test searches policies
create policy "Users can manage their test searches" on public.test_searches
    for all to authenticated using (auth.uid() = user_id);

-- Waitlist policies
create policy "Anyone can join waitlist" on public.waitlist
    for insert to anon, authenticated with check (true);

create policy "Users can view their waitlist status" on public.waitlist
    for select to authenticated using (auth.uid()::text = metadata->>'user_id');

-- Insert default agent (Leadsy)
insert into public.agents (id, name, description, category, icon, credit_cost)
values (
    'leadsy',
    'Leadsy',
    'Advanced lead generation from Google Maps',
    'lead_generation',
    'users',
    1
) on conflict (id) do nothing;

-- Create helper functions
create or replace function public.initialize_user_credits()
returns trigger
language plpgsql security definer
as $$
begin
    insert into public.credits (user_id, amount)
    values (new.id, 100); -- Give 100 free credits to new users
    return new;
end;
$$;

-- Trigger to initialize credits for new users
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.initialize_user_credits();

-- Function to check waitlist email
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