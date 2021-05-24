import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';

const {Header, Title, Row, Cell} = DataTable;

const HistoryScreenComponent = ({navigation, route}) => {
	const listData = route.params.record;
	return (
		<View style={{backgroundColor: "white"}}>
			<View style={styles.mainContainer}>
				<DataTable>
					<Header>
						<Title>No.</Title>
						<Title>Original Price</Title>
						<Title numeric>Discount</Title>
						<Title numeric>Final Price</Title>
					</Header>

					{listData.map((singleRecord, index) => {
						return (
							<Row>
								<Cell>{index + 1}</Cell>
								<Cell numeric>{singleRecord.originalPrice}</Cell>
								<Cell numeric>{singleRecord.discountPercentage}</Cell>
								<Cell numeric>{singleRecord.finalPrice}</Cell>
							</Row>
						);
					})}
				</DataTable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		padding: 10,
		margin: 10
	}
});

export default HistoryScreenComponent;
