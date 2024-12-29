import { supabase } from '../supabase';
import type { Role, UserRole } from '@/types/database';

/**
 * Get all roles for a user
 */
export const getUserRoles = async (userId: string): Promise<Role[]> => {
  const { data, error } = await supabase
    .rpc('get_user_roles', { p_user_id: userId });

  if (error) throw error;
  return data || [];
};

/**
 * Check if a user has a specific capability
 */
export const hasCapability = async (userId: string, capability: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('has_capability', { 
      p_user_id: userId,
      p_capability: capability 
    });

  if (error) throw error;
  return data || false;
};

/**
 * Assign a role to a user
 */
export const assignRole = async (userId: string, roleId: string, metadata: Record<string, any> = {}): Promise<void> => {
  const { error } = await supabase
    .from('user_roles')
    .upsert({
      user_id: userId,
      role_id: roleId,
      metadata
    });

  if (error) throw error;
};

/**
 * Remove a role from a user
 */
export const removeRole = async (userId: string, roleId: string): Promise<void> => {
  const { error } = await supabase
    .from('user_roles')
    .delete()
    .match({ user_id: userId, role_id: roleId });

  if (error) throw error;
};

/**
 * Get all available roles
 */
export const getAllRoles = async (): Promise<Role[]> => {
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
};