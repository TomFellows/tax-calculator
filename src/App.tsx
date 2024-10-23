import { Divider, Stack } from '@mui/material';
import { TaxContextProvider } from './context/TaxContext';
import { Results } from './features/results/Results';
import { SalarySection } from './features/salary-section/SalarySection';
import { TaxBrackets } from './features/tax-brackets/TaxBrackets';

export const App = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      display="flex"
      sx={{
        padding: 6,
      }}
      gap={2}
    >
      <TaxContextProvider>
        <Stack gap={2} direction={{ xs: 'column', md: 'row' }} width="100%">
          <SalarySection />
          <Results />
        </Stack>
        <Divider />
        <TaxBrackets />
      </TaxContextProvider>
    </Stack>
  );
};
