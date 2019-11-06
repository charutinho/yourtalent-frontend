import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Image,
    Picker,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class PosicaoEsporte extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            esporte: '',
            loading: false
        }
    }

    async componentDidMount() {
        const esporte = await AsyncStorage.getItem('EsporteCad');
        this.setState({
            esporte: esporte
        });
    }

    handleRegistro = async () => {
        ip = await AsyncStorage.getItem('@Ip:ip');

        var nome = await AsyncStorage.getItem('Nome');
        var nasc = await AsyncStorage.getItem('Nasc');
        var sexo = await AsyncStorage.getItem('Sexo');
        var email = await AsyncStorage.getItem('Email');
        var senha = await AsyncStorage.getItem('Senha');
        var cep = await AsyncStorage.getItem('Cep');
        var estado = await AsyncStorage.getItem('Estado');
        var cidade = await AsyncStorage.getItem('Cidade');
        var esporte = await AsyncStorage.getItem('EsporteCad')

        this.setState({ loading: true })
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
                        desc: 'Conte-nos um pouco sobre você :)',
                        cep: cep,
                        estado: estado,
                        cidade: cidade,
                        esporte: esporte,
                        esportePosicao: this.state.PickerValue,
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

                this.props.navigation.navigate('CadEscolhaEsporte');


            }).catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { loading } = this.state;
        /*telaFutebol*/
        if (this.state.esporte === "Futebol") {
            return (
                <ImageBackground
                    source={require('../../assets/img/bk9.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}>
                    <View style={styles.container}>


                        <StatusBar
                            barStyle="dark-content"
                            translucent
                            backgroundColor="transparent"
                        />

                        <View style={styles.header}>

                            <View style={styles.logoFormat}>
                                <Image style={styles.gifPosition} source={require('../../assets/img/futebol.gif')}

                                ></Image>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View>

                                <Text>{this.state.PickerValue}</Text>

                                <Text style={styles.titleSport}>Qual sua principal posição em jogo?</Text>
                                <View style={styles.styleSelect}>
                                    <Picker
                                        style={styles.selectFormat}
                                        selectedValue={this.state.PickerValue}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                    >
                                        <Picker.Item label='Goleiro' value='Goleiro' />
                                        <Picker.Item label='Lateral Direito' value='Lateral Direito' />
                                        <Picker.Item label='Lateral Esquerdo ' value='Lateral Esquerdo' />
                                        <Picker.Item label='Zagueiro' value='Zagueiro' />
                                        <Picker.Item label='Meio-Campo' value='Meio-Campo' />
                                        <Picker.Item label='Volante' value='Volante' />
                                        <Picker.Item label='Ponta' value='Ponta' />
                                        <Picker.Item label='Centro-avante' value='Centro Avante' />
                                        <Picker.Item label='Atacante' value='Atacante' />
                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                                    <Text style={styles.textBotaoLogin}>
                                        Continuar
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color='#9c27b0'
                                style={{
                                    position: 'absolute'
                                }}
                            />
                        )}
                    </View>
                </ImageBackground>
            );
        }


        /*tela CSGO*/

        if (this.state.esporte == "CS:GO") {
            return (
                <ImageBackground
                    source={require('../../assets/img/bk9.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}>
                    <View style={styles.container}>

                        <StatusBar
                            barStyle="dark-content"
                            translucent
                            backgroundColor="transparent"
                        />

                        <View style={styles.header}>

                            <View style={styles.logoFormat}>
                                <Image style={styles.gifPositionCSGO} source={require('../../assets/img/coldGif.gif')}

                                ></Image>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View>

                                <Text style={styles.titleSport}>Qual sua principal posição em jogo?</Text>
                                <View style={styles.styleSelect}>
                                    <Picker
                                        style={styles.selectFormat}
                                        selectedValue={this.state.PickerValue}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                    >
                                        <Picker.Item label="Lurker" value="Lurker" />
                                        <Picker.Item label="Fragger" value="Fragger" />
                                        <Picker.Item label="Entry Fragger" value="Entry Fragger" />
                                        <Picker.Item label="Capitão" value="Capitão" />
                                        <Picker.Item label="AWPer" value="AWPer" />
                                        <Picker.Item label="Suporte" value="Suporte" />


                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                                    <Text style={styles.textBotaoLogin}>
                                        Continuar
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color='#9c27b0'
                                style={{
                                    position: 'absolute'
                                }}
                            />
                        )}
                    </View>
                </ImageBackground>
            );
        }


        /*tela LOL*/

        if (this.state.esporte == "LoL") {
            return (
                <ImageBackground
                    source={require('../../assets/img/bk9.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}>
                    <View style={styles.container}>


                        <StatusBar
                            barStyle="dark-content"
                            translucent
                            backgroundColor="transparent"
                        />

                        <View style={styles.header}>

                            <View style={styles.logoFormat}>
                                <Image style={styles.gifPositionCSGO} source={require('../../assets/img/giphy.webp')}

                                ></Image>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View>

                                <Text style={styles.titleSport}>Qual sua principal posição em jogo?</Text>
                                <View style={styles.styleSelect}>
                                    <Picker
                                        style={styles.selectFormat}
                                        selectedValue={this.state.PickerValue}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                    >
                                        <Picker.Item label="Topo" value="Topo" />
                                        <Picker.Item label="Caçador" value="Caçador" />
                                        <Picker.Item label="Meio" value="Meio" />
                                        <Picker.Item label="Atirador" value="Atirador" />
                                        <Picker.Item label="Suporte" value="Suporte" />
                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                                    <Text style={styles.textBotaoLogin}>
                                        Continuar
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color='#9c27b0'
                                style={{
                                    position: 'absolute'
                                }}
                            />
                        )}
                    </View>
                </ImageBackground>
            );
        }

        /*tela Basquete*/

        if (this.state.esporte === "Basquete") {
            return (
                <ImageBackground
                    source={require('../../assets/img/bk9.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}>
                    <View style={styles.container}>


                        <StatusBar
                            barStyle="dark-content"
                            translucent
                            backgroundColor="transparent"
                        />

                        <View style={styles.header}>

                            <View style={styles.logoFormat}>
                                <Image style={styles.gifPositionCSGO} source={require('../../assets/img/basquete.gif')}

                                ></Image>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View>

                                <Text style={styles.titleSport}>Qual sua principal posição em jogo?</Text>
                                <View style={styles.styleSelect}>
                                    <Picker
                                        style={styles.selectFormat}
                                        selectedValue={this.state.PickerValue}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                    >
                                        <Picker.Item label="Armador Principal" value="Armador Principal" />
                                        <Picker.Item label="Escolta" value="Escola / Ala Armador / Lançador" />
                                        <Picker.Item label="Lateral" value="Lateral / Ala" />
                                        <Picker.Item label="Líbero" value="Líbero / Ala Pivo" />
                                        <Picker.Item label="Pivo " value="Pivo" />

                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                                    <Text style={styles.textBotaoLogin}>
                                        Continuar
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color='#9c27b0'
                                style={{
                                    position: 'absolute'
                                }}
                            />
                        )}
                    </View>
                </ImageBackground>
            );
        }

        return (
            <View><Text>{this.state.esporte}</Text></View>
        );
    }
}

