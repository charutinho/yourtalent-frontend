import React, { Component } from 'react';
import {
    View,
    TextInput,
    Alert,
    Keyboard,
    TouchableOpacity,
    Text
} from 'react-native';
import {
    Divider,
    Button,
    ActivityIndicator
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class PerfilOpcoesSeguro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            esporte: 'Futebol',
            corSenha: '#000',
            secureTextEntry: true,
            iconName: "eye-off-outline",
        }
    }

    async componentDidMount() {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const idUser = await AsyncStorage.getItem('@Login:id');
        await fetch(`https://yourtalent-backend.herokuapp.com/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const email = responseJson.user.email;
                this.setState({
                    email,
                })
            })
    }

    handleUpdate = async () => {
        this.setState({ loading: true })
        Keyboard.dismiss();
        const idUser = await AsyncStorage.getItem('@Login:id')
        const ip = await AsyncStorage.getItem('@Ip:ip')
        await fetch(`https://yourtalent-backend.herokuapp.com/novasenha`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(
                    {
                        email: this.state.email,
                        senha: this.state.senha,
                        novasenha: this.state.novasenha,
                        idUser
                    })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                const resp = responseJson.message;
                if (resp == 'Senha incorreta') {
                    this.setState({ corSenha: 'red', loading: false, senhaErro: 'Senha incorreta' })
                } else {
                    Alert.alert('Sucesso', 'Logue usando sua nova senha.')
                    AsyncStorage.clear();
                    RNRestart.Restart()
                }
            })
    }

    handleExcluir = async () => {
        Alert.alert(
            'Atenção',
            'Você deseja realmente excluir sua conta?',
            [
                { text: 'Cancelar' },
                { text: 'Confirmar', onPress: () => this.excluirOk.call() },
            ],
        );
    }

    excluirOk = async () => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const id = await AsyncStorage.getItem('@Login:id');
        fetch(`https://yourtalent-backend.herokuapp.com/deleteuser/${id}`);
        AsyncStorage.clear();
        RNRestart.Restart();
        Alert.alert('Tchau', 'Esperamos te ver novamente')
    }

    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? "eye-outline" : "eye-off-outline";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'red' }}>
                    {this.state.senhaErro}
                </Text>
                <View style={styles.bodyListItem1}>
                    <View style={styles.iconArea}>
                        <Icon
                            color={"#fff"}
                            name='email'
                            size={30}
                        />
                    </View>

                    <TextInput
                        style={{
                            width: '65%',
                        }}
                        placeholder='Email'
                        autoCorrect={true}
                        mode="outlined"
                        editable={false}
                        caretHidden={false}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        theme={{
                            roundness: 10,
                            colors: {
                                primary: '#000',
                                accent: '#000',
                                surface: '#000000',
                                text: '#000',
                                backdrop: '#000',
                                background: '#fff'
                            }
                        }}
                    />
                    <Divider />
                </View>

                <View style={styles.bodyListItem1}>
                    <View style={styles.iconArea}>
                        <Icon
                            color={"#fff"}
                            name='lock'
                            size={30}
                        />
                    </View>
                    <TextInput
                        style={{
                            width: '65%',
                            color: this.state.corSenha
                        }}
                        placeholder='Senha atual'
                        secureTextEntry={true}
                        mode="outlined"
                        caretHidden={false}
                        value={this.state.senha}
                        onChangeText={(senha) => this.setState({ senha })}
                        theme={{
                            roundness: 10,
                            colors: {
                                primary: '#000',
                                accent: '#000',
                                surface: '#000000',
                                text: '#000',
                                backdrop: '#000',
                                background: '#fff'
                            }
                        }}
                    />
                </View>

                <View style={styles.bodyListItem1}>
                    <View style={styles.iconArea}>
                        <Icon
                            color={"#fff"}
                            name='lock'
                            size={30}
                        />
                    </View>
                    <TextInput
                        style={{
                            width: '65%',
                        }}
                        placeholder='Nova senha'
                        secureTextEntry={this.state.secureTextEntry}
                        mode="outlined"
                        caretHidden={false}
                        value={this.state.novasenha}
                        onChangeText={(novasenha) => this.setState({ novasenha })}
                        theme={{
                            roundness: 10,
                            colors: {
                                primary: '#000',
                                accent: '#000',
                                surface: '#000000',
                                text: '#000',
                                backdrop: '#000',
                                background: '#fff'
                            }
                        }}
                    />
                </View>

                <TouchableOpacity onPress={this.onIconPress} style={styles.olho}>
                    <Icon name={this.state.iconName} size={30} color={"#616161"} />
                </TouchableOpacity>

                <Button icon="save" onPress={this.handleUpdate}
                    contentStyle={{
                        padding: 15,
                    }}
                    color='#000'
                    style={{
                        width: '100%',
                        marginTop: 15
                    }}
                >
                    Salvar informações
                </Button>

                <Button icon="close" onPress={this.handleExcluir}
                    contentStyle={{
                        padding: 15
                    }}
                    color='#c62828'
                    style={{
                        width: '100%',
                    }}
                >
                    Excluir conta
                </Button>

                {this.state.loading && (
                    <ActivityIndicator
                        color="#C00"
                        size="large"
                        color='#9c27b0'
                        style={{
                            position: 'absolute'
                        }}
                    />
                )}

            </View>
        )
    }
}
