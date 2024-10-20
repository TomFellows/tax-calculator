export const getCurrencyFormat = (money: number) => {
  const cad = Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
  });

  return cad.format(money);
};
