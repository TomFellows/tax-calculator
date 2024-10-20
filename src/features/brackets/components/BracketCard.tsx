import { TaxBracket } from '../../../types/TaxBracket';
import { getTaxesOwed } from '../../../utils/tax';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export const BracketCard = ({ bracket, salary }: { bracket: TaxBracket; salary: number }) => {
  let rate = Number(bracket.rate * 100).toFixed(2);

  const bracketTitle =
    bracket.min === 0
      ? `Up to ${bracket.max}`
      : bracket.max
        ? `Between ${bracket.min} and ${bracket.max}`
        : `Above ${bracket.min}`;

  return (
    <Card sx={{ padding: 2 }}>
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
          Taxes owed: <b>{getTaxesOwed({ salary, bracket })}</b>
        </Typography>
      </CardContent>
    </Card>
  );
};
