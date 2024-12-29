import { supabase } from '../supabase';
import type { VerificationRequest } from '@/types/database';

/**
 * Submit a verification request
 */
export const submitVerificationRequest = async (
  organizationId: string,
  verificationFields: Record<string, any>
): Promise<VerificationRequest> => {
  const { data, error } = await supabase
    .from('verification_requests')
    .insert({
      organization_id: organizationId,
      verification_fields: verificationFields
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Review a verification request
 */
export const reviewVerificationRequest = async (
  requestId: string,
  status: 'approved' | 'rejected',
  reviewerId: string
): Promise<void> => {
  const { error } = await supabase
    .from('verification_requests')
    .update({
      status,
      reviewer_id: reviewerId,
      reviewed_at: new Date().toISOString()
    })
    .eq('id', requestId);

  if (error) throw error;
};

/**
 * Get verification request status
 */
export const getVerificationStatus = async (organizationId: string): Promise<VerificationRequest | null> => {
  const { data, error } = await supabase
    .from('verification_requests')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // Ignore not found error
  return data;
};