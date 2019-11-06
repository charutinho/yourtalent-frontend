import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';


export default class PerfilOpcoesSenha extends Component {
    constructor(props) {
        super(props)
        this.state = {
            senha: ''
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const email = navigation.getParam('email');
        this.setState({ email: email })
    }

    handlePerfil = async () => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`http://${ip}:3000/auth/authenticate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(
                {
                    email: this.state.email,
                    senha: this.state.senha
                })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.error == undefined){
                this.props.navigation.navigate('PerfilOpcoesSeguro');
            } else {
                const senhaErro = responseJson.error;
                this.setState({ senhaErro: senhaErro })
            }            
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: 'red'}}>
                    {this.state.senhaErro}
                </Text>
                <TextInput
                    style={styles.textInputFormSenha}
                    label="Email"
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    placeholder='Digite seu e-mail'
                    autoCorrect={false}
                    mode="outlined"
                    editable={false}
                    caretHidden={false}
                    autoCompleteType={'email'}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    theme={{
                        roundness: 10,
                        colors: {
                            primary: '#9c27b0',
                            accent: '#9c27b0',
                            surface: '#9c27b0',
                            text: '#bdbdbd',
                            backdrop: '#9c27b0',
                            background: '#fff'
                        }
                    }}
                />

                <TextInput
                    style={styles.textInputFormSenha}
                    label="Senha"
                    keyboardType='default'
                    placeholder='Sua senha segura'
                    secureTextEntry={true}
                    autoCorrect={false}
                    mode="outlined"
                    caretHidden={false}
                    value={this.state.senha}
                    onChangeText={(senha) => this.setState({ senha })}
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
                <TouchableOpacity style={styles.button} onPress={this.handlePerfil}>
                    <Text style={styles.buttonText}>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
