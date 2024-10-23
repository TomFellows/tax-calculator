import { faker } from '@faker-js/faker';
import { generateTaxBrackets } from '../../test/fixtures/taxBrackets';
import { setupComponent } from '../../test/helpers/testUtils';
import { getCurrencyFormat } from '../../utils/money';
import { getEffectiveTaxRate, getTotalTaxesOwed } from '../../utils/tax';
import { ResultsSection } from './ResultsSection';

describe('Results Section', () => {
  it('should display the expected static text', () => {
    const { container } = setupComponent({
      Component: <ResultsSection />,
      initialData: { taxBrackets: [] },
    });

    expect(container).toHaveTextContent('Your results');
    expect(container).toHaveTextContent(
      'Based on your salary and tax brackets, here are your results',
    );
    expect(container).toHaveTextContent('Effective tax rate: 0.00%');
    expect(container).toHaveTextContent('Total taxes owed: CA$0.00');
  });

  it('should display the calculated effective tax rate', () => {
    const data = {
      salary: faker.number.int({ min: 50000, max: 200000 }),
      taxBrackets: generateTaxBrackets(),
    };
    const { container } = setupComponent({ Component: <ResultsSection />, initialData: data });

    const effectiveRate = getEffectiveTaxRate(data);
    const totalTaxes = getCurrencyFormat(getTotalTaxesOwed(data));

    expect(container).toHaveTextContent(`Effective tax rate: ${effectiveRate}%`);
    expect(container).toHaveTextContent(`Total taxes owed: ${totalTaxes}`);
  });
});
