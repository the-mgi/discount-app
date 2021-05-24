import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native'
import CustomButton from "../button/button.component";
import {StatusBar} from "expo-status-bar";


const StartScreenComponent = ({navigation}) => {
	const [prices, setPrices] = useState({originalPrice: "", discountPercentage: ""});
	const [results, setResults] = useState({youSave: "", finalPrice: ""});
	const [isDisabled, setIsDisabled] = useState(true);
	const [completeDiscountRecord, setCompleteDiscountRecord] = useState([]);

	const showToast = (text = "Something went wrong") => {
		ToastAndroid.show(text, ToastAndroid.SHORT);
	};

	const handleTextInputChange = (text, type) => {
		if (text.length > 0 && !(+text)) {
			return;
		}
		if (type === "discountPercentage" && +text > 100) {
			showToast("Discount Percentage cannot be greater than 100");
			return;
		}
		setPrices({...prices, [type]: text});
	};

	useEffect(() => {
		if (!prices.originalPrice.length && !prices.discountPercentage.length) {
			showToast("Both Input Fields are Empty!");
			setIsDisabled(true);
			return;
		}
		let [originalPrice, discountPercentage] = [+prices.originalPrice, +prices.discountPercentage];

		if (originalPrice && discountPercentage) {
			const offPrice = (discountPercentage * originalPrice) / 100;
			const youSave = offPrice.toFixed(2);
			const finalPrice = (originalPrice - offPrice).toFixed(2);
			setResults({youSave, finalPrice});
			setIsDisabled(false);
			return;
		}
		setResults({youSave: "", finalPrice: ""});
		setIsDisabled(true);
	}, [prices]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{marginRight: 10}}><CustomButton handlePress={() => {
					navigation.navigate("historyScreen", {record: completeDiscountRecord})
				}} buttonText="History" colorB="royalblue"
																											width={120} height={40} borderRadius={5}/></View>
			),
		});
	}, [navigation, completeDiscountRecord]);

	const addToHistory = () => {
		setCompleteDiscountRecord([...completeDiscountRecord, {
			originalPrice: prices.originalPrice,
			discountPercentage: prices.discountPercentage,
			finalPrice: results.finalPrice
		}]);
		setIsDisabled(true);
	};

	return (
		<View style={styles.container}>
			<View>
				<View>
					<Text style={{...styles.margin, marginBottom: 0}}>Original Price</Text>
					<TextInput style={{...styles.textInput, ...styles.margin}} placeholder="Original Price"
										 value={prices.originalPrice}
										 keyboardType="numeric" onChangeText={(text) => {
						handleTextInputChange(text, "originalPrice")
					}}/>
					<Text style={{...styles.margin, marginBottom: 0}}>Discount Percentage</Text>
					<TextInput style={{...styles.textInput, ...styles.margin}} placeholder="Discount Percentage"
										 value={prices.discountPercentage}
										 keyboardType="numeric" onChangeText={(text) => {
						handleTextInputChange(text, "discountPercentage")
					}}/>
				</View>
				<View style={{...styles.justifyContent, ...styles.margin}}>
					<View>
						<Text style={styles.subHeading}>You Save</Text>
						<Text>{results.youSave ? `$${results.youSave}` : "..."}</Text>
					</View>
					<View>
						<Text style={styles.subHeading}>Final Price</Text>
						<Text>{results.finalPrice ? `$${results.finalPrice}` : "..."}</Text>
					</View>
				</View>
				<View>
					<View style={styles.margin}>
						<CustomButton disabled={isDisabled} disabledColor="#a5bafa"
													buttonText="Save" colorB="royalblue" handlePress={addToHistory}/>
					</View>
				</View>
			</View>
			<StatusBar style="auto"/>
		</View>
	);
};

const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 8,
		width: 200
	},
	margin: {
		margin: 10
	},
	justifyContent: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	subHeading: {
		fontWeight: "bold"
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default StartScreenComponent;
