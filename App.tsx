import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Navigator } from './src/components'
import {
  CurrenciesContextProvider
} from './src/context'



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  return (
    <SafeAreaProvider>
      <CurrenciesContextProvider>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="white"
            barStyle="light-content"
            animated={true}
          />
          <Navigator />
        </View>
      </CurrenciesContextProvider >
    </SafeAreaProvider>
  );
}

export default App;
