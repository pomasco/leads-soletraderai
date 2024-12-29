import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Role } from '@/types/database';
import { getUserRoles, hasCapability } from '@/lib/database/roles';

export function useRoles(userId?: string) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setRoles([]);
      setLoading(false);
      return;
    }

    const fetchRoles = async () => {
      try {
        const roles = await getUserRoles(userId);
        setRoles(roles);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch roles'));
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [userId]);

  const checkCapability = async (capability: string): Promise<boolean> => {
    if (!userId) return false;
    try {
      return await hasCapability(userId, capability);
    } catch (err) {
      console.error('Error checking capability:', err);
      return false;
    }
  };

  return { roles, loading, error, checkCapability };
}