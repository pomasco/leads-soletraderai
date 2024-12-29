import { Database as DatabaseGenerated } from './supabase';

export type Database = DatabaseGenerated;

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Role-specific types
export type Role = Tables<'roles'>;
export type UserRole = Tables<'user_roles'>;
export type Organization = Tables<'organizations'>;
export type OrganizationMember = Tables<'organization_members'>;
export type VerificationRequest = Tables<'verification_requests'>;

// Enums
export type OrganizationType = 'company' | 'agency';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

// Extended types with relationships
export interface RoleWithMetadata extends Role {
  metadata: {
    system?: boolean;
    requiresVerification?: boolean;
    verificationFields?: string[];
    requiresInvite?: boolean;
    invitedBy?: string[];
  };
}

export interface OrganizationWithMembers extends Organization {
  members: (OrganizationMember & {
    user: {
      id: string;
      email: string;
      full_name?: string;
    };
    role: Role;
  })[];
}