export const generateRandomString = (wordCount: number): string => {
  return Math.random().toString(36).slice(-wordCount);
};

export const generateRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
};
