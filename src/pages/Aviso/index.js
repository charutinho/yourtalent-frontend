import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';

import styles from './styles';

export default class Aviso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }
    async componentDidUpdate() {
        if (this.state.pagamentoState.title == 'sucesso'){
            Alert.alert('Sucesso', `Seu pagamento foi aprovado com sucesso!`);
            this.setState({ pagamentoState:undefined })
            this.concluirCad.call();
        }
        if (this.state.pagamentoState.title == 'pendente'){
            Alert.alert('Pendente', `Seu pagamento está sendo processado`)
        }
        if (this.state.pagamentoState.title == 'falha'){
            Alert.alert('Pagamento não aprovado!', 'Verifique os dados e tente novamente')
        }
    }

    concluirCad = async () => {
        ip = await AsyncStorage.getItem('@Ip:ip');

        var nome = await AsyncStorage.getItem('Nome')
        var nasc = await AsyncStorage.getItem('Nasc');
        var sexo = await AsyncStorage.getItem('Sexo')
        var email = await AsyncStorage.getItem('Email')
        var senha = await AsyncStorage.getItem('Senha')
        var cep = await AsyncStorage.getItem('Cep');
        var estado = await AsyncStorage.getItem('Estado')
        var cidade = await AsyncStorage.getItem('Cidade')

        var tipo = await AsyncStorage.getItem('Olheiro')
        var empresa = await AsyncStorage.getItem('Marca')
        var tempo = await AsyncStorage.getItem('Temp')

        this.setState({ loading: true })
        await fetch(`http://${ip}:3000/auth/register`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(
                    {
                        nome: nome,
                        nasc: nasc,
                        sexo: sexo,
                        email: email,
                        senha: senha,

                        desc: 'Conte-nos um pouco sobre você :)',

                        cep: cep,
                        estado: estado,
                        cidade: cidade,

                        nivel: 2,

                        tipo: tipo,
                        empresa: empresa,
                        tempo: tempo,

                        fotoPerfil: 'profilepicture.png',
                        fotoCapa: 'profilecapa.jpg'
                    })

            })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson);

                var id = responseJson.user._id;

                AsyncStorage.setItem('@Nome:nome', nome);
                AsyncStorage.setItem('@Login:id', id);

                this.props.navigation.navigate('CadEscolhaEsporte');


            }).catch((error) => {
                console.error(error);
            });
    }

    static navigationOptions = {
        header: null,
    }

    handleContinuar = () => {
        this.props.navigation.navigate('Pagamento');
    }

    async componentDidMount() {
        var email = await AsyncStorage.getItem('Email');
        this.setState({ email })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent
                    backgroundColor='transparent'
                    barStyle='light-content'
                />



                <View style={styles.body}>
                    <Text style={styles.title}>
                        Aviso
                </Text>
                    <Text style={styles.texto}>
                        O uso do aplicativo é gratuito por 14 dias.
                </Text>

                    <Text style={styles.texto}>
                        Logo após o período de testes será cobrado R$14,99 mensais.
                </Text>

                    <Text style={styles.texto}>
                        Você pode cancelar sua assinatura a qualquer momento.
                </Text>

                    <TouchableOpacity style={styles.botaoLogin} onPress={() => this.setState({ modalVisible: true })}>
                        <Text style={styles.textBotaoLogin}>
                            Continuar
                            </Text>
                    </TouchableOpacity>

                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}
                        style={{
                            width: '100%',
                            alignItems: 'flex-end',
                            padding: 10
                        }}
                    >
                        <Text style={{ fontSize: 25, fontStyle: 'bold' }}> X </Text>
                    </TouchableOpacity>
                    <WebView
                        source={{ uri: `https://yourtalent-backend.herokuapp.com/checkout/1/${this.state.email}` }}
                        style={{ flex: 1 }}
                        onNavigationStateChange={(pagamentoState) => this.setState({ pagamentoState })}
                        startInLoadingState={true}
                        renderLoading={() =>
                            <ActivityIndicator
                                color="#C00"
                                size="large"
                                color='#9c27b0'
                                style={{
                                    marginBottom: 100
                                }}
                            />}
                    />
                </Modal>


                <TouchableOpacity style={styles.bottom}
                    onPress={() => Alert.alert("Termos de uso", "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")}
                >
                    <Text style={styles.bottomText}>
                        Termos de uso
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}
