import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import BootSplash from 'react-native-bootsplash';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREEN_PAGES } from '../../configs'
// import {UserContext} from '../../context';
// import {Login, PendingScreen, Surveys, SurveyQuestions} from '../../screens';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  // const checkAuthentication = async () => {
  //   const user = await AsyncStorage.getItem(storageKeys.user);
  //   const idToken = await AsyncStorage.getItem(storageKeys.idToken);

  //   if (
  //     user &&
  //     (!userContext?.userDetails ||
  //       Object.keys(userContext?.userDetails).length === 0) &&
  //     accessToken
  //   ) {
  //     (await userContext) &&
  //       userContext?.getUserByEmail &&
  //       userContext?.getUserByEmail(JSON.parse(user), accessToken);
  //   }

  //   if (!user && !idToken) {
  //     await setAuthenticated(false);
  //   } else if (user && idToken) {
  //     await setAuthenticated(true);
  //   }
  // };

  // useEffect(() => {
  //   checkAuthentication();
  // }, [accessToken, userContext]);

  return (
    // <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#262626',
          },
          headerTintColor: '#FFFFFF',
        }}>
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
  );
};

export default Navigator;
