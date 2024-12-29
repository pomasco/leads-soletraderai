import { supabase } from '../supabase';
import type { 
  Organization, 
  OrganizationMember,
  OrganizationType,
  OrganizationWithMembers 
} from '@/types/database';

/**
 * Create a new organization
 */
export const createOrganization = async (
  name: string,
  type: OrganizationType,
  country: string,
  businessNumber?: string
): Promise<Organization> => {
  const { data, error } = await supabase
    .from('organizations')
    .insert({
      name,
      type,
      country,
      business_number: businessNumber,
      verification_status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get organization details with members
 */
export const getOrganizationWithMembers = async (id: string): Promise<OrganizationWithMembers | null> => {
  const { data, error } = await supabase
    .from('organizations')
    .select(`
      *,
      members:organization_members (
        *,
        user:auth.users (
          id,
          email,
          raw_user_meta_data->full_name
        ),
        role:roles (*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Add member to organization
 */
export const addOrganizationMember = async (
  organizationId: string,
  userId: string,
  roleId: string,
  isOwner: boolean = false
): Promise<void> => {
  const { error } = await supabase
    .from('organization_members')
    .insert({
      organization_id: organizationId,
      user_id: userId,
      role_id: roleId,
      is_owner: isOwner
    });

  if (error) throw error;
};

/**
 * Remove member from organization
 */
export const removeOrganizationMember = async (
  organizationId: string,
  userId: string
): Promise<void> => {
  const { error } = await supabase
    .from('organization_members')
    .delete()
    .match({ 
      organization_id: organizationId,
      user_id: userId 
    });

  if (error) throw error;
};

/**
 * Update member role in organization
 */
export const updateMemberRole = async (
  organizationId: string,
  userId: string,
  roleId: string
): Promise<void> => {
  const { error } = await supabase
    .from('organization_members')
    .update({ role_id: roleId })
    .match({ 
      organization_id: organizationId,
      user_id: userId 
    });

  if (error) throw error;
};