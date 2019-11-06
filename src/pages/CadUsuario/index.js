import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Alert,
    ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    RadioButton,
    TextInput,
    Snackbar
} from 'react-native-paper';

import styles from './styles';

export default class CadUsuario extends Component {
    static navigationOptions = {
        header: null,
    }

    nascimento = async() => {
        var data = this.state.dataCel.split("/");

        if (this.state.dataCel.length == 10) {
            if (data[0] == '00') {
                data[0] = '01';
                this.setState({
                    visible: true
                })
            }
            if (data[0] > 31) {
                data[0] = 31
            }
            if (data[1] > 12) {
                data[1] = 12
            }
            if (data[2] > 2018) {
                data[2] = 2018
                this.setState({
                    visible: true
                })
            }
            if (data[1] == 2 && data[0] > 28) {
                data[0] = 28;
            }

            var nasc = data[0] + '/' + data[1] + '/' + data[2];
            await this.setState({
                dataCel: nasc,
            })
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            email: '',
            senha: '',
            dataCel: '',
            loading: false,
            disabled: false,
            checked: 'M',
            aviso: '',
            visible: false,
            secureTextEntry: true,
            iconName: "eye-off-outline",
        };
    }
    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? "eye-outline" : "eye-off-outline";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
    }

    handleCadastro = async () => {
        var ip = await AsyncStorage.getItem('@Ip:ip');
        console.log(ip)
        fetch(`http://${ip}:3000/auth/verificaremail`,
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
                let emailCad = responseJson.message;
                if (emailCad == 'O e-mail esta disponível') {
                    this.props.navigation.navigate('CadEscolha');
                    AsyncStorage.setItem('Nome', this.state.nome);
                    AsyncStorage.setItem('Nasc', this.state.dataCel);
                    AsyncStorage.setItem('Sexo', this.state.checked);
                    AsyncStorage.setItem('Email', this.state.email);
                    AsyncStorage.setItem('Senha', this.state.senha);
                } else {
                    Alert.alert("Erro", responseJson.error);
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { checked } = this.state;
        const { visible } = this.state;
        return (
            <ImageBackground
                source={require('../../assets/img/bk9.png')}
                style={{
                    width: '100%',
                    height: '100%'
                }}>
                <View style={styles.container}>

                    <StatusBar
                        barStyle="light-content"
                        translucent
                        backgroundColor="transparent"
                    />

                    <View style={styles.header}>
                        <Text style={styles.title}>
                        </Text>
                    </View>

                    <View style={styles.body}>

                        <View style={styles.formArea}>

                            <TextInput
                                style={styles.textInputForm}
                                label="Nome"
                                placeholder='Digite seu nome'
                                autoCompleteType='name'
                                autoCorrect={false}
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

                            <TextInput
                                style={styles.textInputForm}
                                label="Data de Nascimento"
                                placeholder='00/00/0000'
                                mode="outlined"
                                keyboardType='phone-pad'
                                value={this.state.dataCel}
                                onChangeText={(dataCel) => this.setState({ dataCel })}
                                onSubmitEditing={this.nascimento}
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
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        mask="[00]/[00]/[0000]"
                                    />
                                }
                            />

                            <View style={styles.inputSexo}>
                                <Text style={styles.textFormInput}>
                                    Sexo:
                                 </Text>

                                <TouchableOpacity
                                    onPress={() => this.setState({ checked: "M" })}
                                    style={styles.radioOpcao}
                                >

                                    <RadioButton
                                        style={styles.radioButton}
                                        value="M"
                                        status={checked === 'M' ? 'checked' : 'unchecked'}
                                        color='#000'
                                        uncheckedColor='#000'
                                    />

                                    <Text style={styles.radioText}>Masculino</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.setState({ checked: "F" })}
                                    style={styles.radioOpcao}
                                >

                                    <RadioButton
                                        value="F"
                                        status={checked === 'F' ? 'checked' : 'unchecked'}
                                        color="#000"
                                        uncheckedColor='#000'
                                    />

                                    <Text style={styles.radioText}>Feminino</Text>

                                </TouchableOpacity>


                            </View>

                            <TextInput
                                style={styles.textInputForm}
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
                            <View style={styles.passwordContainer}>

                                <TextInput
                                    style={styles.textInputFormSenha}
                                    label="Senha"
                                    keyboardType='default'
                                    placeholder='Sua senha segura'
                                    secureTextEntry={this.state.secureTextEntry}
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
                            <TouchableOpacity style={{ marginLeft: "60%", alignItems: "center", marginTop: 5 }} onPress={this.onIconPress}>
                                <Icon style={{}} name={this.state.iconName} size={30} color={"#616161"} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.botaoLogin} onPress={this.handleCadastro}>
                                <Text style={styles.textBotaoLogin}>
                                    Continuar
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <Snackbar
                            visible={this.state.visible}
                            duration={3000}
                            theme={{
                                roundness: 10,
                                colors: {
                                    primary: '#9c27b0',
                                    accent: '#9c27b0',
                                    surface: '#9c27b0',
                                    text: '#9c27b0',
                                    backdrop: '#9c27b0',
                                }
                            }}
                            onDismiss={() => this.setState({ visible: false })}
                            action={{
                                label: 'Ok',
                                onPress: () => {

                                },
                            }}
                        >
                            Confira sua data de nascimento
                        </Snackbar>

                    </View>

                </View>
            </ImageBackground>
        );
    }
}
