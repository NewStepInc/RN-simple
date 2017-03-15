/**
 * Yonis Larsson (yonis.larsson.biz@gmail.com)
 * April 9th, 2016
 */
'use strict';

var React = require("react-native");
var Resource = require("./../resource/Resources");
var BracketSamples = require('./../global/BracketSamples');
var Utils = require('./../global/Utils');

var {
	Component,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity
} = React;
class DetailedBracket extends Component {
	render() {
		return (
			<View style={styles.viewContainer}>
				{this.renderNavTopBar()}
				<ScrollView
					automaticallyAdjustContentInsets={false}
					scrollEventThrottle={200}
					style={styles.bracketContainer}>
						{this.renderStep('ORDER')}
						{this.renderStep('SHIPMENT')}
						{this.renderStep('INVOICE')}
						{this.renderStep('PAYMENT')}
				</ScrollView>
			</View>
		);
	}
	renderNavTopBar() {
		return (
			<View style={Resource.getStyle('actionbar').container}>
				<TouchableOpacity onPress={() => {this.handleClick()}} style={styles.actionBarBack}>
					<Image
						style={styles.actionBarBackIcon}
						source={require('image!icon_back')}
						resizeMode={Image.resizeMode.scale}
						/>
					<Text style={Resource.getStyle('actionbar').back}>Back</Text>
				</TouchableOpacity>
				<Text style={Resource.getStyle('actionbar').title}>{this.props.bracket["title"]}</Text>
				<View style={{width:60}}>
				</View>
			</View>
		)
	}
	renderStep(step) {
		var status = Utils.getStatus(this.props.bracket, step);

		return (
			<View style={styles.stepContainer}>
				{this.renderStatusSide(status)}
				{this.renderStepContent(step, status)}
			</View>
		);
	}
	renderStepContent(step, status) {
		var description = Utils.getDescription(this.props.bracket, step);
		var colorName = status == 0 ? 'incomplete' : (status === 1 ? 'waiting' : 'complete');
		return (
			<View style={styles.stepContentContainer}>
				<View style={styles.stepContentTopHalfArea}>
					<Text style={styles.itemTitle}>{step}</Text>
					<Text style={[styles.itemDescription, StyleSheet.create({combine:{color:Resource.getColor(colorName)}}).combine]}>{description}</Text>
				</View>
				{this.renderStepContentDescription(step, status)}
			</View>
		);
	}
	renderStepContentDescription(step, status) {
		if (status == 0)
			return (
				<Text style={styles.itemElementInvalide}>Awaiting previous actions</Text>
			);

		return (
			<View style={styles.stepContentBottomHalfArea}>
				<Text style={styles.itemElement}>{Utils.getElementString(this.props.bracket, step, 1)}</Text>
				<Text style={styles.itemElement}>{Utils.getElementString(this.props.bracket, step, 2)}</Text>
				<Text style={styles.itemElement}>{Utils.getElementString(this.props.bracket, step, 3)}</Text>
				<TouchableOpacity>
					<Text style={styles.itemElementTouchable}>{Utils.getElementString(this.props.bracket, step, 4)}</Text>
				</TouchableOpacity>
			</View>
		);
	}
	renderStatusSide(status) {
		return (
			<View style={styles.statusSideContainer}>
				<View style={styles.sideBar}></View>
				{this.renderSideCircle(status)}
			</View>
		);
	}
	renderSideCircle(status){
		var colorName = status == 0 ? 'incomplete' : (status === 1 ? 'waiting' : 'complete');
		return (
			<View style={styles.mrItem}>
				<View style={[styles.sideCircle, StyleSheet.create({combine:{backgroundColor:Resource.getColor(colorName)}}).combine]}></View>
			</View>
		)
	}
	handleClick() {
		var navigator = this.props.navigator;
		navigator.pop();
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
	bracketContainer:{
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'white'
	},
	stepContainer: {
		height: 180,
		flexDirection: 'row',
		borderTopColor: 'black',
		borderTopWidth: 1
	},
	statusSideContainer: {
		flex: 0.15,
		paddingLeft: 10,
		paddingRight: 2,
		paddingTop: 5,
		alignItems: 'flex-end'
	},
	stepContentContainer: {
		flex:1,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 5,
		flexDirection: 'column'
	},
	sideCircle: {
		marginTop: 5,
		height: 40,
		width: 40,
		borderRadius: 40,
		borderColor: '#eee',
		borderWidth : 5
	},
	sideBar: {
		position: 'absolute',
		top: 0,
		right: 17,
		width: 10,
		height: 180,
		backgroundColor: '#eee'
	},
	stepContentTopHalfArea: {
		flex: 0.4
	},
	stepContentBottomHalfArea: {
		flex: 0.6
	},
	itemTitle: {
		fontSize: Resource.getFontSize(30)
	},
	itemDescription: {
		fontSize: Resource.getFontSize(10),
		fontStyle: 'italic'
	},
	itemElement: {
		fontSize: Resource.getFontSize(10)
	},
	itemElementTouchable: {
		fontSize: Resource.getFontSize(10),
		color: Resource.getColor('waiting')
	},
	itemElementInvalide: {
		flex: 1,
		fontSize: Resource.getFontSize(10),
		fontStyle: 'italic',
		color: 'gray'
	}
});

module.exports = DetailedBracket;