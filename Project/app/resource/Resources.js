/**
 * Yonis Larsson (yonis.larsson.biz@gmail.com)
 * April 9th, 2016
 */
'use strict';



var React = require("react-native");
//var invariant = require('invariant');

var {
    Platform,
    Dimensions,
    StyleSheet
    } = React;

var isAndroid = Platform.OS === `android`;
var dimension = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
};

var RESOURCES = {
    COLOR: {
        actionbar: '#eee',

        // controls
        actionbutton: '#04f',

        complete: '#4c0',
        waiting: '#08c',
        incomplete: 'white'
    },


    STRING: {
        // screens
        MyBrackets: 'My Brackets',
        DetailedBracketInfo: 'Detailed Bracket Info'
    }
};

var getColor = function(key) {
    //invariant(RESOURCES.COLOR[key], 'invalid color :' + key);
    return RESOURCES.COLOR[key];
};

var getString = function(key) {
    //invariant(RESOURCES.STRING[key], 'invalid string :' + key);
    return RESOURCES.STRING[key];
};

var getSize = function(percentOfWidth) {
    return dimension.width * percentOfWidth / 100;
};

var getFontSize = function(size) {
    return getSize(4) + getSize(2) * size / (isAndroid ? 25 : 40);
};

var getTitleFontSize = function() {
    return getFontSize(12);
};

var getActionButtonFontSize = function () {
    return getFontSize(14);
};



var STYLES = {
    actionbar: StyleSheet.create({
        container:{
            backgroundColor: getColor('actionbar'),
            paddingTop: isAndroid? 10:30,
            paddingBottom:10,
            paddingLeft:10,
            paddingRight:10,
            flexDirection:'row',
            height: isAndroid ? 60 : 80,
						alignItems: 'center'
        },
        back: {
            width: 60,
            color: getColor('actionbutton'),
            textAlign:'center',
            fontSize: getActionButtonFontSize()
        },
        title:{
            alignItems: 'center',
            color: getColor('title'),
            fontSize: getTitleFontSize(),
            textAlign:'center',
            fontWeight:'bold',
            flex: 1
        },
        icon:{
					tintColor: getColor('actionbutton'),
					width: 60,
					height: 30
        }
    })

};

var getStyle = function(key) {
    return STYLES[key];
};



module.exports = {
    isAndroid: isAndroid,
    dimension: dimension,
    getColor: getColor,
    getString: getString,
    getSize: getSize,
    getFontSize: getFontSize,
    getTitleFontSize: getTitleFontSize,
    getActionButtonFontsize: getActionButtonFontSize,
    getStyle: getStyle
};
