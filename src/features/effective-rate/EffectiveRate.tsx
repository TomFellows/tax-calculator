import { Card, Stack, Typography } from '@mui/material';

export const EffectiveRate = () => {
  return (
    <Card>
      <Stack gap={2}>
        <Typography variant="h5">Your effective tax rate</Typography>
        <Typography>Effective tax rate: 0%</Typography>
      </Stack>
    </Card>
  );
};
