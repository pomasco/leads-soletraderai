import { useState, useEffect } from 'react';
import type { OrganizationWithMembers } from '@/types/database';
import { getOrganizationWithMembers } from '@/lib/database/organizations';

export function useOrganization(organizationId?: string) {
  const [organization, setOrganization] = useState<OrganizationWithMembers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!organizationId) {
      setOrganization(null);
      setLoading(false);
      return;
    }

    const fetchOrganization = async () => {
      try {
        const org = await getOrganizationWithMembers(organizationId);
        setOrganization(org);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch organization'));
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  return { organization, loading, error };
}