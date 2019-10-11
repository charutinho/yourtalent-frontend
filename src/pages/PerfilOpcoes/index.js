import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {
    List,
    Divider
} from 'react-native-paper';

import styles from './styles';


export default class PerfilOpcoes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: ''
        }
    }

    async componentDidMount() {
        var id = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`http://${ip}:3000/data/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                //console.log('Nome: ', responseJson.user.nome);

                let nome = responseJson.user.nome;
                let email = responseJson.user.email;

                //Estados
                this.setState({
                    nome: nome,
                    email: email
                })
            })
    }

    pincel = () => {
        alert("KKKK")
    }

    render() {



        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#fff"
                />

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Configurações da conta
                    </Text>
                    <Icon
                        name="settings"
                        size={28}
                        style={styles.headerIcon}
                    />
                </View>

                <View style={styles.body}>

                    <View style={styles.bodyList}>

                        <TextInput
                            placeholder='Digite seu nome'
                            autoCorrect={true}
                            mode="outlined"
                            caretHidden={false}
                            value={this.state.nome}
                            onChangeText={(nome) => this.setState({ nome })}
                            theme={{
                                roundness: 10,
                                colors: {
                                    primary: '#9c27b0',
                                    accent: '#9c27b0',
                                    surface: '#9c27b0',
                                    text: '#9c27b0',
                                    backdrop: '#9c27b0',
                                    background: '#fff'
                                }
                            }}
                        />

                    </View>

                </View>

            </View>
        );
    }
}
