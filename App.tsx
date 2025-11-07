import {  StyleSheet, View } from 'react-native';
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
    <CurrenciesContextProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Navigator />
        </View>
      </SafeAreaProvider>
    </CurrenciesContextProvider >
  );
}

export default App;
