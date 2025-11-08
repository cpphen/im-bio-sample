import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { cbApi } from '../../../api'

export type TCurrencyResponseItem = {
  [key: string]: any
}

export interface ICurrenciesResponse {
  [key: string]: any
}

interface ICurrenciesContext {
  currencies: ICurrenciesResponse | undefined,
  fetchCurrenciesDetails: () => void
}

const CurrenciesContextInterface = {
  currencies: {},
  fetchCurrenciesDetails: () => {}
}

export const CurrenciesContext = createContext<ICurrenciesContext>(CurrenciesContextInterface)

const CurrenciesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currencies, setCurrencies] = useState<ICurrenciesResponse>()

  const getCurrecnyList = async (): Promise<ICurrenciesResponse | {}> => {
    try {
      const response = await fetch(cbApi, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data as Promise<ICurrenciesResponse>;
    } catch (error) {
      console.error('Fetch error: getCurrecnyList():', error);
      return {};
    }
  };

  const fetchCurrencies = async () => {
    if (!currencies || currencies.length === 0) {
      const response = await getCurrecnyList()
      setCurrencies(response)
    }
  }

  const fetchCurrenciesDetails = useCallback(fetchCurrencies, [currencies, setCurrencies])

  useEffect(() => {
    fetchCurrenciesDetails()
  }, [])

  const value = useMemo(() => ({
    fetchCurrenciesDetails,
    currencies
  }), [
    currencies
  ])
  
  return (
    <CurrenciesContext.Provider value={value}>
      {children}
    </CurrenciesContext.Provider>
  )
}

export default CurrenciesContextProvider
 