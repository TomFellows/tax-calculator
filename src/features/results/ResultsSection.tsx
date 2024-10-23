import { Card, Divider, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { TaxContext } from '../../context/TaxContext';
import { getCurrencyFormat } from '../../utils/money';
import { getEffectiveTaxRate, getTotalTaxesOwed } from '../../utils/tax';

export const RESULTS_SECTION_TEST_ID = 'results-section';

export const ResultsSection = () => {
  const {
    data: { salary, taxBrackets },
  } = useContext(TaxContext);
  const totalTaxesOwed = getCurrencyFormat(getTotalTaxesOwed({ salary, taxBrackets }));
  const effectiveRate = getEffectiveTaxRate({ salary, taxBrackets });

  return (
    <Card data-testid={RESULTS_SECTION_TEST_ID}>
      <Stack gap={2}>
        <Typography variant="h5">Your results</Typography>
        <Typography>Based on your salary and tax brackets, here are your results</Typography>
        <Divider />

        <Typography>
          Effective tax rate: <b>{effectiveRate}%</b>
        </Typography>
        <Typography>
          Total taxes owed: <b>{totalTaxesOwed}</b>
        </Typography>
      </Stack>
    </Card>
  );
};
