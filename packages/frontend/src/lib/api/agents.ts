import { supabase } from '../supabase';
import type { Agent } from '@/types/agents';

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const { data, error } = await supabase
    .from('agents')
    .select(`
      id,
      slug,
      name,
      title,
      description,
      short_description,
      long_description,
      features,
      icon,
      credit_cost,
      categories,
      tags,
      developer,
      avatar,
      services,
      process
    `)
    .eq('slug', slug)
    .maybeSingle();

  console.log('Supabase Response:', data); // Log the fetched data for debugging

  if (error) {
    console.error('Supabase Error:', error);
    throw new Error(`Failed to fetch agent: ${error.message}`);
  }

  if (!data || !data.process) {
    throw new Error('Process data not found for this agent'); // Ensure process exists
  }

  return data;
}
