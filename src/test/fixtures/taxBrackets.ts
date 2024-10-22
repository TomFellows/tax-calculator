import { faker } from '@faker-js/faker';
import { TaxBracket } from '../../types/TaxBracket';

export const generateTaxBracket = (overrides?: Partial<TaxBracket>): TaxBracket => {
  const rate = faker.number.float({ min: 15, max: 35 });
  const min = faker.number.int({ min: 0, max: 200000 });
  const max = faker.number.int({ min: 45000, max: 200000 });

  return { rate, min, max, ...overrides };
};

export const generateTaxBrackets = () => {
  const firstBracket = generateTaxBracket({ min: 0, max: 45000 });
  const secondBracket = generateTaxBracket({ min: 45000, max: 90000 });
  const thirdBracket = generateTaxBracket({ min: 90000, max: 140000 });
  const fourthBracket = generateTaxBracket({ min: 140000, max: 200000 });
  const fifthBracket = generateTaxBracket({ min: 200000 });

  return [firstBracket, secondBracket, thirdBracket, fourthBracket, fifthBracket];
};
