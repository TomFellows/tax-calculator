import { screen } from '@testing-library/react';
import { setupComponent } from '../../test/helpers/testUtils';
import { getCurrencyFormat } from '../../utils/money';
import { getTaxesByBracket } from '../../utils/tax';
import { BRACKET_CARD_TEST_ID } from './components/BracketCard';
import { TaxBrackets } from './TaxBrackets';

describe('Tax Brackets Section', () => {
  it('should display nothing if there are no stored tax brackets', () => {
    const { container } = setupComponent({
      Component: <TaxBrackets />,
      initialData: { taxBrackets: [] },
    });

    expect(container).toBeEmptyDOMElement();
  });

  describe('when there are stored tax brackets', () => {
    it('should display the section and static text', () => {
      const {
        container,
        data: { taxBrackets },
      } = setupComponent({ Component: <TaxBrackets /> });

      const bracketCards = screen.getAllByTestId(BRACKET_CARD_TEST_ID);

      expect(container).toHaveTextContent('Taxes owed by tax bracket');
      expect(bracketCards).toHaveLength(taxBrackets.length);
      expect(bracketCards[0]).toHaveTextContent(`Up to ${taxBrackets[0].max}`);
      expect(bracketCards[1]).toHaveTextContent(
        `Between ${taxBrackets[1].min} and ${taxBrackets[1].max}`,
      );
      expect(bracketCards[2]).toHaveTextContent(
        `Between ${taxBrackets[2].min} and ${taxBrackets[2].max}`,
      );
      expect(bracketCards[3]).toHaveTextContent(
        `Between ${taxBrackets[3].min} and ${taxBrackets[3].max}`,
      );
      expect(bracketCards[4]).toHaveTextContent(`Above ${taxBrackets[4].min}`);
    });

    it('should display the correct information per tax bracket', () => {
      const {
        data: { taxBrackets, salary },
      } = setupComponent({ Component: <TaxBrackets /> });

      const bracketCards = screen.getAllByTestId(BRACKET_CARD_TEST_ID);

      bracketCards.forEach((card, index) => {
        const bracket = taxBrackets[index];
        const rate = Number(bracket.rate * 100).toFixed(2);
        const taxesOwed = getCurrencyFormat(getTaxesByBracket({ salary, bracket }));

        expect(card).toHaveTextContent(`Rate: ${rate}%`);
        expect(card).toHaveTextContent(`Taxes owed: ${taxesOwed}`);
      });
    });
  });
});
