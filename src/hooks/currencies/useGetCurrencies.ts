import React, { useContext, useEffect, useState } from 'react'
import { CurrenciesContext } from '../../context'
import { ICurrenciesResponse } from '../../context/currencies/currenciesContext'

const useGetCurrencies = () => {
  const [currencies, setCurrencies] = useState<ICurrenciesResponse | undefined>({})
  const currenciesContext = useContext(CurrenciesContext)

  useEffect(() => {
      setCurrencies(currenciesContext?.currencies)
  }, [currenciesContext?.currencies])

  return currencies
}

export default useGetCurrencies
