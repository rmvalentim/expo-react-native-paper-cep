import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider, MD2LightTheme as DefaultTheme } from 'react-native-paper';
import Home from './Home';

export default function App() {

  return (
    <PaperProvider theme={DefaultTheme}>
      <View>
        <Home />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}