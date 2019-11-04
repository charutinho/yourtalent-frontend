import React, { Component, useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

export default class Categorias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: ''
        }
    }

    static navigationOptions = {
        header: null,
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const option = navigation.getParam('esporte');
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const response = await fetch(`http://${ip}:3000/esportes/listar${option}s`);
        esportes = await response.json();
        this.setState({
            listData: esportes
        })
    }

    navegar = async (esporte) => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const idUser = await AsyncStorage.getItem('@Login:id');
        await fetch(`http://${ip}:3000/esportes/favesporte/${esporte}/${idUser}`);
        await AsyncStorage.setItem('Esporte', esporte)
        this.props.navigation.navigate('Feed');
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                <FlatList
                    style={styles.containerFlatList}
                    data={this.state.listData}
                    keyExtractor={listarposts => String(listarposts._id)}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginBottom: 10
                                }}
                            >
                                <TouchableOpacity onPress={() => this.navegar(item.nomeEsporte)}>
                                    <Text
                                        style={{
                                            fontSize: 30
                                        }}
                                    >
                                        {item.nomeEsporte}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        );
                    }}
                />

            </View>
        );
    }
}
