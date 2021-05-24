import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CustomButton = ({buttonText, handlePress, width, colorB, disabled, disabledColor, height = 80, borderRadius = 25, ...styleProps}) => {
	return (
		<TouchableOpacity disabled={disabled} onPress={() => handlePress(buttonText)} style={{...styleProps}}>
			<View style={{...styles.button, backgroundColor: disabled ? disabledColor : colorB, width: width, height: height, borderRadius: borderRadius}}>
				<Text style={{...styles.buttonText}}>
					{buttonText}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		height: 80
	},
	buttonText: {
		color: "white",
		fontSize: 18
	}
});

export default CustomButton;
