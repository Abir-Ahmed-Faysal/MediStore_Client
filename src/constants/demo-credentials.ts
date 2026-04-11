/**
 * Demo Credentials
 * For demo purposes, only admin credentials are accepted
 * In production, this should be removed or disabled
 */

export const DEMO_CREDENTIALS = {
  email: "admin@medistore.com",
  password: "AdminDemo123!",
  role: "ADMIN" as const,
  name: "Admin User",
};

/**
 * Check if demo mode is enabled
 * Set NEXT_PUBLIC_ENABLE_DEMO_CREDENTIALS=true in .env.local to enable
 */
export const isDemoMode = () => {
  return process.env.NEXT_PUBLIC_ENABLE_DEMO_CREDENTIALS === "true";
};

/**
 * Validate demo credentials
 * Only allows admin login in demo mode
 */
export const validateDemoCredentials = (email: string, password: string) => {
  if (!isDemoMode()) {
    return false;
  }

  return (
    email.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase() &&
    password === DEMO_CREDENTIALS.password
  );
};
