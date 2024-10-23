import { yupResolver } from '@hookform/resolvers/yup';
import {
  CircularProgress,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { supportedYears } from '../../../constants/years';
import { TaxContext } from '../../../context/TaxContext';
import { getTaxBrackets } from '../../../services/queries';
import { schema, type FormData } from './FormSchema';

export const SalaryForm = () => {
  const [enabledQuery, setEnabledQuery] = useState(false);
  const { setData } = useContext(TaxContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: { salary: 0, year: supportedYears[0] },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const { isError, isLoading, isFetching, data, isSuccess } = useQuery({
    queryKey: ['taxBrackets', getValues().year],
    queryFn: () => getTaxBrackets(getValues().year),
    enabled: enabledQuery,
  });

  useEffect(() => {
    if (isError) {
      setEnabledQuery(false);
    }
  }, [isError]);

  useEffect(() => {
    const taxBrackets = data?.tax_brackets;
    if (isSuccess && taxBrackets && taxBrackets.length > 0) {
      setData({
        type: 'SET_TAX_BRACKETS',
        data: {
          taxBrackets,
        },
      });

      setEnabledQuery(false);
    }
  }, [isSuccess, data, setData]);

  const onSubmit = (data: FormData) => {
    setData({
      type: 'SET_SALARY',
      data: {
        salary: data.salary,
      },
    });

    setEnabledQuery(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        gap={2}
        direction={{
          sm: 'column',
          md: 'row',
        }}
        sx={{ marginBottom: '1rem' }}
        width="100%"
      >
        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <TextField
              label="Salary"
              {...field}
              type="number"
              error={Boolean(errors.salary)}
              helperText={errors.salary?.message}
              onChange={(event) => {
                const { value } = event.target;

                if (value === '') {
                  field.onChange(0);
                } else if (value.length > 1 && value.startsWith('0')) {
                  field.onChange(value.slice(1));
                } else {
                  field.onChange(value);
                }
              }}
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ minWidth: '100px' }}
              select
              label="Year"
              {...field}
              error={Boolean(errors.year)}
              helperText={errors.year?.message}
            >
              {supportedYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          )}
          rules={{ required: true }}
        />
      </Stack>
      <OutlinedInput
        endAdornment={isLoading || isFetching ? <CircularProgress /> : null}
        disabled={isLoading || isFetching}
        sx={{ width: '100%' }}
        value="Calculate taxes"
        type="submit"
      />
      {isError ? (
        <Typography color="error" variant="caption" sx={{ marginTop: '0.5rem' }}>
          Something went wrong, please try again!
        </Typography>
      ) : null}
    </form>
  );
};
