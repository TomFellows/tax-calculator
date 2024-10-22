import { faker } from '@faker-js/faker';
import { generateTaxBracket, generateTaxBrackets } from '../test/fixtures/taxBrackets';
import { getEffectiveTaxRate, getTaxesByBracket, getTotalTaxesOwed } from './tax';

describe('Tax utils', () => {
  describe('getTaxesByBracket', () => {
    it('should return 0 if salary is less than the minimum bracket', () => {
      const salary = 0;
      const bracket = generateTaxBracket({ min: 0 });

      expect(getTaxesByBracket({ salary, bracket })).toBe(0);
    });

    it('should return the correct amount of taxes owed for a salary within a bracket', () => {
      const salary = 50_000;
      const bracket = generateTaxBracket({ min: 0, max: 100_000, rate: 0.15 });
      const expectedTaxes = salary * bracket.rate;

      expect(getTaxesByBracket({ salary, bracket })).toBe(expectedTaxes);
    });

    it('should return the correct amount of taxes owed for a salary above a bracket', () => {
      const salary = 200_000;
      const bracket = generateTaxBracket({ min: 0, max: 50_000, rate: 0.15 });
      const expectedTaxes = bracket.max! * bracket.rate;

      expect(getTaxesByBracket({ salary, bracket })).toBe(expectedTaxes);
    });

    it('should return the correct amount of taxes owed only for the salary within the bracket', () => {
      const salary = 200_000;
      const bracket = generateTaxBracket({ min: 50_000, max: 100_000, rate: 0.205 });
      const expectedTaxes = (bracket.max! - bracket.min) * bracket.rate;

      expect(getTaxesByBracket({ salary, bracket })).toBe(expectedTaxes);
    });
  });

  describe('getTotalTaxesOwed', () => {
    it('should return 0 if the salary is 0', () => {
      const salary = 0;
      const taxBrackets = generateTaxBrackets();

      expect(getTotalTaxesOwed({ salary, taxBrackets })).toBe(0);
    });

    it('should return the total taxes owed for a salary and tax brackets', () => {
      const salary = 200_000;
      const taxBrackets = generateTaxBrackets();
      const [
        firstBracketTaxes,
        secondBracketTaxes,
        thirdsBracketTaxes,
        fourthBracketTaxes,
        fifthBracketTaxes,
      ] = taxBrackets.map((bracket) => getTaxesByBracket({ salary, bracket }));

      const expectedTaxes =
        firstBracketTaxes +
        secondBracketTaxes +
        thirdsBracketTaxes +
        fourthBracketTaxes +
        fifthBracketTaxes;

      expect(getTotalTaxesOwed({ salary, taxBrackets })).toBe(expectedTaxes);
    });
  });

  describe('getEffectiveTaxRate', () => {
    it('should return 0 if the salary is 0', () => {
      const salary = 0;
      const taxBrackets = generateTaxBrackets();

      expect(getEffectiveTaxRate({ salary, taxBrackets })).toBe(0.0);
    });

    it('should return the effective tax rate for a salary and tax brackets', () => {
      const salary = faker.number.int({ min: 1, max: 1_000_000 });
      const taxBrackets = generateTaxBrackets();
      const totalTaxesOwed = getTotalTaxesOwed({ salary, taxBrackets });
      const expectedRate = ((totalTaxesOwed / salary) * 100).toFixed(2);

      expect(getEffectiveTaxRate({ salary, taxBrackets })).toBe(expectedRate);
    });
  });
});
