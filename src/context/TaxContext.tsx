import { createContext, ReactNode, useReducer } from 'react';
import { TaxBracket } from '../types/TaxBracket';

type Data = {
  salary: number;
  taxBrackets: TaxBracket[];
};

type Action = {
  type: 'SET_SALARY' | 'SET_TAX_BRACKETS';
  data: Partial<Data>;
};

type TaxContextValue = {
  data: Data;
  setData: (action: Action) => void;
};

export const TaxContext = createContext<TaxContextValue>({
  data: { salary: 0, taxBrackets: [] },
  setData: () => {},
});

const reducer = (state: Data, action: Action): Data => {
  switch (action.type) {
    case 'SET_SALARY':
      return { ...state, salary: action.data.salary ?? state.salary };
    case 'SET_TAX_BRACKETS':
      return { ...state, taxBrackets: action.data.taxBrackets ?? state.taxBrackets };
    default:
      return state;
  }
};

export const TaxContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useReducer(reducer, {
    salary: 0,
    taxBrackets: [],
  });

  return <TaxContext.Provider value={{ data, setData }}>{children}</TaxContext.Provider>;
};
