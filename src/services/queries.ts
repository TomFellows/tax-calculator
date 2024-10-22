import { RateQueryResponse } from '../types/TaxBracket';
import { SupportedYears } from '../types/Years';
import { fetchFn } from '../utils/fetch';

export const getTestData = async (): Promise<RateQueryResponse> => {
  const response = await fetchFn('tax-calculator');

  return response.json();
};

export const getTaxBrackets = async (year: SupportedYears): Promise<RateQueryResponse> => {
  const response = await fetchFn(`tax-calculator/tax-year/${year}`);

  return response.json();
};
