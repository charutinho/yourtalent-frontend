import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    DatePickerAndroid,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    Platform,
    StatusBar,
    Alert,
    Image,
    Picker,
    Dimensions
} from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';



export default class CadAtleta2 extends Component {

    constructor() {
        super();
        this.state = {
            PickerValue: ''
        }
    };

    handleRegistro = async () => {
        ip = await AsyncStorage.getItem('@Ip:ip');

        var nome = await AsyncStorage.getItem('Nome')
        var nasc = await AsyncStorage.getItem('Nasc');
        var nasc = nasc.split("/");
        if (nasc[0] < 10){
            nasc[0] = "0" + nasc[0];
        }
        if (nasc[1] < 10){
            nasc[1] = "0" + nasc[1];
        }
        nasc = nasc[0] + "/" + nasc[1] + "/" + nasc[2];
        var sexo = await AsyncStorage.getItem('Sexo')
        var email = await AsyncStorage.getItem('Email')
        var senha = await AsyncStorage.getItem('Senha')
        var cep = await AsyncStorage.getItem('Cep');
        var estado = await AsyncStorage.getItem('Estado')
        var cidade = await AsyncStorage.getItem('Cidade')

        await fetch(`http://${ip}:3000/auth/register`,
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
                        nome: nome,
                        nasc: nasc,
                        sexo: sexo,
                        email: email,
                        senha: senha,
                        descricao: 'Você pode alterar a descrição do seu perfil nas configurações da sua conta, apertando na engranagem no canto superior direito',
                        cep: cep,
                        estado: estado,
                        cidade: cidade,
                        esporte: this.state.PickerValue,
                        nivel: 1,
                        fotoPerfil: 'profilepicture.png',
                        fotoCapa: 'profilecapa.jpg'
                    })

            })
            .then((response) => response.json())
            .then((responseJson) => {

                var id = responseJson.user._id;

                AsyncStorage.setItem('@Nome:nome', nome);
                AsyncStorage.setItem('@Login:id', id);
                
                this.props.navigation.navigate('Feed');
                

            }).catch((error) => {
                console.error(error);
            });
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/img/BkBolado.png')}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 50,
                    width: Dimensions.get('window').width,
                    height: 830
                }}>

                <View style={styles.container}>
                    <StatusBar
                    barStyle="dark-content"
                    />
                    <View>
                        <Image style={styles.logoFormat} source={require('../../assets/img/logoRedondo.png')}></Image>
                    </View>
                    <View>

                        <Text style={styles.titleSport}>   Qual esporte você pratica?</Text>
                        <View style={styles.styleSelect}>
                            <Picker
                                style={styles.selectFormat}
                                selectedValue={this.state.PickerValue}
                                onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                            >
                                <Picker.Item label="Futebol" value="Futebol" />
                                <Picker.Item label="Basquete" value="Basquete" />
                                <Picker.Item label="Counter Strike: Global Offensive" value="CS:GO" />
                                <Picker.Item label="League of Legends" value="LoL" />

                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                            <Text style={styles.textBotaoLogin}>
                                Continuar
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </ImageBackground>


        );
    }
}



/*

*/
