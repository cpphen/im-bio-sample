import React, { useEffect, useState } from "react"
import { Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { TCurrencyResponseItem } from "../../context/currencies/currenciesContext";

interface ICurrencyItemProps {
  currencyItem: TCurrencyResponseItem;
  favoriteCurrencies: TCurrencyResponseItem[];
  updateFavoriteAsyncStorage: (currencyItem: TCurrencyResponseItem, favorited: boolean) => void;
}

const CurrencyItem: React.FC<ICurrencyItemProps> = ({
  currencyItem,
  favoriteCurrencies,
  updateFavoriteAsyncStorage
}) => {
  const [favorited, setFavorited] = useState<boolean>(false)

  useEffect(() => {
    const isFavorited = favoriteCurrencies.find((item) => currencyItem.id === item.id)
    if (isFavorited) {
      setFavorited(true)
    }
  }, [favoriteCurrencies])

  const handleItemPress = () => {
    updateFavoriteAsyncStorage(currencyItem, !favorited)
    setFavorited(!favorited)
  }

  return (
    <Pressable
      onPress={handleItemPress}
      style={{ flexBasis: '100%', flex: 1 }}
    >
      <Card
        mode="elevated"
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          marginBottom: 2
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{ color: '#000000', fontSize: 15 }}
            variant="titleLarge"
          >
            <Text style={{ fontWeight: 'bold' }}>ID:</Text> {currencyItem?.id}
          </Text>
          <Text
            style={{ color: '#000000', fontSize: 15 }}
            variant="titleLarge"
          >
            <Text style={{ fontWeight: 'bold' }}>Name:</Text> {currencyItem?.name}
          </Text>
          <Text
            style={{ color: '#000000', fontSize: 15 }}
            variant="titleLarge"
          >
            <Text style={{ fontWeight: 'bold' }}>Size:</Text> {currencyItem?.min_size}
          </Text>
        </View>
        <View style={{ flex: 1, padding: 3 }}>
          <FontAwesome6
            color={favorited ? `#FFFF00` : `#0d6efd`}
            name={`star`}
            size={20}
            iconStyle={favorited ? 'solid' : 'regular'}
          />
        </View>
      </Card>
    </Pressable>
  )
}

export default CurrencyItem
