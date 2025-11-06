import React, { useContext, useEffect, useState } from 'react'
import { CurrenciesContext } from '../../context'
import { ICurrenciesResponse } from '../../context/currencies/currenciesContext'

const useGetCurrencies = () => {
  const [currencies, setCurrencies] = useState<ICurrenciesResponse[]>([])
  const currenciesContext = useContext(CurrenciesContext)

  console.log('hooks', currencies)
  useEffect(() => {
    if (!currenciesContext?.currencies || currenciesContext?.currencies?.length == 0) {
      currenciesContext.fetchCurrenciesDetails()
    } else {
      setCurrencies(currenciesContext?.currencies)
    }
  }, [currencies, setCurrencies])

  return currencies
}

export default useGetCurrencies
