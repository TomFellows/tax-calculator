import { Card, Stack, Typography } from '@mui/material';
import { SalaryForm } from './components/SalaryForm';

export const SALARY_SECTION_TEST_ID = 'salary-section';

export const SalarySection = () => {
  return (
    <Card data-testid={SALARY_SECTION_TEST_ID}>
      <Stack gap={2}>
        <Typography variant="h5">Input your annual salary and year of taxation</Typography>
        <SalaryForm />
      </Stack>
    </Card>
  );
};
