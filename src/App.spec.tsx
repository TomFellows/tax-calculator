import { dividerClasses } from '@mui/material';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { RESULTS_SECTION_TEST_ID } from './features/results/Results';
import { SALARY_SECTION_TEST_ID } from './features/salary-section/SalarySection';
import { TAX_BRACKETS_SECTION_TEST_ID } from './features/tax-brackets/TaxBrackets';
import { generateTaxBrackets } from './test/fixtures/taxBrackets';
import { getTaxBracketsHandler } from './test/handlers/getTaxBrackets';
import { render } from './test/helpers/testUtils';
import { server } from './test/mocks/server';

describe('App', () => {
  const setup = () => {
    return render(<App />);
  };

  const setupMock = () => {
    server.use(
      getTaxBracketsHandler({ year: '2021', response: { tax_brackets: generateTaxBrackets() } }),
    );
  };

  it('should render the application', () => {
    const { container } = setup();
    const salarySection = screen.getByTestId(SALARY_SECTION_TEST_ID);
    const resultsSection = screen.getByTestId(RESULTS_SECTION_TEST_ID);
    const taxBracketsSection = screen.queryByTestId(TAX_BRACKETS_SECTION_TEST_ID);
    const divider = container.querySelector(`.${dividerClasses.root}`);

    expect(salarySection).toBeInTheDocument();
    expect(resultsSection).toBeInTheDocument();
    expect(taxBracketsSection).not.toBeInTheDocument();
    expect(divider).toBeInTheDocument();
  });

  it('should display the tax brackets section when the form is submitted', async () => {
    setup();
    setupMock();
    const salarySection = screen.getByTestId(SALARY_SECTION_TEST_ID);
    const resultsSection = screen.getByTestId(RESULTS_SECTION_TEST_ID);
    const taxBracketsSection = screen.queryByTestId(TAX_BRACKETS_SECTION_TEST_ID);

    expect(salarySection).toBeInTheDocument();
    expect(resultsSection).toBeInTheDocument();
    expect(taxBracketsSection).not.toBeInTheDocument();

    // Fill out the form
    const salaryInput = screen.getByRole('textbox');
    const yearInput = screen.getByRole('combobox');
    const submitButton = screen.getByRole('button');

    await userEvent.type(salaryInput, '50000');
    await userEvent.click(yearInput);
    await userEvent.click(screen.getByText('2021'));
    await userEvent.click(submitButton);

    const updatedTaxBracketsSection = await screen.findByTestId(TAX_BRACKETS_SECTION_TEST_ID);

    expect(updatedTaxBracketsSection).toBeInTheDocument();
  });
});
