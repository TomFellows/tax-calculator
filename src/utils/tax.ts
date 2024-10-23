import { TaxBracket } from '../types/TaxBracket';

/**
 * Get the taxes owed for a specific salary and tax bracket
 * @param bracket: The tax bracket to calculate the taxes owed against
 * @param salary: The salary to calculate the taxes owed for
 * @returns: A number representation of the taxes owed in Canadian currency for a given tax bracket
 */
export const getTaxesByBracket = ({ salary, bracket }: { salary: number; bracket: TaxBracket }) => {
  if (salary < bracket.min) {
    return 0;
  }

  const taxableSalary = (bracket.max ? Math.min(salary, bracket.max) : salary) - bracket.min;

  return taxableSalary * bracket.rate;
};

/**
 * Get the total taxes owed for a specific salary and tax brackets
 * @param bracket: The tax bracket to calculate the taxes owed against
 * @param salary: The salary to calculate the taxes owed for
 * @returns: A number representation of the total taxes owed in Canadian currency
 */
export const getTotalTaxesOwed = ({
  salary,
  taxBrackets,
}: {
  salary: number;
  taxBrackets: TaxBracket[];
}) => {
  return taxBrackets.reduce((total, bracket) => total + getTaxesByBracket({ salary, bracket }), 0);
};

/**
 * Get the effective tax rate for a specific salary and tax brackets
 * @param salary: The salary to calculate the effective tax rate for
 * @param taxBrackets: The tax brackets to calculate the effective tax rate against
 * @returns: A number representation of the effective tax rate
 */
export const getEffectiveTaxRate = ({
  salary,
  taxBrackets,
}: {
  salary: number;
  taxBrackets: TaxBracket[];
}) => {
  if (salary === 0) {
    return (0).toFixed(2);
  }

  const totalTaxesOwed = getTotalTaxesOwed({ salary, taxBrackets });

  return ((totalTaxesOwed / salary) * 100).toFixed(2);
};
