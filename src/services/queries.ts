import { RateQueryResponse } from '../types/TaxBracket';
import { fetchFn } from '../utils/fetch';

export const getTestData = async (): Promise<RateQueryResponse> => {
  const response = await fetchFn('tax-calculator');

  return response.json();
};
