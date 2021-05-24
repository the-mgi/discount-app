import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import StartScreenComponent from "./components/start-screen/start-screen.component";

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export default function App() {
	const [completeDiscountRecord, setCompleteDiscountRecord] = useState([]);

	const Stack = createStackNavigator();

	const StackHistory = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Start Screen"
					component={StartScreenComponent}
					options={{headerShown: true}}
				/>
			</Stack.Navigator>
		);
	};

	return (
		<NavigationContainer>
			<StackHistory/>
		</NavigationContainer>
	);
}
