import { http, HttpResponse } from 'msw';
import { TaxBracket } from '../../types/TaxBracket';
import { SupportedYears } from '../../types/Years';
import { BASE_URL } from '../../utils/fetch';

export const getTaxBracketsHandler = ({
  year,
  response,
}: {
  year: SupportedYears;
  response: { tax_brackets: TaxBracket[] };
}) => http.get(`${BASE_URL}/tax-calculator/tax-year/${year}`, () => HttpResponse.json(response));

export const getTaxBracketsErrorHandler = ({ year }: { year: SupportedYears }) =>
  http.get(`${BASE_URL}/tax-calculator/tax-year/${year}`, () =>
    HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
  );
