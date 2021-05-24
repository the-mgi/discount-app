import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, ToastAndroid} from 'react-native'
import CustomButton from "../button/button.component";

const StartScreenComponent = () => {
	const [prices, setPrices] = useState({originalPrice: "", discountPercentage: ""});
	const [results, setResults] = useState({youSave: "", finalPrice: ""});
	const [isDisabled, setIsDisabled] = useState(true);

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
			setResults({youSave: offPrice.toFixed(2), finalPrice: (originalPrice - offPrice).toFixed(2)});
			setIsDisabled(false);
			return;
		}
		setResults({youSave: "", finalPrice: ""});
		setIsDisabled(true);
	}, [prices]);

	const addToHistory = () => {

	};

	return (
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
					<CustomButton disabled={isDisabled} disabledColor="lightgray"
												buttonText="Save" colorB="gray" handlePress={addToHistory}/>
				</View>
				<View style={styles.margin}>
					<CustomButton buttonText="View History" colorB="royalblue" handlePress={() => {
					}}/>
				</View>
			</View>
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
	}
});

export default StartScreenComponent;