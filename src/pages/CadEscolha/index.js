import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Alert
} from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';

export default class CadEscolha extends Component {

    handleAtleta = async () => {
        this.props.navigation.navigate('CadAtleta');
        await AsyncStorage.setItem('Opcao', 1);
    }

    handleOlheiro = () => {
        Alert.alert("Alerta", "Página ainda em construção");
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                />

                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        Você é...?
                    </Text>
                </View>

                <TouchableOpacity 
                style={styles.containerL}
                onPress={this.handleOlheiro}
                >
                    <ImageBackground
                        source={require('../../assets/img/suit.jpg')}
                        style={{ width: '100%', height: '100%' }}
                    />

                    <Text style={styles.titleOpcao}>
                        Olheiro
                    </Text>
                    
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.containerR}
                onPress={this.handleAtleta}
                >
                    <ImageBackground
                        source={require('../../assets/img/basketball.jpg')}
                        style={{ width: '100%', height: '100%' }}
                    />
                    <Text style={styles.titleOpcao}>
                        Atleta
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}