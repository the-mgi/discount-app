import React, {useState} from 'react';
import StartScreenComponent from "./components/start-screen/start-screen.component";

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import HistoryScreenComponent from "./components/history-screen/history-screen-component";
import {Provider as PaperProvider} from 'react-native-paper';


export default function App() {

	const Stack = createStackNavigator();

	const StackHistory = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="startScreen"
					component={StartScreenComponent}
					options={{headerShown: true, headerTitle: "Perform Calculation", headerLeft: HeaderBackButton}}
				/>
				<Stack.Screen
					name="historyScreen"
					component={HistoryScreenComponent}
					options={{headerShown: true, headerTitle: "Calculations History", headerLeft: HeaderBackButton}}
				/>
			</Stack.Navigator>
		);
	};

	return (
		<PaperProvider>
			<NavigationContainer>
				<StackHistory/>
			</NavigationContainer>
		</PaperProvider>
	);
}
