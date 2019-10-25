import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    TextInput,
    ActivityIndicator
} from 'react-native-paper';
import RNRestart from 'react-native-restart';

import styles from './styles';

import createNavigator from '../../routes';

/**
 * Desabilitei o Yellow Box de avisos
 * Se quiser ver os erros só no depurador JS
 * Balança o celular e clica em Debug JS Remotely 
 */
console.disableYellowBox = true;

//api.pagar.me/1/zipcodes/CEP DO BAGULHO AQUI

// IP local do seu PC:
ip = '192.168.15.28';
AsyncStorage.setItem('@Ip:ip', ip);

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            loading: false,
            nome: '',
            erroEmail: ''
        };
    }

    Login = async () => {

        var ip = '192.168.15.28';

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.state.email == "") {
            Alert.alert("E-mail", "E-mail em branco");
        } else if (reg.test(this.state.email) === false) {
            Alert.alert("E-mail", "Por favor, insira um e-mail válido");
        } else if (this.state.senha == '') {
            Alert.alert("Senha", "Insira sua senha")
        } else {
            this.setState({ loading: true })
            fetch(`http://${ip}:3000/auth/authenticate`,
                {
                    method: 'POST',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': 0
                    },
                    body: JSON.stringify(
                        {
                            email: this.state.email,
                            senha: this.state.senha
                        })

                })
                .then((response) => response.json())
                .then((responseJson) => {
                    var login = JSON.stringify(responseJson.login);
                    if (login == 1) {
                        Alert.alert("Login", "Login realizado com sucesso");
                        let idUser = responseJson.user._id;
                        let id = idUser;

                        let nomeUsuario = responseJson.user.nome;
                        console.log(nomeUsuario);

                        AsyncStorage.setItem('@Nome:nome', nomeUsuario);

                        AsyncStorage.setItem('@Login:id', id);

                        this.setState({
                            userLogged: !!id,
                        });

                        let { userLogged } = this.state;

                        let Routes = createNavigator(userLogged);

                        this.props.navigation.navigate('Feed');

                        return <Routes />;

                    } else {
                        Alert.alert("Login", "Login ou senha incorreto");
                    }
                }).catch((error) => {
                    console.error(error);
                    this.setState({ loading: false, disabled: false });
                });
        };
    };


    render() {
        const { navigate } = this.props.navigation;
        const { loading } = this.state;
        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                />

                <View style={styles.header}>

                    <View style={styles.logoFormat}>
                        <Image style={styles.logoPosition} source={require('../../assets/img/logoBrancoPNG.png')}
                        ></Image>
                    </View>
                   
                </View>
                <View style={styles.body}>
                    <View style={styles.formArea}>

                        <TextInput
                            style={styles.textInputFormEmail}
                            label="Email"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            placeholder='Digite seu e-mail'
                            autoCorrect={false}
                            mode="outlined"
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
                                    text: '#9c27b0',
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

                    </View>
                    <View style={styles.ContainerEsqueciSenha}>
                        <TouchableOpacity>
                            <Text style={styles.TextEsqueciSenha}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.botaoLogin} onPress={this.Login}>
                        <Text style={styles.textBotaoLogin}>
                            Entrar
                        </Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 18
                    }}>
                        <Text style={styles.titleCad}>
                            Ainda não tem um conta?
                    </Text>
                        <TouchableOpacity onPress={() => navigate('CadUsuario')}>
                            <Text style={styles.titleCadRegitro}>
                                Registre-se
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {loading && (
                        <ActivityIndicator
                            color="#C00"
                            size="large"
                            color='#9c27b0'
                            style={{
                                marginTop: 50
                            }}
                        />
                    )}


                </View>
            </View>
        );
    }
}
