import React, { useCallback, useEffect } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { asyncStorageKeys, screens } from '../../configs'

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const navigateScreen = () => navigation.navigate(screens.currencies)

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button mode='elevated' rippleColor={`#719bf5`} style={{ backgroundColor: '#0052FF' }} onPress={navigateScreen}>
          <Text style={{ color: '#FFF', fontSize: 20 }}>
            View Currencies
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Home
