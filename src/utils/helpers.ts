export const formatNumber = (
  value: number,
): string => {
  return value.toLocaleString();
};

export const capitalize = (
  value: string,
): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};