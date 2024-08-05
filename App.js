import { StyleSheet, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import TodoListScreen from './src/screens/TodoListScreen';
import { deviceInfo } from './src/functions/DeviceInfo';

export default function App() {

  const statusBarHeight = Constants.statusBarHeight;

  return (
      <View style={styles.container} >
        <StatusBar />
        <TodoListScreen/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: deviceInfo.isDesktop ? null : 30,
    marginVertical: deviceInfo.isDesktop ? 65 : 40,
    width: deviceInfo.isDesktop ? '100%' : null,
    //alignItems: deviceInfo.isDesktop ? 'stretch' : null,
    justifyContent: deviceInfo.isDesktop ? 'center' : null,
    marginLeft: deviceInfo.isDesktop ? 550 : null,
    marginRight: deviceInfo.isDesktop ? 550 : null,
  },
});
