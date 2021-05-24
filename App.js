import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import StartScreenComponent from "./components/start-screen/start-screen.component";

export default function App() {
	const [completeDiscountRecord, setCompleteDiscountRecord] = useState([]);
	return (
		<View style={styles.container}>
			<StartScreenComponent setCompleteDiscountRecord={setCompleteDiscountRecord}/>
			<StatusBar style="auto"/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	}
});
