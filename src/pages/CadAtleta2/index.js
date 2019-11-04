import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Image,
    Picker,
    Dimensions
} from 'react-native';
import styles from './styles';
import {
    ActivityIndicator
} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';


export default class CadAtleta2 extends Component {

    constructor() {
        super();
        this.state = {
            PickerValue: 'Futebol',
            loading: false
        }
    };

    handleRegistro = async () => {
        await AsyncStorage.setItem('EsporteCad', this.state.PickerValue);
        this.props.navigation.navigate('PosicaoEsporte');
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        const { loading } = this.state;
        return (
            <ImageBackground source={require('../../assets/img/bk9.png')}
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
                    {/* <View>
                        <Image style={styles.logoFormat} source={require('../../assets/img/logoRedondo.png')}></Image>
                    </View> */}
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

            </ImageBackground>


                );
            }
        }
