import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    Image,
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    TextInput,
    ActivityIndicator,
    Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import createNavigator from '../../routes';

/**
 * Desabilitei o Yellow Box de avisos
 * Se quiser ver os erros só no depurador JS
 * Balança o celular e clica em Debug JS Remotely 
 */
console.disableYellowBox = true;

// IP local do seu PC:
ip = '192.168.1.3';
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
            erroEmail: '',
            secureTextEntry: true,
            iconName: "eye-off-outline",
            modalVisible: false,
            novasenha: false
        };
    }
    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? "eye-outline" : "eye-off-outline";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
    }




    Login = async () => {

        Keyboard.dismiss();

        // var ip = '192.168.1.3';
        const ip = await AsyncStorage.getItem('@Ip:ip')

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
                        let idUser = responseJson.user._id;
                        let id = idUser;

                        let nomeUsuario = responseJson.user.nome;

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
                        this.setState({ loading: false })
                    }
                }).catch((error) => {
                    console.error(error);
                    this.setState({ loading: false, disabled: false });
                });
        };
    };

    novasenha = async () => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        this.setState({ loading: true })
        await fetch(`http://${ip}:3000/novasenha/${this.state.email}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })
                Alert.alert('E-mail', responseJson.message)
            })
    }

    novasenhaModal = () => {
        if (this.state.novasenha == false) {
            this.setState({ novasenha: true })
        } else {
            this.setState({ novasenha: false })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { loading } = this.state;
        const { novasenha } = this.state;
        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle='light-content'
                    backgroundColor="#572078"
                />

                <View style={styles.header}>
                    <Image style={styles.logo} source={require('../../assets/img/logoBrancoPNG.png')} />
                </View>

                <View style={styles.body}>
                    <View style={styles.formulario}>

                        <TextInput
                            style={styles.inputEmail}
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
                            maxLength={80}
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
                            style={styles.inputSenha}
                            label="Senha"
                            keyboardType='default'
                            placeholder='Sua senha segura'
                            secureTextEntry={this.state.secureTextEntry}
                            autoCorrect={false}
                            mode="outlined"
                            caretHidden={false}
                            value={this.state.senha}
                            onChangeText={(senha) => this.setState({ senha })}
                            onSubmitEditing={this.Login}
                            maxLength={30}
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
                        <TouchableOpacity onPress={this.onIconPress} style={styles.olho}>
                            <Icon name={this.state.iconName} size={30} color={"#616161"} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.esqueceuView} onPress={this.novasenhaModal}>
                            <Text>Esqueceu sua senha?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.botaoLogin} onPress={this.Login}>
                            <Text style={styles.loginText}>
                                Entrar
                            </Text>
                        </TouchableOpacity>
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

                <View style={styles.novaconta}>
                    <Text style={styles.novacontaText}> Ainda não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => navigate('CadUsuario')} activeOpacity={.4}>
                        <Text style={styles.novacontaRegistro}> Registre-se </Text>
                    </TouchableOpacity>
                </View>

                {novasenha && (
                    <View style={{
                        position: 'absolute',
                        borderWidth: 1,
                        width: '90%',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        borderRadius: 9,
                        height: 150,
                        zIndex: 2
                    }}>
                        <TouchableOpacity style={{ alignItems: 'flex-end', width: '100%', marginRight: 15, marginTop: 1 }} onPress={this.novasenhaModal}>
                            <Text style={{ fontSize: 20, fontStyle: 'bold', color: '#b71c1c' }}> X </Text>
                        </TouchableOpacity>
                        <TextInput
                            style={{ width: '95%' }}
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
                        <Button icon="mail" onPress={this.novasenha}
                            color='#4a148c'>
                            Enviar e-mail
                        </Button>
                    </View>
                )}
            </View >
        );
    }
}
