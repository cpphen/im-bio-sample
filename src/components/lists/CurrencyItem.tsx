import React, { useState } from "react"
import { Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const CurrencyItem: React.FC<any> = ({ currencyItem }) => {
  const [favorited, setFavorited] = useState<boolean>(false)

  const handleItemPress = () => setFavorited(!favorited)

  console.log('currency item', currencyItem)
  return (
    <Pressable
      onPress={handleItemPress}
      style={{ flexBasis: '100%', flexGrow: 1 }}
    >
      <Card
        mode="elevated"
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingLeft: 10,
          paddingTop: 20,
          paddingBottom: 20,
          paddingRight: 10,
          borderRadius: 0,
          backgroundColor: '#FFFFFF',
          borderColor: '#0052FF',
          borderTopWidth: 0.7,
          borderBottomWidth: 0.7,
          marginBottom: 2
        }}
      >
        <View style={{flexBasis: '50%'}}>
          <Text
            style={{ color: '#000000' }}
            variant="titleLarge"
          >
            ID: {currencyItem?.id}
          </Text>
          <Text
            style={{ color: '#000000' }}
            variant="titleLarge"
          >
            Name: {currencyItem?.name}
          </Text>
          <Text
            style={{ color: '#000000' }}
            variant="titleLarge"
          >
            {currencyItem?.min_size}
          </Text>
        </View>
        <FontAwesome6
          style={{flexBasis: '50%'}}
          color={favorited ? `#FFFF00` : `#0d6efd`}
          name={`star`}
          size={10}
          iconStyle={favorited ? 'solid' : 'regular'}
        />
      </Card>
    </Pressable>
  )
}

export default CurrencyItem
