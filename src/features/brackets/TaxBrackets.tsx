import { Card, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { TaxContext } from '../../context/TaxContext';
import { getTestData } from '../../services/queries';
import { BracketCard } from './components/BracketCard';

export const TaxBrackets = () => {
  const {
    data: { salary },
  } = useContext(TaxContext);
  const { isLoading, isError, data } = useQuery({
    queryKey: ['rateExample'],
    queryFn: getTestData,
  });

  if (isLoading) {
    return <> we're loading</>;
  }

  if (isError) {
    return <> uh oh, an error!</>;
  }

  const brackets = data?.tax_brackets;

  return (
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
          {brackets
            ? brackets.map((bracket) => (
                <BracketCard key={bracket.rate} bracket={bracket} salary={salary} />
              ))
            : null}
        </Stack>
      </Stack>
    </Card>
  );
};
