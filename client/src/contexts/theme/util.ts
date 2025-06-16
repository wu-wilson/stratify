export const isNightTime = (): boolean => {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19;
};
