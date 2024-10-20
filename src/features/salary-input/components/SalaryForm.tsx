import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem, OutlinedInput, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { schema, type FormData } from './FormSchema';

const supportedYears = ['2019', '2020', '2021', '2022'] as const;

export const SalaryForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { salary: 0, year: supportedYears[0] },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const onSubmit = (data: FormData) => console.log('form data : ', data);

  console.log('errors : ', errors);

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
      <OutlinedInput sx={{ width: '100%' }} value="Calculate taxes" type="submit" />
    </form>
  );
};
