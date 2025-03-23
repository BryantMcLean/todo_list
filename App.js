import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from './src/screens/TodoListScreen';
import { deviceInfo } from './src/functions/DeviceInfo';
import SortFilterScreen from './src/screens/SortFilterScreen';
import PrintTodoListScreen from './src/screens/PrintTodoListScreen';
import { SortFilterProvider } from './src/functions/SortFilterContext';

export default function App() {

	const Stack = createStackNavigator();


	return (
		<SortFilterProvider>
			<NavigationContainer >
				<View style={styles.container}>
					<StatusBar />
					<Stack.Navigator initialRouteName='TodoListScreen'>
						<Stack.Screen
						name='TodoListScreen'
						component={TodoListScreen}
						options={{
							title: "Todo List",
							headerTitleStyle:{
							fontSize: 20,
							fontWeight: '700',
							alignSelf: 'center',
							color: '#337ab7',
							}
						}}
						/>
						<Stack.Screen
						name='SortFilterScreen'
						component={SortFilterScreen}
						options={{
							title: "Sort & Filter",
							headerTitleStyle:{
							fontSize: 20,
							fontWeight: '700',
							alignSelf: 'center',
							color: '#337ab7',
							}
						}}
						/>
						<Stack.Screen
						name='PrintTodoListScreen'
						component={PrintTodoListScreen}
						options={{
							title: "Print Todo List",
							headerTitleStyle:{
							fontSize: 20,
							fontWeight: '700',
							alignSelf: 'center',
							color: '#337ab7',
							}
						}}
						/>
					</Stack.Navigator>
				</View>
			</NavigationContainer>
		</SortFilterProvider>
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
