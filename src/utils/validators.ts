export const isEmail = (
  email: string,
): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isMobile = (
  mobile: string,
): boolean => {
  return /^[0-9]{10}$/.test(mobile);
};