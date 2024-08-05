import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoListScreen from './src/screens/TodoListScreen';
import { deviceInfo } from './src/functions/DeviceInfo';


export default function App() {
  return (
    
      <SafeAreaView style={styles.container} >
          <TodoListScreen/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: deviceInfo.isDesktop ? null : 30,
    marginVertical: deviceInfo.isDesktop ? 125 : 45,
    width: deviceInfo.isDesktop ? '100%' : null,
    //alignItems: deviceInfo.isDesktop ? 'stretch' : null,
    justifyContent: deviceInfo.isDesktop ? 'center' : null,
    marginLeft: deviceInfo.isDesktop ? 550 : null,
    marginRight: deviceInfo.isDesktop ? 550 : null,
  },
});
