import React, { Component } from 'react';
import {
    View,
    Animated,
    StatusBar,
} from 'react-native';
import styles from './styles';

export default class Splash extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        logoOpacity: new Animated.Value(0),
    }

    async componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.logoOpacity, {
                toValue: 1,
                duration: 1200,  // milisegundos 1000 = 1s
            })
        ]).start(() => {
            this.props.navigation.navigate("Login")
        })
    }

    render() {
        return (

            <View style={styles.container}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                />
                <Animated.Image style={styles.iconSplash}
                    source={require('../../assets/img/logoBrancoPNG.png')}
                    style={{ ...styles.iconSplash, opacity: this.state.logoOpacity }}
                />
            </View>
        );
    }
}
