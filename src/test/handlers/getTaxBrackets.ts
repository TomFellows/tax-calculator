import { http, HttpResponse } from 'msw';
import { SupportedYears } from '../../types/Years';
import { BASE_URL } from '../../utils/fetch';

export const getTaxBracketsHandler = ({
  year,
  response,
}: {
  year: SupportedYears;
  response: any;
}) => http.get(`${BASE_URL}/tax-calculator/tax-year/${year}`, () => HttpResponse.json(response));

export const getTaxBracketsErrorHandler = ({ year }: { year: SupportedYears }) =>
  http.get(`${BASE_URL}/tax-calculator/tax-year/${year}`, () =>
    HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
  );
