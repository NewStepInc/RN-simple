/**
 * Yonis Larsson (yonis.larsson.biz@gmail.com)
 * April 9th, 2016
 */
'use strict';


var React = require('react-native');
var Resource = require('./resource/Resources');

var { Navigator } = React;

var MainNav = React.createClass ({
    render() {
        return (
            <Navigator
                initialRoute={{id: Resource.getString("MyBrackets")}}
                renderScene={this.renderScene}
                configureScene={() => {return Navigator.SceneConfigs.PushFromRight}}
                />
        );
    },
    renderScene(route, navigator) {
        var routeId = route.id;
        //console.log(route, navigator);
        if(routeId === Resource.getString("MyBrackets")) {
            var MyBrackets = require("./screen/MyBrackets");
            return (
                <MyBrackets navigator={navigator}/>
            );
        }
        if(routeId === Resource.getString("DetailedBracketInfo")) {
            var DetailedBracket = require("./screen/DetailedBracketInfo");
            return (
                <DetailedBracket navigator={navigator} bracket={route.bracket}/>
            );
        }
    }
});

module.exports = MainNav;