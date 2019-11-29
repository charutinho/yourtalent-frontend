import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    RadioButton,
    TextInput,
    Snackbar,
    ActivityIndicator
} from 'react-native-paper';

import styles from './styles';

export default class CadUsuario extends Component {
    static navigationOptions = {
        header: null,
    }

    nascimento = () => {
        console.log(this.state.dataCel)
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
            this.setState({
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

            //Erros
            errorColorNome: '#9c27b0',
            errorColorEmail: '#9c27b0',
            errorColorSenha: '#9c27b0'
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
        Keyboard.dismiss();
        await this.validatorNome();
        await this.validatorEmail();
        await this.validatorSenha();
        if (this.state.nomeOk == true && this.state.emailOk == true && this.state.senhaOk == true) {
            var ip = await AsyncStorage.getItem('@Ip:ip');
            this.setState({ loading: true })
            fetch(`https://yourtalent-backend.herokuapp.com/auth/verificaremail`,
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
                        this.setState({ loading: false })
                    } else {
                        this.setState({
                            emailUsado: true,
                            errorColorEmail: '#ff0000',
                            loading: false
                        })
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.setState({
                camposIncorretos: true
            })
        }
    }

    validatorNome = () => {
        let regNome = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (regNome.test(this.state.nome) === false) {
            this.setState({
                errorColorNome: '#ff0000',
                nomeOk: false
            })
        } else {
            this.setState({
                errorColorNome: '#9c27b0',
                nomeOk: true
            })
        }
    }

    validatorEmail = () => {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regEmail.test(this.state.email) === false) {
            this.setState({
                errorColorEmail: '#ff0000',
                emailOk: false
            })
        } else {
            this.setState({
                errorColorEmail: '#9c27b0',
                emailOk: true
            })
        }
    }

    validatorSenha = () => {
        let regSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (regSenha.test(this.state.senha) === false) {
            this.setState({
                errorColorSenha: '#ff0000',
                visibleErrorSenha: true,
                senhaOk: false
            })
        } else {
            this.setState({
                errorColorSenha: '#9c27b0',
                senhaOk: true
            })
        }
    }

    render() {
        const { loading } = this.state;
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

                    <View style={styles.header} />

                    <View style={styles.body}>

                        <View style={styles.formArea}>

                            <TextInput
                                style={styles.textInputForm}
                                label="Nome completo"
                                placeholder='Ex: Enzo Silva'
                                autoCompleteType='name'
                                autoCorrect={false}
                                mode="outlined"
                                caretHidden={false}
                                value={this.state.nome}
                                onEndEditing={this.validatorNome}
                                onChangeText={(nome) => this.setState({ nome })}
                                theme={{
                                    roundness: 10,
                                    colors: {
                                        primary: '#9c27b0',
                                        accent: '#9c27b0',
                                        surface: '#9c27b0',
                                        text: this.state.errorColorNome,
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
                                onEndEditing={this.validatorEmail}
                                onChangeText={(email) => this.setState({ email })}
                                theme={{
                                    roundness: 10,
                                    colors: {
                                        primary: '#9c27b0',
                                        accent: '#9c27b0',
                                        surface: '#9c27b0',
                                        text: this.state.errorColorEmail,
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
                                    onEndEditing={this.validatorSenha}
                                    onChangeText={(senha) => this.setState({ senha })}
                                    theme={{
                                        roundness: 10,
                                        colors: {
                                            primary: '#9c27b0',
                                            accent: '#9c27b0',
                                            surface: '#9c27b0',
                                            text: this.state.errorColorSenha,
                                            backdrop: '#9c27b0',
                                            background: '#fff'
                                        }
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={{ marginLeft: "60%", alignItems: "center", marginTop: 5 }} onPress={this.onIconPress}>
                                <Icon name={this.state.iconName} size={30} color={"#616161"} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.botaoLogin} onPress={this.handleCadastro}>
                                <Text style={styles.textBotaoLogin}>
                                    Continuar
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                position: 'absolute'
                            }}
                        >
                            {loading && (
                                <ActivityIndicator
                                    color="#C00"
                                    size="large"
                                    color='#9c27b0'
                                />
                            )}
                        </View>
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
                        }}
                    >
                        Confira sua data de nascimento
                        </Snackbar>

                    <Snackbar
                        visible={this.state.emailUsado}
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
                        onDismiss={() => this.setState({ emailUsado: false })}
                        action={{
                            label: 'Ok',
                        }}
                    >
                        Este e-mail já está em uso!
                        </Snackbar>

                    <Snackbar
                        visible={this.state.visibleErrorSenha}
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
                        onDismiss={() => this.setState({ visibleErrorSenha: false })}
                        action={{
                            label: 'Ok',
                        }}
                    >
                        Senha deve conter uma letra e um número
                        </Snackbar>

                    <Snackbar
                        visible={this.state.camposIncorretos}
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
                        onDismiss={() => this.setState({ camposIncorretos: false })}
                        action={{
                            label: 'Ok',
                        }}
                    >
                        Preencha as informações corretamente
                        </Snackbar>
                </View>
            </ImageBackground>
        );
    }
}
