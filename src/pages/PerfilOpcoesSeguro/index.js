import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Picker,
} from 'react-native';
import {
    Divider,
    Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class PerfilOpcoesSeguro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            esporte: 'Futebol'
        }
    }

    async componentDidMount() {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const idUser = await AsyncStorage.getItem('@Login:id');
        await fetch(`http://${ip}:3000/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.user);
                const email = responseJson.user.email;
                const esporte = responseJson.user.esporte;

                if (esporte == 'Futebol') {
                    this.setState({ esporteFutebol: true })
                } else if (esporte == 'Basquete') {
                    this.setState({ esporteBasquete: true })
                } else if (esporte == 'CS:GO') {
                    this.setState({ esportecsgo: true })
                } else if (esporte == 'LoL') {
                    this.setState({ esportelol: true })
                }

                this.setState({
                    email,
                    esporte
                })
            })
    }

    handleUpdate = async () => {
        if (this.state.esporte == 'Futebol') {
            if (this.state.posicaoEscolhida == undefined) {
                await this.setState({ posicaoEscolhida: 'Goleiro' })
            }
            if (this.state.PickerValue == undefined && this.state.esporte == 'Futebol') {
                await this.setState({ PickerValue: 'Futebol' })
            }
        }
        if (this.state.esporte == 'Basquete') {
            if (this.state.posicaoEscolhida == undefined) {
                await this.setState({ posicaoEscolhida: 'Armador Principal' })
            }
            if (this.state.PickerValue == undefined && this.state.esporte == 'Basquete') {
                await this.setState({ PickerValue: 'Basquete' })
            }
        }
        if (this.state.esporte == 'CS:GO') {
            if (this.state.posicaoEscolhida == undefined) {
                await this.setState({ posicaoEscolhida: 'Lurker' })
            }
            if (this.state.PickerValue == undefined && this.state.esporte == 'CS:GO') {
                await this.setState({ PickerValue: 'CS:GO' })
            }
        }
        if (this.state.esporte == 'LoL') {
            if (this.state.posicaoEscolhida == undefined) {
                await this.setState({ posicaoEscolhida: 'Topo' })
            }
            if (this.state.PickerValue == undefined && this.state.esporte == 'LoL') {
                await this.setState({ PickerValue: 'LoL' })
            }
        }
        const ip = AsyncStorage.getItem('@Ip:ip');
        await fetch(`http://${ip}:3000/updateData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    email: this.state.email,
                    esporte: this.state.Picker,
                    esportePosicao: this.state.posicaoEscolhida
                }
            )
        })
    }

    render() {
        const { esporteBasquete } = this.state;
        const { esporteFutebol } = this.state;
        const { esportecsgo } = this.state;
        const { esportelol } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.bodyListItem1}>
                    <View style={styles.iconArea}>
                        <Icon
                            color={"#fff"}
                            name='email'
                            size={30}
                            onPress={() => { this.inputEmail.focus(); }}
                        />
                    </View>

                    <TextInput
                        style={{
                            width: '65%',
                        }}
                        placeholder='Email'
                        label='Email'
                        autoCorrect={true}
                        mode="outlined"
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
                        ref={(input) => { this.inputEmail = input; }}
                    />

                    <Divider />


                </View>

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

                {esporteFutebol && (
                    <View style={styles.styleSelect}>
                        <Picker
                            style={styles.selectFormat}
                            selectedValue={this.state.posicaoEscolhida}
                            onValueChange={(itemValue, itemIndex) => this.setState({ posicaoEscolhida: itemValue })}
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
                )}

                {esporteBasquete && (
                    <View style={styles.styleSelect}>
                        <Picker
                            style={styles.selectFormat}
                            selectedValue={this.state.posicaoEscolhida}
                            onValueChange={(itemValue, itemIndex) => this.setState({ posicaoEscolhida: itemValue })}
                        >
                            <Picker.Item label="Armador Principal" value="Armador Principal" />
                            <Picker.Item label="Escolta" value="Escola / Ala Armador / Lançador" />
                            <Picker.Item label="Lateral" value="Lateral / Ala" />
                            <Picker.Item label="Líbero" value="Líbero / Ala Pivo" />
                            <Picker.Item label="Pivo " value="Pivo" />

                        </Picker>
                    </View>
                )}

                {esportecsgo && (
                    <View style={styles.styleSelect}>
                        <Picker
                            style={styles.selectFormat}
                            selectedValue={this.state.posicaoEscolhida}
                            onValueChange={(itemValue, itemIndex) => this.setState({ posicaoEscolhida: itemValue })}
                        >
                            <Picker.Item label="Lurker" value="Lurker" />
                            <Picker.Item label="Fragger" value="Fragger" />
                            <Picker.Item label="Entry Fragger" value="Entry Fragger" />
                            <Picker.Item label="Capitão" value="Capitão" />
                            <Picker.Item label="AWPer" value="AWPer" />
                            <Picker.Item label="Suporte" value="Suporte" />

                        </Picker>
                    </View>
                )}

                {esportelol && (
                    <View style={styles.styleSelect}>
                        <Picker
                            style={styles.selectFormat}
                            selectedValue={this.state.posicaoEscolhida}
                            onValueChange={(itemValue, itemIndex) => this.setState({ posicaoEscolhida: itemValue })}
                        >
                            <Picker.Item label="Topo" value="Topo" />
                            <Picker.Item label="Caçador" value="Caçador" />
                            <Picker.Item label="Meio" value="Meio" />
                            <Picker.Item label="Atirador" value="Atirador" />
                            <Picker.Item label="Suporte" value="Suporte" />

                        </Picker>
                    </View>
                )}

                <Button icon="save" onPress={this.handleUpdate}
                    contentStyle={{
                        padding: 3,
                        marginTop: "5%",
                        marginBottom: "5%",

                    }}
                    color='#000'
                >
                    Salvar informações
                </Button>
            </View>
        )
    }
}
