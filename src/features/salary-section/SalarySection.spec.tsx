import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateTaxBrackets } from '../../test/fixtures/taxBrackets';
import {
  getTaxBracketsErrorHandler,
  getTaxBracketsHandler,
} from '../../test/handlers/getTaxBrackets';
import { setupComponent } from '../../test/helpers/testUtils';
import { server } from '../../test/mocks/server';
import { TaxBracket } from '../../types/TaxBracket';
import { SalarySection } from './SalarySection';

describe('Salary Section', () => {
  const setupMock = (tax_brackets: TaxBracket[] = []) => {
    server.use(getTaxBracketsHandler({ year: '2019', response: { tax_brackets } }));
  };

  const setupMockError = () => {
    server.use(getTaxBracketsErrorHandler({ year: '2019' }));
  };

  it('should display the expected static text', () => {
    const { container } = setupComponent({ Component: <SalarySection /> });

    expect(container).toHaveTextContent('Input your annual salary and year of taxation');
  });

  describe('Salary Form', () => {
    it('should display three inputs', () => {
      const { container } = setupComponent({ Component: <SalarySection /> });

      const inputs = container.querySelectorAll('input');

      expect(inputs).toHaveLength(3);
      expect(inputs[0]).toHaveAttribute('name', 'salary');
      expect(inputs[1]).toHaveAttribute('name', 'year');
      expect(inputs[2]).toHaveAttribute('type', 'submit');
    });

    describe('Form submission', () => {
      it('should display a validation error if the salary input is not valid', async () => {
        const { container } = setupComponent({ Component: <SalarySection /> });

        const submitInput = screen.getByRole('button');

        await userEvent.click(submitInput);

        expect(container).toHaveTextContent('Salary must be positive.');
      });

      it('should set the context data when the form is submitted', async () => {
        setupMock();
        const { setData } = setupComponent({ Component: <SalarySection /> });
        const salaryInput = screen.getByRole('textbox');
        const submitInput = screen.getByRole('button');

        await userEvent.type(salaryInput, '50000');
        await userEvent.click(submitInput);

        expect(setData).toHaveBeenCalledWith({
          type: 'SET_SALARY',
          data: {
            salary: 50000,
          },
        });
      });

      it('should trigger a query to get the tax brackets when the form is submitted', async () => {
        const taxBrackets = generateTaxBrackets();
        setupMock(taxBrackets);
        const { setData } = setupComponent({ Component: <SalarySection /> });
        const salaryInput = screen.getByRole('textbox');
        const submitInput = screen.getByRole('button');

        await userEvent.type(salaryInput, '50000');
        await userEvent.click(submitInput);

        await waitFor(() => {
          expect(setData).toHaveBeenCalledTimes(2);
        });

        expect(setData.mock.calls[1][0]).toEqual({
          type: 'SET_TAX_BRACKETS',
          data: {
            taxBrackets,
          },
        });
      });

      it('should display a generic error message if the query fails', async () => {
        setupMockError();
        const { setData, container } = setupComponent({ Component: <SalarySection /> });
        const salaryInput = screen.getByRole('textbox');
        const submitInput = screen.getByRole('button');

        await userEvent.type(salaryInput, '50000');
        await userEvent.click(submitInput);

        expect(setData).toHaveBeenCalledWith({
          type: 'SET_SALARY',
          data: {
            salary: 50000,
          },
        });
        await waitFor(() => {
          expect(container).toHaveTextContent('Something went wrong, please try again!');
        });
      });
    });
  });
});
