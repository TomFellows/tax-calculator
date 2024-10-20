import { TaxBracket } from '../types/TaxBracket';
import { getCurrencyFormat } from './money';

/**
 * Get the taxes owed for a specific salary and tax bracket
 * @param bracket: The tax bracket to calculate the taxes owed against
 * @param salary: The salary to calculate the taxes owed for
 * @returns: A string representation of the taxes owed in Canadian currency
 */
export const getTaxesOwed = ({ salary, bracket }: { salary: number; bracket: TaxBracket }) => {
  if (salary < bracket.min) {
    return getCurrencyFormat(0);
  }

  return getCurrencyFormat(Math.min(salary, bracket.max || 0) * bracket.rate);
};
