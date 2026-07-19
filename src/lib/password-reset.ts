export const PASSWORD_REQUIREMENTS = [
  { label: 'At least 8 characters', test: (value: string) => value.length >= 8 },
  { label: 'One uppercase letter', test: (value: string) => /[A-Z]/.test(value) },
  { label: 'One lowercase letter', test: (value: string) => /[a-z]/.test(value) },
  { label: 'One number', test: (value: string) => /[0-9]/.test(value) },
  { label: 'One special character', test: (value: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(value) },
] as const;

export function validatePasswordRequirements(password: string) {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must include at least one uppercase letter.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must include at least one lowercase letter.');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must include at least one number.');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(password)) {
    errors.push('Password must include at least one special character.');
  }

  return {
    valid: errors.length === 0,
    errors,
    requirements: PASSWORD_REQUIREMENTS.map((requirement) => ({
      label: requirement.label,
      met: requirement.test(password),
    })),
  };
}

export function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(password)) score += 1;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-orange-500' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-yellow-500' };
  if (score <= 4) return { score, label: 'Strong', color: 'bg-blue-500' };
  return { score, label: 'Very Strong', color: 'bg-green-500' };
}
