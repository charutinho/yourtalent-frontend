import React, { Component, useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StatusBar,
    ImageBackground
} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

export default class Categorias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: '',
            esporte: false,
            esport: false
        }
    }

    static navigationOptions = {
        header: null,
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const option = navigation.getParam('esporte');
        if (option == 'Esporte') {
            await this.setState({ esporte: true })
        } else {
            await this.setState({ esport: true })
        }

    }

    navegar = async (esporte) => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const idUser = await AsyncStorage.getItem('@Login:id');
        await fetch(`https://yourtalent-backend.herokuapp.com/esportes/favesporte/${esporte}/${idUser}`);
        this.props.navigation.navigate('PaginaFeed');
    }

    render() {
        const { esporte } = this.state;
        const { esport } = this.state;
        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                {esporte && (
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity onPress={() => this.navegar('Futebol')} style={styles.touchableView}>
                            <ImageBackground source={require(`../../assets/img/futebol.gif`)} style={{ width: '100%', height: '100%', }}>
                                <Text style={styles.flatlistText}>
                                    Futebol
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.navegar('Basquete')} style={styles.touchableView}>
                            <ImageBackground source={require(`../../assets/img/basquete.gif`)} style={{ width: '100%', height: '100%' }}>
                                <Text style={styles.flatlistText}>
                                   Basquete
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}

                {esport && (
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity onPress={() => this.navegar('CS:GO')} style={styles.touchableView}>
                            <ImageBackground source={require(`../../assets/img/coldGif.gif`)} style={{ width: '100%', height: '100%', }}>
                                <Text style={styles.flatlistText}>
                                    CS:GO
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.navegar('LoL')} style={styles.touchableView}>
                            <ImageBackground source={require(`../../assets/img/giphy.webp`)} style={{ width: '100%', height: '100%' }}>
                                <Text style={styles.flatlistText}>
                                    League Of Legends
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}

            </View >
        );
    }
}
