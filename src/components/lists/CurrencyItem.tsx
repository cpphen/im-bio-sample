import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { List } from 'react-native-paper'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { TCurrencyResponseItem } from '../../context/currencies/currenciesContext'

interface ICurrencyItemProps {
  currencyItem: TCurrencyResponseItem
  favoriteCurrencies: TCurrencyResponseItem[]
  updateFavoriteAsyncStorage: (currencyItem: TCurrencyResponseItem, favorited: boolean) => void
}

const CurrencyItem: React.FC<ICurrencyItemProps> = ({
  currencyItem,
  favoriteCurrencies,
  updateFavoriteAsyncStorage
}) => {
  const [favorited, setFavorited] = useState<boolean>(false)
  const scaleAnimation = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const isFavorited = favoriteCurrencies.find((item) => currencyItem.id === item.id)
    if (isFavorited) {
      setFavorited(true)
    }
  }, [favoriteCurrencies])

  const beginScaleAnimation = () => {
    Animated.timing(scaleAnimation, {
      toValue: 1.3,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start()
    })
  }

  const handleItemPress = () => {
    beginScaleAnimation()
    updateFavoriteAsyncStorage(currencyItem, !favorited)
    setFavorited(!favorited)
  }

  return (
    <List.Item
      description={`Name: ${currencyItem?.name}`}
      onPress={() => null}
      right={() => (
        <Animated.View
          style={[
            { transformOrigin: 'center' },
            {
              transform: [{ scale: scaleAnimation }],
            },
            {alignSelf: 'center'}
          ]}
        >
          <FontAwesome6
            color={favorited ? `#FFFF00` : `#0d6efd`}
            iconStyle={favorited ? 'solid' : 'regular'}
            name={`star`}
            onPress={handleItemPress}
            size={20}
          />

        </Animated.View>
      )}
      style={{
        flex: 1,
        width: '100%',
        marginBottom: 5,
        borderColor: '#0052FF',
        borderWidth: 0.5,
        borderRadius: 7,
      }}
      title={`ID: ${currencyItem?.id}`}
    />
  )
}

export default CurrencyItem
