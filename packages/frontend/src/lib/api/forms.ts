import { supabase } from '../supabase';

export interface FormField {
  type: string;
  label: string;
  description: string;
  required: boolean;
  maxItems?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface FormConfig {
  fields: FormField[];
  validation: {
    minKeywords: number;
    maxKeywords: number;
    minResults: number;
    maxResults: number;
  };
  metadata: {
    version: string;
    lastUpdated: string;
  };
}

export interface AgentForm {
  id: string;
  agent_id: string;
  form_type: string;
  config: FormConfig;
  created_at: string;
  updated_at: string;
}

export async function getAgentForm(agentId: string, formType: string): Promise<AgentForm | null> {
  try {
    const { data, error } = await supabase
      .from('agent_forms')
      .select('*')
      .eq('agent_id', agentId)
      .eq('form_type', formType)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found - return null instead of throwing
        return null;
      }
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Supabase request failed', err);
    throw err;
  }
}