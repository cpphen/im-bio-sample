import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Platform, Text, View } from 'react-native'
import { Checkbox, Searchbar, Snackbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'
import { CurrencyItem } from '../../components'
import { useGetCurrencies } from '../../hooks'
import { asyncStorageKeys } from '../../configs'
import { TCurrencyResponseItem } from '../../context/currencies/currenciesContext'

const CurrencyScreen: React.FC = () => {
  const netinfo = useNetInfo()
  const currencies = useGetCurrencies()
  const [currencyList, setCurrencyList] = useState<TCurrencyResponseItem[]>([])
  const [noFilteredResults, setNoFilteredResults] = useState<boolean>(false)
  const [showOfflineBar, setShowOfflineBar] = useState<boolean>(netinfo.isConnected === false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [favoriteCurrencies, setFavoriteCurrencies] = useState<TCurrencyResponseItem[]>([])
  const [viewFavorites, setViewFavorites] = useState<"unchecked" | "checked" | "indeterminate">('unchecked')

  /**
   * Callbacks
   */
  const getAsyncStorageFavorites = useCallback(async () => {
    const asyncFavoritedCurrencies = await AsyncStorage.getItem(asyncStorageKeys.favoriteCurrencies)
    if (asyncFavoritedCurrencies) {
      const parsedAsyncFavoritedCurrencies = JSON.parse(asyncFavoritedCurrencies)
      setFavoriteCurrencies(parsedAsyncFavoritedCurrencies)
    }
  }, [])

  const getCachedData = useCallback(async () => {
    const cachedData = await AsyncStorage.getItem(asyncStorageKeys.saveCurrencyRequestData)
    if (cachedData) {
      const cList = JSON.parse(cachedData)
      setCurrencyList(cList?.data)
    }
  }, [])
  /************************************************************************************************* */

  useEffect(() => {
    if (!netinfo.isConnected) {
      getCachedData()
    }
  }, [netinfo])

  useEffect(() => {
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
      const updatedFavorites = [...favoriteCurrencies, currencyItem]
      setFavoriteCurrencies([...favoriteCurrencies, currencyItem])
      await AsyncStorage.setItem(asyncStorageKeys.favoriteCurrencies, JSON.stringify(updatedFavorites))
    } else {
      const filtered = favoriteCurrencies.filter((item: TCurrencyResponseItem) => item.id !== currencyItem.id)
      setFavoriteCurrencies([...filtered])
      await AsyncStorage.setItem(asyncStorageKeys.favoriteCurrencies, JSON.stringify(filtered))
    }
  }

  const handleViewFavorites = () => {
    if (viewFavorites === 'checked') {
      setViewFavorites('unchecked')
      setCurrencyList(currencies?.data)
    } else {
      setViewFavorites('checked')
      setCurrencyList([...favoriteCurrencies])
    }
  }

  const dismissOfflineBar = () => setShowOfflineBar(false)

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", backgroundColor: '#FDFFFF' }}>
      {noFilteredResults && (
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>No Results</Text>
      )}
      <FlatList
        contentContainerStyle={{ gap: 2 }}
        data={currencyList}
        keyExtractor={(item: TCurrencyResponseItem) => item.id.toString()}
        style={{ marginBottom: 80, paddingLeft: 5, paddingRight: 5 }}
        renderItem={({ item }: TCurrencyResponseItem) =>
          <CurrencyItem currencyItem={item} favoriteCurrencies={favoriteCurrencies} updateFavoriteAsyncStorage={updateFavoriteAsyncStorage} />}
      />
      <Snackbar
        action={{
          label: 'Okay',
          onPress: () => {
            dismissOfflineBar()
          },
        }}
        style={{ flex: 1 }}
        onDismiss={() => null}
        visible={showOfflineBar}>
        <Text>Currently Offline</Text>
      </Snackbar>
      <Snackbar
        action={{
          label: 'Clear',
          onPress: () => {
            resetQuery()
          },
        }}
        style={{ flex: 1, opacity: 0.9, alignItems: 'center' }}
        onDismiss={() => null}
        visible={true}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }} >
            <FontAwesome6
              color={`#FFFF00`}
              name={`star`}
              size={15}
              style={{ marginBottom: 10, marginLeft: 10, marginRight: 5 }}
              iconStyle={'solid'}
            />
            <Text style={{ color: '#FFFFFF' }}>{favoriteCurrencies.length}</Text>
          </View>
          <Checkbox.Item
            color='#FFFFFF'
            label='View Favorites'
            labelStyle={{ color: '#FFFFFF' }}
            mode={Platform.OS === 'android' ? 'android' : 'ios'}
            onPress={handleViewFavorites}
            status={viewFavorites}
            style={{ flex: 1, alignSelf: 'flex-end' }}
            uncheckedColor='#FFFFFF'
          />
        </View>
        <Searchbar
          elevation={2}
          icon={() => null}
          clearIcon={() => (
            <FontAwesome6
              name={`x`}
              size={12}
              iconStyle={'solid'}
            />
          )}
          placeholder="Search"
          onChangeText={filterCurrencyList}
          value={searchQuery}
        />
      </Snackbar >
    </SafeAreaView>
  )
}

export default CurrencyScreen
