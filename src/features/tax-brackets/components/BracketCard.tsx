import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { TaxBracket } from '../../../types/TaxBracket';
import { getCurrencyFormat } from '../../../utils/money';
import { getTaxesByBracket } from '../../../utils/tax';

export const BRACKET_CARD_TEST_ID = 'bracket-card';

export const BracketCard = ({ bracket, salary }: { bracket: TaxBracket; salary: number }) => {
  const rate = Number(bracket.rate * 100).toFixed(2);

  const bracketTitle =
    bracket.min === 0
      ? `Up to ${bracket.max}`
      : bracket.max
        ? `Between ${bracket.min} and ${bracket.max}`
        : `Above ${bracket.min}`;

  const taxesOwed = getCurrencyFormat(getTaxesByBracket({ salary, bracket }));

  return (
    <Card data-testid={BRACKET_CARD_TEST_ID} sx={{ padding: 2 }}>
      <CardHeader
        title={bracketTitle}
        titleTypographyProps={{
          variant: 'h6',
        }}
      />
      <CardContent>
        <Typography>
          Rate: <b>{rate}%</b>
        </Typography>
        <Typography>
          Taxes owed: <b>{taxesOwed}</b>
        </Typography>
      </CardContent>
    </Card>
  );
};
