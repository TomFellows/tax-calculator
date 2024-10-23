import { Divider, Stack } from '@mui/material';
import { TaxContextProvider } from './context/TaxContext';
import { ResultsSection } from './features/results/ResultsSection';
import { SalarySection } from './features/salary-section/SalarySection';
import { TaxBracketsSection } from './features/tax-brackets/TaxBracketsSection';

export const App = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      display="flex"
      maxWidth="lg"
      sx={{
        padding: 6,
      }}
      gap={2}
    >
      <TaxContextProvider>
        <Stack gap={2} direction={{ xs: 'column', md: 'row' }} width="100%">
          <SalarySection />
          <ResultsSection />
        </Stack>
        <Divider />
        <TaxBracketsSection />
      </TaxContextProvider>
    </Stack>
  );
};
