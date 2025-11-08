import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREEN_PAGES } from '../../configs'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#FFFFFF',
        }}
      >
        {
          SCREEN_PAGES.pages.map((page, index) => (
            <Stack.Screen
              key={`screens-${index}`}
              name={page.name}
              component={page.component}
              options={page.styles}
            />
          ))
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
