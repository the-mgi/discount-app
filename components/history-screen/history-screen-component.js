import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {DataTable} from 'react-native-paper';
import CustomButton from "../button/button.component";

const {Header, Title, Row, Cell} = DataTable;

const HistoryScreenComponent = ({navigation, route}) => {
	const listData = route.params.record;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{marginRight: 10}}><CustomButton handlePress={() => {
					createTwoButtonAlert(-1, "list", "Are you sure you want to delete the complete list?")
				}} buttonText="Clear All" colorB="#f54040"
																											width={120} height={40} borderRadius={5}
																											disabled={listData.length === 0} disabledColor="#f5a4a4"/></View>
			),
		});
	}, [navigation, listData]);

	const createTwoButtonAlert = (index, type = "item", string = "Are you sure you want to delete?") => {
		return Alert.alert(
			"Confirmation",
			string,
			[
				{
					text: "Cancel",
					onPress: () => {
					}
				},
				{
					text: "OK", onPress: () => {
						if (type === "item") {
							listData.splice(index, 1);
							navigation.setParams({
								record: listData
							});
						} else {
							navigation.setParams({
								record: []
							});
						}
					}
				}
			]
		);
	};

	return (
		<View style={{backgroundColor: "white"}}>
			{listData.length ? <View style={styles.mainContainer}>
				<DataTable>
					<Header>
						<Title>No.</Title>
						<Title>Original Price</Title>
						<Title numeric>Discount</Title>
						<Title numeric>Final Price</Title>
						<Title numeric>Action</Title>
					</Header>

					{listData.map((singleRecord, index) => {
						return (
							<Row>
								<Cell>{index + 1}</Cell>
								<Cell numeric>{singleRecord.originalPrice}</Cell>
								<Cell numeric>{singleRecord.discountPercentage}</Cell>
								<Cell numeric>{singleRecord.finalPrice}</Cell>
								<Cell numeric><Text onPress={() => {
									createTwoButtonAlert(index)
								}} style={styles.textDelete}>Delete</Text></Cell>
							</Row>
						);
					})}
				</DataTable>
			</View> : <View style={styles.completeScreen}><Text>No data Available</Text></View>}
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		padding: 10,
		margin: 10
	},
	textDelete: {
		color: "red"
	},
	completeScreen: {
		justifyContent: "center",
		alignItems: "center"
	}
});

export default HistoryScreenComponent;
