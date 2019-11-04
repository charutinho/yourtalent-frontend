import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Alert,
} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {
    TextInput,
    ActivityIndicator,
    Snackbar
} from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';

export default class CadCep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cep: '',
            estado: '',
            cidade: '',
            loading: false,
            visible: false,
        }
    }

    handleRegistro = async () => {

        ip = await AsyncStorage.getItem('@Ip:ip');
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cache-Control': 'no-cache'
            },
        };

        const cep = this.state.cep;

        this.setState({ loading: true })
        await fetch(`https://api.pagar.me/1/zipcodes/${cep}`, config)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    cep: responseJson.zipcode,
                    estado: responseJson.state,
                    cidade: responseJson.city
                })
                if(this.state.estado == null){
                    this.setState({
                        visible: true,
                        cep: ''
                    })
                }
            })
        this.setState({ loading: false })
    }

    handleContinuar = async () => {

        const opcao = await AsyncStorage.getItem('Opcao');
        console.log(opcao);

        if (this.state.cep == '') {
            Alert.alert("Erro", "Preencha o CEP");
        } else if (this.state.estado == '') {
            Alert.alert("Erro", "CEP inválido");
        } else {
            if (opcao == 'Atleta') {
                this.props.navigation.navigate('CadAtleta2');
                await AsyncStorage.setItem('Cep', this.state.cep);
                await AsyncStorage.setItem('Estado', this.state.estado);
                await AsyncStorage.setItem('Cidade', this.state.cidade);
            }
            if (opcao == 'Olheiro') {
                this.props.navigation.navigate('CadOlheiro');
                await AsyncStorage.setItem('Cep', this.state.cep);
                await AsyncStorage.setItem('Estado', this.state.estado);
                await AsyncStorage.setItem('Cidade', this.state.cidade);
            }

        }
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        const { visible } = this.state;
        const { loading } = this.state;
        return (
            <ImageBackground
                source={require('../../assets/img/BkBolado.png')}
                style={{
                    width: '100%',
                    height: '100%'
                }}>

                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor="transparent"
                />

                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Endereço
                        </Text>
                    </View>

                    <View style={styles.body}>

                        <TextInput
                            style={styles.campoForm}
                            label="CEP"
                            keyboardType='numeric'
                            placeholder='00000-000'
                            mode="outlined"
                            value={this.state.cep}
                            onChangeText={(cep) => this.setState({ cep })}
                            onSubmitEditing={this.handleRegistro}
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    mask="[00000]-[000]"
                                />
                            }
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
                            style={styles.campoForm}
                            label="Estado"
                            disabled={true}
                            mode="outlined"
                            value={this.state.estado}
                            theme={{
                                roundness: 10,
                                colors: {
                                    primary: '#9c27b0',
                                    accent: '#9c27b0',
                                    surface: '#9c27b0',
                                    text: '#000',
                                    backdrop: '#9c27b0',
                                    background: '#fff'
                                }
                            }}
                        />

                        <TextInput
                            style={styles.campoForm}
                            label="Cidade"
                            disabled={true}
                            mode="outlined"
                            value={this.state.cidade}
                            theme={{
                                roundness: 10,
                                colors: {
                                    primary: '#9c27b0',
                                    accent: '#9c27b0',
                                    surface: '#9c27b0',
                                    text: '#000',
                                    backdrop: '#9c27b0',
                                    background: '#fff'
                                }
                            }}
                        />

                        <TouchableOpacity style={styles.botaoLogin} onPress={this.handleContinuar}>
                            <Text style={styles.textBotaoLogin}>
                                Continuar
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
                            CEP não encontrado
                        </Snackbar>

                    </View>


                </View>

            </ImageBackground>


        );
    }
}
