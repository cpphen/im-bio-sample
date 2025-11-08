import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Searchbar, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrencyItem } from '../../components'
import { useGetCurrencies } from '../../hooks'
import { asyncStorageKeys } from '../../configs';
import { TCurrencyResponseItem } from '../../context/currencies/currenciesContext';

const CurrencyScreen: React.FC = () => {
  const currencies = useGetCurrencies()
  const [currencyList, setCurrencyList] = useState([])
  const [noFilteredResults, setNoFilteredResults] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [favoriteCurrencies, setFavoriteCurrencies] = useState<TCurrencyResponseItem[]>([])

  const getAsyncStorageFavorites = useCallback(async () => {
    const asyncFavoritedCurrencies = await AsyncStorage.getItem(asyncStorageKeys.favoriteCurrencies)
    if (asyncFavoritedCurrencies) {
      const parsedAsyncFavoritedCurrencies = JSON.parse(asyncFavoritedCurrencies)
      setFavoriteCurrencies(parsedAsyncFavoritedCurrencies)
      console.log('parsedAsyncFavoritedCurrencies', parsedAsyncFavoritedCurrencies)
    }
    console.log('asyncFavoritedCurrencies', asyncFavoritedCurrencies)
  }, [])

  console.log('favoriteCurrencies state', favoriteCurrencies)

  useEffect(() => {
    console.log('\n USEEEE \n', favoriteCurrencies)
    getAsyncStorageFavorites()
  }, [])

  useEffect(() => {
    if (currencies?.data) {
      setCurrencyList(currencies?.data)
    }
  }, [currencies?.data])

  const filterCurrencyList = (query: string) => {
    setSearchQuery(query)
    const filteredList =
      currencies?.data?.filter((item: TCurrencyResponseItem) =>
        item?.id.toLowerCase().includes(query) || item?.name.toLowerCase().includes(query))

    if (filteredList.length === 0) {
      setNoFilteredResults(true)
    } else {
      setNoFilteredResults(false)
    }
    setCurrencyList(filteredList)
  }

  const resetQuery = () => {
    setNoFilteredResults(false)
    setSearchQuery('')
    setCurrencyList(currencies?.data)
  }

  const updateFavoriteAsyncStorage = async (currencyItem: TCurrencyResponseItem, favorited: boolean) => {
    if (favorited) {
      console.log('if favorited updateFavoriteAsyncStorage currencyItem', currencyItem)
      console.log('if favorited updateFavoriteAsyncStorage favoriteCurrencies', favoriteCurrencies)

      const updatedFavorites = [...favoriteCurrencies, currencyItem]

      console.log('updatedFavorites currencyItem', updatedFavorites)

      setFavoriteCurrencies([...favoriteCurrencies, currencyItem])
      await AsyncStorage.setItem(asyncStorageKeys.favoriteCurrencies, JSON.stringify(updatedFavorites))
    } else {
      const filtered = favoriteCurrencies.filter((item: TCurrencyResponseItem) => item.id !== currencyItem.id)

      console.log('else favorited updateFavoriteAsyncStorage favoriteCurrencies', favoriteCurrencies)
      console.log('updatedFavorites filtered', filtered)

      setFavoriteCurrencies([...filtered])

      await AsyncStorage.setItem(asyncStorageKeys.favoriteCurrencies, JSON.stringify(filtered))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDFFFF' }}>
      {noFilteredResults && (
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>No Results</Text>
      )
      }
      <View style={{ flex: 1, flexGrow: 1, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          contentContainerStyle={{ gap: 2 }}
          data={currencyList}
          keyExtractor={(item: TCurrencyResponseItem) => item.id.toString()}
          numColumns={2}
          style={{ marginBottom: 80 }}
          renderItem={({ item }: TCurrencyResponseItem) =>
            <CurrencyItem currencyItem={item} favoriteCurrencies={favoriteCurrencies} updateFavoriteAsyncStorage={updateFavoriteAsyncStorage} />}
        />
      </View>
      <Snackbar
        action={{
          label: 'Clear',
          onPress: () => {
            resetQuery()
          },
        }}
        style={{ flex: 1 }}
        onDismiss={() => null}
        visible={true}
      >
        <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
          <FontAwesome6
            color={`#FFFF00`}
            name={`star`}
            size={15}
            style={{ marginBottom: 10, marginLeft: 10, marginRight: 2 }}
            iconStyle={'solid'}
          />
          <Text style={{ color: '#FFFFFF' }}>{favoriteCurrencies.length}</Text>
        </View>
        <Searchbar
          elevation={2}
          placeholder="Search"
          onChangeText={filterCurrencyList}
          value={searchQuery}
        />
      </Snackbar >
    </SafeAreaView>
  )
}

export default CurrencyScreen
