import * as yup from 'yup';

export const schema = yup
  .object({
    salary: yup.number().positive('Salary must be positive.').required('Salary is required.'),
    year: yup
      .string()
      .oneOf(['2019', '2020', '2021', '2022'])
      .required('Taxation year is required'),
  })
  .required();
export type FormData = yup.InferType<typeof schema>;
