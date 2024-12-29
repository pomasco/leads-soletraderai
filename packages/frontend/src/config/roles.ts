/**
 * Core role types that map to Supabase technical roles
 */
export const CORE_ROLES = {
  ANON: 'anon',
  AUTHENTICATED: 'authenticated',
  SERVICE_ROLE: 'service_role'
} as const;

/**
 * Business role definitions with inheritance
 */
export const USER_ROLES = {
  // System-level role
  ADMIN: {
    core: CORE_ROLES.SERVICE_ROLE,
    name: 'Admin',
    description: 'Platform administrator with full system access',
    inherits: [],
    capabilities: [
      'MANAGE_USERS',
      'MANAGE_PLATFORM',
      'VIEW_ANALYTICS',
      'MANAGE_INTEGRATIONS',
      'APPROVE_AI_REQUESTS'
    ]
  },

  // Organization roles
  COMPANY: {
    core: CORE_ROLES.AUTHENTICATED,
    name: 'Company',
    description: 'Registered business entity',
    inherits: [],
    metadata: {
      requiresVerification: true,
      verificationFields: ['abn', 'acn']
    },
    capabilities: [
      'MANAGE_COMPANY',
      'MANAGE_TEAM',
      'VIEW_COMPANY_ANALYTICS',
      'MANAGE_WORKFLOWS',
      'MANAGE_INTEGRATIONS'
    ]
  },

  AGENCY: {
    core: CORE_ROLES.AUTHENTICATED,
    name: 'Agency',
    description: 'Service provider managing client workflows',
    inherits: ['COMPANY'],
    capabilities: [
      'MANAGE_CLIENT_WORKFLOWS',
      'VIEW_CLIENT_ANALYTICS',
      'MANAGE_AGENCY_MEMBERS'
    ]
  },

  // Individual roles
  AUTHORIZED_USER: {
    core: CORE_ROLES.AUTHENTICATED,
    name: 'Authorized User',
    description: 'Verified individual user',
    inherits: [],
    capabilities: [
      'MANAGE_PERSONAL_AGENTS',
      'CONFIGURE_WORKFLOWS',
      'ACCESS_DASHBOARD'
    ]
  },

  // Member roles (always associated with an organization)
  TEAM_MEMBER: {
    core: CORE_ROLES.AUTHENTICATED,
    name: 'Team Member',
    description: 'Company team member',
    inherits: ['AUTHORIZED_USER'],
    metadata: {
      requiresInvite: true,
      invitedBy: ['COMPANY', 'ADMIN']
    },
    capabilities: [
      'ACCESS_COMPANY_RESOURCES',
      'USE_COMPANY_WORKFLOWS'
    ]
  },

  AGENCY_MEMBER: {
    core: CORE_ROLES.AUTHENTICATED,
    name: 'Agency Member',
    description: 'Agency team member',
    inherits: ['TEAM_MEMBER'],
    metadata: {
      requiresInvite: true,
      invitedBy: ['AGENCY', 'ADMIN']
    },
    capabilities: [
      'MANAGE_CLIENT_WORKFLOWS',
      'VIEW_CLIENT_ANALYTICS'
    ]
  },

  // Public role
  GUEST: {
    core: CORE_ROLES.ANON,
    name: 'Guest',
    description: 'Non-registered user',
    inherits: [],
    capabilities: [
      'VIEW_PUBLIC_CONTENT',
      'JOIN_WAITLIST',
      'REGISTER'
    ]
  }
} as const;

/**
 * Role capability definitions
 */
export const CAPABILITIES = {
  // Admin capabilities
  MANAGE_USERS: 'Manage all user accounts',
  MANAGE_PLATFORM: 'Configure platform settings',
  VIEW_ANALYTICS: 'Access platform-wide analytics',
  MANAGE_INTEGRATIONS: 'Manage platform integrations',
  APPROVE_AI_REQUESTS: 'Approve AI integration requests',

  // Company capabilities
  MANAGE_COMPANY: 'Manage company settings and profile',
  MANAGE_TEAM: 'Manage team members',
  VIEW_COMPANY_ANALYTICS: 'View company analytics',
  MANAGE_WORKFLOWS: 'Manage company workflows',

  // Agency capabilities
  MANAGE_CLIENT_WORKFLOWS: 'Manage client workflows',
  VIEW_CLIENT_ANALYTICS: 'View client analytics',
  MANAGE_AGENCY_MEMBERS: 'Manage agency members',

  // User capabilities
  MANAGE_PERSONAL_AGENTS: 'Manage personal AI agents',
  CONFIGURE_WORKFLOWS: 'Configure personal workflows',
  ACCESS_DASHBOARD: 'Access personal dashboard',
  
  // Team capabilities
  ACCESS_COMPANY_RESOURCES: 'Access company resources',
  USE_COMPANY_WORKFLOWS: 'Use company workflows',

  // Public capabilities
  VIEW_PUBLIC_CONTENT: 'View public content',
  JOIN_WAITLIST: 'Join feature waitlist',
  REGISTER: 'Register new account'
} as const;

/**
 * Helper to check if a role has a specific capability
 */
export const hasCapability = (
  role: keyof typeof USER_ROLES,
  capability: keyof typeof CAPABILITIES
): boolean => {
  const roleConfig = USER_ROLES[role];
  
  // Check direct capabilities
  if (roleConfig.capabilities.includes(capability)) {
    return true;
  }

  // Check inherited capabilities
  return roleConfig.inherits.some(inheritedRole => 
    hasCapability(inheritedRole as keyof typeof USER_ROLES, capability)
  );
};

/**
 * Helper to get all capabilities for a role (including inherited)
 */
export const getAllCapabilities = (role: keyof typeof USER_ROLES): Set<keyof typeof CAPABILITIES> => {
  const roleConfig = USER_ROLES[role];
  const capabilities = new Set(roleConfig.capabilities);

  roleConfig.inherits.forEach(inheritedRole => {
    const inheritedCapabilities = getAllCapabilities(inheritedRole as keyof typeof USER_ROLES);
    inheritedCapabilities.forEach(cap => capabilities.add(cap));
  });

  return capabilities;
};

/**
 * Helper to check if a role requires verification
 */
export const requiresVerification = (role: keyof typeof USER_ROLES): boolean => {
  return !!USER_ROLES[role].metadata?.requiresVerification;
};

/**
 * Helper to check if a role requires an invitation
 */
export const requiresInvite = (role: keyof typeof USER_ROLES): boolean => {
  return !!USER_ROLES[role].metadata?.requiresInvite;
};

/**
 * Helper to get allowed inviter roles
 */
export const getAllowedInviters = (role: keyof typeof USER_ROLES): (keyof typeof USER_ROLES)[] => {
  return USER_ROLES[role].metadata?.invitedBy || [];
};