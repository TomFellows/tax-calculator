export type TaxBracket = {
  max?: number;
  min: number;
  rate: number;
};

export type RateQueryResponse = {
  tax_brackets: TaxBracket[];
};
