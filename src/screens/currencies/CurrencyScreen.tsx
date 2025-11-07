import React from 'react'
import { FlatList, View } from 'react-native'
import { CurrencyItem } from '../../components'
import { useGetCurrencies } from '../../hooks'

const CurrencyScreen: React.FC = () => {
  const currencies = useGetCurrencies()

  console.log('currencites', currencies)
  return (
    <View style={{ flex: 1, flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        contentContainerStyle={{ gap: 2 }}
        data={currencies?.data}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        style={{ marginBottom: 80 }}
        renderItem={({ item }: any) => {
          return (
            <CurrencyItem currencyItem={item} />
          );
        }}
      />
    </View>
  )
}

export default CurrencyScreen
