import { Divider, Stack } from '@mui/material';
import { TaxContextProvider } from './context/TaxContext';
import { TaxBrackets } from './features/brackets/TaxBrackets';
import { EffectiveRate } from './features/effective-rate/EffectiveRate';
import { SalarySelection } from './features/salary-input/SalarySelection';

export const App = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      display="flex"
      sx={{
        padding: 6,
        //backgroundColor: '#242424'
      }}
      gap={2}
    >
      <TaxContextProvider>
        <Stack gap={2} direction={{ xs: 'column', md: 'row' }} width="100%">
          <SalarySelection />
          <EffectiveRate />
        </Stack>
        <Divider />
        <TaxBrackets />
      </TaxContextProvider>
    </Stack>
  );
};
