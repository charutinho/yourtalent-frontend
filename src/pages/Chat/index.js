import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';


import styles from './styles';

export default class Chat extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>
                    Tela de chat
                </Text>
            </View>  
        );
    }
}