import { getCurrencyFormat } from './money';

describe('Money util', () => {
  describe('getCurrencyFormat', () => {
    it('should return a formatted currency string', () => {
      const money = 123456.78;
      const expected = 'CA$123,456.78';

      const result = getCurrencyFormat(money);

      expect(result).toBe(expected);
    });
  });
});
