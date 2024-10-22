import { Card, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { TaxContext } from '../../context/TaxContext';
import { BracketCard } from './components/BracketCard';

export const TaxBrackets = () => {
  const {
    data: { salary, taxBrackets },
  } = useContext(TaxContext);

  return (
    <>
      {taxBrackets.length > 0 ? (
        <Card>
          <Stack gap={2}>
            <Typography variant="h5">Taxes owed by tax bracket</Typography>
            <Stack
              gap={2}
              direction={{
                sm: 'column',
                md: 'row',
              }}
            >
              {taxBrackets
                ? taxBrackets.map((bracket) => (
                    <BracketCard key={bracket.rate} bracket={bracket} salary={salary} />
                  ))
                : null}
            </Stack>
          </Stack>
        </Card>
      ) : null}
    </>
  );
};
