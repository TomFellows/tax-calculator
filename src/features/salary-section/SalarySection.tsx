import { Card, Stack, Typography } from '@mui/material';
import { SalaryForm } from './components/SalaryForm';

export const SalarySection = () => {
  return (
    <Card>
      <Stack gap={2}>
        <Typography variant="h5">Input your annual salary and year of taxation</Typography>
        <SalaryForm />
      </Stack>
    </Card>
  );
};
