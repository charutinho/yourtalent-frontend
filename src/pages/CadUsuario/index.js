import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    DatePickerAndroid,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
    RadioButton
} from 'react-native-paper';

import styles from './styles';

export default class CadUsuario extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            email: '',
            senha: '',
            dataCel: 'Data de nascimento',
            loading: false,
            disabled: false,
            nivel: '3',
            checked: 'M'
        };
    }

    handleCadastro = async () => {
        ip = await AsyncStorage.getItem('@Ip:ip');
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
                        email: this.state.email
                    })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                var emailCad = responseJson.error;
                if (emailCad == 'O e-mail já está cadastrado') {
                    Alert.alert("Erro", responseJson.error);
                } else {
                    this.props.navigation.navigate('CadEscolha');
                    AsyncStorage.setItem('Nome', this.state.nome);
                    AsyncStorage.setItem('Nasc', this.state.dataCel);
                    AsyncStorage.setItem('Sexo', this.state.checked);
                    AsyncStorage.setItem('Email', this.state.email);
                    AsyncStorage.setItem('Senha', this.state.senha);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setarDataAndroid = async () => {
        try {
            const {
                action, year, month, day,
            } = await DatePickerAndroid.open({
                data: new Date(),
                minDate: new Date(1900, 0, 1),
                maxDate: new Date(),
                mode: 'spinner'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    dataCel: `${day}/${month + 1}/${year}`
                });
            }
        } catch ({ code, message }) {
            alert('Erro ao escolher data!', message);
        }
    };



    render() {
        const { checked } = this.state;
        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                <View style={styles.header}>
                    <Text style={styles.title}>
                        Registre-se
                       </Text>
                </View>

                <View style={styles.body}>

                    <View style={styles.form}>

                        <TextInput
                            style={styles.campoForm}
                            autoCompleteType="name"
                            autoCorrect={true}
                            textContentType="name"
                            keyboardType='default'
                            placeholder='Digite seu nome'
                            underlineColorAndroid='#fff'
                            placeholderTextColor='#fff'
                            selectionColor='#fff'
                            caretHidden={false}
                            onChangeText={(nome) => this.setState({ nome })}
                        />

                        <TouchableOpacity onPress={() => this.setarDataAndroid()}>
                            <TextInput
                                style={styles.campoForm}
                                underlineColorAndroid='#fff'
                                placeholderTextColor='#fff'
                                selectionColor='#fff'
                                editable={false}
                            >
                                <Text onPress={() => this.setarDataAndroid()}
                                    style={styles.campoFormTC}>
                                    {this.state.dataCel}
                                </Text>
                            </TextInput>
                        </TouchableOpacity>

                        <View style={styles.campoFormInput}>

                            <Text style={styles.textFormInput}>
                                Sexo:
                            </Text>

                            <TouchableOpacity
                                onPress={() => this.setState({ checked: "M" })}
                                style={styles.radioOpcao}
                            >
                                <Text style={styles.radioText}>Masculino</Text>

                                <RadioButton
                                    value="M"
                                    status={checked === 'M' ? 'checked' : 'unchecked'}
                                    color='#fff'
                                    uncheckedColor='#fff'
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.setState({ checked: "F" })}
                                style={styles.radioOpcao}
                            >
                                <Text style={styles.radioText}>Feminino</Text>

                                <RadioButton
                                    value="F"
                                    status={checked === 'F' ? 'checked' : 'unchecked'}
                                    color="#fff"
                                    uncheckedColor='#fff'
                                />
                            </TouchableOpacity>

                        </View>

                        <TextInput
                            style={styles.campoForm2}
                            autoCompleteType="email"
                            autoCorrect={true}
                            textContentType="emailAddress"
                            keyboardType='default'
                            placeholder='Digite seu e-mail'
                            underlineColorAndroid='#fff'
                            placeholderTextColor='#fff'
                            selectionColor='#fff'
                            caretHidden={false}
                            keyboardType='email-address'
                            onChangeText={(email) => this.setState({ email })}
                        />

                        <TextInput
                            style={styles.campoForm}
                            autoCorrect={true}
                            keyboardType='default'
                            placeholder='Digite sua senha'
                            underlineColorAndroid='#fff'
                            placeholderTextColor='#fff'
                            selectionColor='#fff'
                            caretHidden={false}
                            secureTextEntry={true}
                            onChangeText={(senha) => this.setState({ senha })}
                        />

                        <TouchableOpacity style={styles.botaoLogin} onPress={this.handleCadastro}>
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
