import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text
} from 'react-native';


import styles from './styles';

export default class Chat extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#6a1b9a"
                />



                <Text>
                    Tela de chat
                </Text>
            </View>
        );
    }
}