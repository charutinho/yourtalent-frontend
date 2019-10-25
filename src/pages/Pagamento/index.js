import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import {
    TextInput,
    RadioButton
} from 'react-native-paper'
import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

export default class Pagamento extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardNumber: '',
            cardNome: '',
            cardValidade: '',
            cardCVV: '',
            cpf: '',
            checked: 'fisica',
            label: 'CPF',
            placeholder: '000.000.000-00',
            mask: '[000].[000].[000]-[00]'
        }
    }

    fisica = async() => {
        this.setState({
            checked: 'fisica',
            cpf: '',
            label: 'CPF',
            placeholder: '000.000.000-00',
            mask: '[000].[000].[000]-[00]'
        })
    }

    juridica = async() => {
        this.setState({
            checked: 'juridica',
            cpf: '',
            label: 'CNPJ',
            placeholder: '00.000.000/0000-00',
            mask: '[00].[000].[000]/[0000]-[00]'
        })
    }


    static navigationOptions = {
        header: null
    }


    handleRegistro = async () => {
        ip = await AsyncStorage.getItem('@Ip:ip');

        var nome = await AsyncStorage.getItem('Nome')
        var nasc = await AsyncStorage.getItem('Nasc');
        var nasc = nasc.split("/");
        if (nasc[0] < 10) {
            nasc[0] = "0" + nasc[0];
        }
        if (nasc[1] < 10) {
            nasc[1] = "0" + nasc[1];
        }
        nasc = nasc[0] + "/" + nasc[1] + "/" + nasc[2];
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

                        cardNumber: this.state.cardNumber,
                        cardNome: this.state.cardNome,
                        cardValidade: this.state.cardValidade,
                        cardCVV: this.state.cardCVV,

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

    render() {
        const { checked } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor='transparent'
                />

                <View style={styles.head}>
                    <Text style={styles.title}>
                        Dados cadastrais
                    </Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.formulario}>


                        <View style={styles.FisicoJuridico}>
                            <Text style={styles.textFormInput}>
                                Pessoa
                                 </Text>

                            <TouchableOpacity
                                onPress={this.fisica}
                                style={styles.radioOpcao}
                            >

                                <RadioButton
                                    style={styles.radioButton}
                                    value="fisica"
                                    status={checked === 'fisica' ? 'checked' : 'unchecked'}
                                    color='#9c27b0'
                                    uncheckedColor='#9c27b0'
                                />

                                <Text style={styles.radioText}>Física</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={this.juridica}
                                style={styles.radioOpcao}
                            >

                                <RadioButton
                                    value="juridica"
                                    status={checked === 'juridica' ? 'checked' : 'unchecked'}
                                    color="#9c27b0"
                                    uncheckedColor='#9c27b0'
                                />

                                <Text style={styles.radioText}>Jurídica</Text>

                            </TouchableOpacity>

                        </View>

                        <TextInput
                            label={this.state.label}
                            keyboardType='numeric'
                            placeholder={this.state.placeholder}
                            mode='outlined'
                            value={this.state.cpf}
                            onChangeText={(cpf) => this.setState({ cpf })}
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    mask={this.state.mask}
                                />
                            }
                            style={{
                                marginBottom: 20
                            }}
                        />

                        <TextInput
                            label="Cartão de crédito"
                            keyboardType='numeric'
                            placeholder='0000 0000 0000 0000'
                            mode='outlined'
                            value={this.state.cardNumber}
                            onChangeText={(cardNumber) => this.setState({ cardNumber })}
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    mask='[0000] [0000] [0000] [0000]'
                                />
                            }
                            style={{
                                marginBottom: 20
                            }}
                        />

                        <TextInput
                            label="Nome impresso no cartão"
                            keyboardType='default'
                            autoCompleteType='name'
                            placeholder='Ex: THIAGO R. MELO'
                            mode='outlined'
                            value={this.state.cardNome}
                            onChangeText={(cardNome) => this.setState({ cardNome })}
                            style={{
                                marginBottom: 20
                            }}
                        />

                        <View style={styles.card}>

                            <TextInput
                                style={styles.campo}
                                label="Validade"
                                keyboardType='numeric'
                                placeholder='MM/YY'
                                mode='outlined'
                                value={this.state.cardValidade}
                                onChangeText={(cardValidade) => this.setState({ cardValidade })}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        mask='[00]/[00]'
                                    />
                                }
                            />

                            <TextInput
                                style={styles.campo}
                                label="CVV"
                                keyboardType='numeric'
                                placeholder='123'
                                mode='outlined'
                                value={this.state.cardCVV}
                                onChangeText={(cardCVV) => this.setState({ cardCVV })}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        mask='[000]'
                                    />
                                }
                            />

                        </View>

                        <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                            <Text style={styles.textBotaoLogin}>
                                Continuar
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}
