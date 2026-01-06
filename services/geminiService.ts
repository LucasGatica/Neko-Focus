import { CAT_QUOTES } from '../constants';

export const generateCatWisdom = async (focusMinutes: number): Promise<string> => {
  // Simulate a short delay to feel like "thinking"
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const randomIndex = Math.floor(Math.random() * CAT_QUOTES.length);
  return CAT_QUOTES[randomIndex];
};