import { createContext, ReactNode, useReducer } from 'react';
import { TaxBracket } from '../types/TaxBracket';

type Data = {
  salary: number;
  taxBrackets: TaxBracket[];
};

type TaxContextValue = {
  data: Data;
  setData: (data: Data) => void;
};

export const TaxContext = createContext<TaxContextValue>({
  data: { salary: 0, taxBrackets: [] },
  setData: () => {},
});

export const TaxContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useReducer(
    (state: Data, action: Partial<Data>) => ({ ...state, ...action }),
    { salary: 0, taxBrackets: [] },
  );

  return <TaxContext.Provider value={{ data, setData }}>{children}</TaxContext.Provider>;
};
