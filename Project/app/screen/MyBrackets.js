/**
 * Yonis Larsson (yonis.larsson.biz@gmail.com)
 * April 9th, 2016
 */
'use strict';

var React = require("react-native");
var Resource = require("./../resource/Resources");
var BracketSamples = require("./../global/BracketSamples");
var Utils = require('./../global/Utils');

var {
	Component,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	ListView
} = React;

class MyBrackets extends Component {
	state = {
		data: BracketSamples,//.splice(0).splice(Utils.getMostRecentBracketItem(BracketSamples), 1),
		dataSource: new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		})
	};

	renderNavTopBar() {
		return (
			<View style={Resource.getStyle('actionbar').container}>
				<TouchableOpacity onPress={() => {}} style={styles.actionBarBack}>
					<Image
						style={styles.actionBarBackIcon}
						source={require('image!icon_back')}
						resizeMode={Image.resizeMode.scale}
						/>
					<Text style={Resource.getStyle('actionbar').back}>Back</Text>
				</TouchableOpacity>
				<Text style={Resource.getStyle('actionbar').title}>{Resource.getString('MyBrackets')}</Text>
				<TouchableOpacity onPress={() => {}} style={{width:60}}>
					<Image
						style={Resource.getStyle('actionbar').icon}
						source={require('image!icon_camera')}
						resizeMode={Image.resizeMode.contain}
						/>
				</TouchableOpacity>
			</View>
		)
	}
	renderStepItemMR(step, status){
		var colorName = status == 0 ? 'incomplete' : (status === 1 ? 'waiting' : 'complete');
		return (
			<View style={styles.mrItem}>
				<Text style={styles.mrCircleTitle}>{step}</Text>
				<View style={[styles.mrCircle, StyleSheet.create({combine:{backgroundColor:Resource.getColor(colorName)}}).combine]}></View>
			</View>
		)
	}
	renderMostRecentArea(bracket) {
		return (
			<TouchableOpacity onPress={() => {this.handleClick(BracketSamples.indexOf(bracket))}} style={styles.mostRecentContainer}>
				<View style={styles.topMRArea}>
					<Text style={styles.topMRAreaText}>YOUR MOST</Text>
					<Text style={styles.topMRAreaText}>RECENT BRACKET</Text>
				</View>
				<View style={styles.centerMRArea}>
					<View style={styles.mrItemContiner}>
						<View style={styles.mrBar}></View>
						{this.renderStepItemMR('ORDER', Utils.getStatus(bracket, 'ORDER'))}
						{this.renderStepItemMR('SHIPMENT', Utils.getStatus(bracket, 'SHIPMENT'))}
						{this.renderStepItemMR('INVOICE', Utils.getStatus(bracket, 'INVOICE'))}
						{this.renderStepItemMR('PAYMENT', Utils.getStatus(bracket, 'PAYMENT'))}
					</View>
				</View>
				<View style={styles.bottomMRArea}>
					<Text style={styles.bottomMRAreaTitle}>{bracket['title']}</Text>
					<Text style={styles.bottomMRAreaParty}>SELLER/BUYER ... ...</Text>
				</View>
			</TouchableOpacity>
		);
	}
	renderListViewRow(item, sectionID, rowID) {
		var bracket = this.state.data[rowID];
		return (
			<View style={styles.listViewItem}>
				{this.renderEachBracketArea(bracket)}
			</View>
		);
	}
	renderEachBracketArea(bracket) {
		return (
			<TouchableOpacity onPress={() => {this.handleClick(BracketSamples.indexOf(bracket))}} style={styles.listItemContainer}>
				<View style={styles.bottomMRArea}>
					<Text style={styles.listItemTitle}>{bracket['title']}</Text>
				</View>
				<View style={styles.centerMRArea}>
					<View style={styles.listItemContiner}>
						<View style={styles.listBar}></View>
						{this.renderStepItemList(Utils.getStatus(bracket, 'ORDER'))}
						{this.renderStepItemList(Utils.getStatus(bracket, 'SHIPMENT'))}
						{this.renderStepItemList(Utils.getStatus(bracket, 'INVOICE'))}
						{this.renderStepItemList(Utils.getStatus(bracket, 'PAYMENT'))}
					</View>
				</View>
				{this.renderListItemBottomDescription(bracket)}
			</TouchableOpacity>
		);
	}
	renderListItemBottomDescription(bracket) {
		var status = Utils.getStatus(bracket, 'PAYMENT');
		var color = status == 2 ? Resource.getColor('complete') : Resource.getColor('waiting');
		var text = Utils.getDescription(bracket, '');
		//var icon = 'icon_exclamation';
		//<Image
		//	style={[styles.listItemBottomDescriptionIcon, StyleSheet.create({combine:{tintColor:'blue'}}).combine]}
		//	source={require('image!icon_exclamation')}
		//	resizeMode={Image.resizeMode.scale}
		//	/>
		return (
			<View style={styles.listBottomDescription}>

				<Text style={[styles.listBottomDescriptionText, StyleSheet.create({color:{color}}).color]}>{text}</Text>
			</View>
		);
	}
	renderStepItemList(status){
		var colorName = status == 0 ? 'incomplete' : (status === 1 ? 'waiting' : 'complete');
		return (
			<View style={styles.mrItem}>
				<View style={[styles.listCircle, StyleSheet.create({combine:{backgroundColor:Resource.getColor(colorName)}}).combine]}></View>
			</View>
		)
	}

	renderBottomArea() {
		var dataSource = this.state.dataSource.cloneWithRows(this.state.data);
		return (
			<ListView
				style={styles.listView}
				dataSource={dataSource}
				renderRow={(item, sectionID, rowID)=>this.renderListViewRow(item, sectionID, rowID)}
				/>
		);
	}

	render() {
        var mrBracket = BracketSamples[Utils.getMostRecentBracketItem(BracketSamples)];
        return (
            <View style={styles.viewContainer}>
							{this.renderNavTopBar()}
							{this.renderMostRecentArea(mrBracket)}
							{this.renderBottomArea()}
            </View>
        );
    }
	handleClick(index) {
		console.info("handleClick " + index);
		var navigator = this.props.navigator;
		navigator.push({
			id: Resource.getString('DetailedBracketInfo'),
			bracket: BracketSamples[index]
		});
	}
}

var styles = StyleSheet.create({
	viewContainer:{
		flexDirection: 'column',
		flex: 1
	},
	actionBarBack:{
		flexDirection: 'row',
		alignItems: 'center'
	},
	actionBarBackIcon:{
		tintColor: Resource.getColor('actionbutton'),
		width:15,
		height: 30
	},
	mostRecentContainer: {
		flex: 0.6,
		flexDirection: 'column',
		backgroundColor: 'white'
	},
	topMRArea: {
		margin: 10,
		flex: 1
	},
	topMRAreaText: {
		textAlign: 'right',
		color: 'red',
		fontSize: Resource.getFontSize(20)
	},
	centerMRArea : {
		flex: 1
	},
	mrItemContiner: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50
	},
	mrItem: {
		flex: 1,
		alignItems: 'center'
	},
	mrBar: {
		position: 'absolute',
		top: 30,
		left: 50,
		width: Resource.dimension.width - 100,
		height: 10,
		backgroundColor: '#eee'
	},
	mrCircleTitle: {
		color: Resource.getColor('description')
	},
	mrCircle: {
		marginTop: 5,
		height: 40,
		width: 40,
		borderRadius: 40,
		backgroundColor: 'blue',
		borderColor: '#eee',
		borderWidth : 5
	},
	listCircle: {
		marginTop: 5,
		height: 20,
		width: 20,
		borderRadius: 23,
		backgroundColor: 'blue',
		borderColor: '#eee',
		borderWidth : 2
	},
	bottomMRArea: {
		alignItems: 'flex-end',
		margin: 20,
		flexDirection: 'row',
		flex:0.5
	},
	bottomMRAreaTitle: {
		fontSize: Resource.getFontSize(40),
		textAlign: 'left',
		flex: 1
	},
	bottomMRAreaParty: {
		textAlign: 'right',
		flex: 1
	},
	listView: {
		flex: 1,
		backgroundColor: '#ddd'
	},
	listItemContainer: {
		flex: 0.6,
		flexDirection: 'column'
	},
	listViewItem: {
		borderColor: 'blue',
		borderWidth: 1,
		padding: 5,
		height: 150
	},
	listItemTitle: {
		fontSize: Resource.getFontSize(20)

	},
	listItemContiner: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	listBar: {
		position: 'absolute',
		top: 12,
		left: 60,
		width: Resource.dimension.width - 120,
		height: 5,
		backgroundColor: '#eee'
	},
	listBottomDescription: {
		marginRight: 30,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'flex-end',
		flex: 1
	},
	listBottomDescriptionText: {
		fontSize: Resource.getFontSize(10),
		marginLeft: 10,
		textAlign: 'right',
		flex: 1
	},
	listItemBottomDescriptionIcon: {
		width:20,
		height: 20
	}
});

module.exports = MyBrackets;