import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Picker,
    Alert
} from 'react-native';
import {
    Divider,
    Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class PerfilOpcoesSeguro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            esporte: 'Futebol',
            padraoEsporte: '',
            padraoEsporteValue: '',
            padraoPosicao: '',
            padraoPosicaoValue: ''
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
                const esportePosicao = responseJson.user.esportePosicao;

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
                    esporte,
                    padraoEsporte: esporte,
                    padraoEsporteValue: esporte,
                    padraoPosicao: esportePosicao,
                    padraoPosicaoValue: esportePosicao
                })
            })
    }

    async componentDidUpdate(){
        var novoEsporte = this.state.PickerValue; //Opcao do Picker
        var esporteAtual = this.state.padraoEsporte //Opcao do Fetch 

        alert('Novo esporte:', novoEsporte);
        alert('Esporte atual:' ,esporteAtual)

        // var esportePadrao = await this.state.padraoEsporte;
        // // alert(this.state.padraoEsporte)
        // if (this.state.PickerValue == null){
        //     await this.setState({ PickerValue: esportePadrao })
        //     alert(this.state.PickerValue)
        // } else {

        // }
        // if (this.state.PickerValue !== this.state.padraoEsporte){
            
        // }
    }

    handleUpdate = async () => {
        var novaPosicao = this.state.posicaoEscolhida; //Opcao do Picker
        var posicaoAtual = this.state.padraoPosicao //Opcao do Fetch

        if(novaPosicao == null){
            novaPosicao = this.state.padraoPosicao;
            alert(novaPosicao)
        }

    }

    handleExcluir = async () => {
        Alert.alert(
            'Atenção',
            'Você deseja realmente excluir sua conta?',
            [
                { text: 'Cancelar' },
                { text: 'Confirmar', onPress: () => this.excluirOk.call() },
            ],
        );
    }

    excluirOk = async () => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const id = await AsyncStorage.getItem('@Login:id');
        fetch(`http://${ip}:3000/deleteuser/${id}`);
        AsyncStorage.clear();
        RNRestart.Restart();
        Alert.alert('Tchau', 'Esperamos te ver novamente')
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

                <View style={styles.bodyListItem1}>
                    <View style={styles.iconArea}>
                        <Icon
                            color={"#fff"}
                            name='lock'
                            size={30}
                            onPress={() => { this.inputEmail.focus(); }}
                        />
                    </View>
                    <TextInput
                        style={{
                            width: '65%',
                        }}
                        placeholder='Senha atual'
                        secureTextEntry={true}
                        mode="outlined"
                        caretHidden={false}
                        value={this.state.senhaAtual}
                        onChangeText={(senhaAtual) => this.setState({ senhaAtual })}
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
                </View>

                <View style={styles.bodyListItem1}>
                    <View style={styles.iconArea}>
                        <Icon
                            color={"#fff"}
                            name='lock'
                            size={30}
                            onPress={() => { this.inputEmail.focus(); }}
                        />
                    </View>
                    <TextInput
                        style={{
                            width: '65%',
                        }}
                        placeholder='Nova senha'
                        secureTextEntry={true}
                        mode="outlined"
                        caretHidden={false}
                        value={this.state.senhaAtual}
                        onChangeText={(senhaAtual) => this.setState({ senhaAtual })}
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
                </View>

                <View style={styles.styleSelect}>
                    <Picker
                        style={styles.selectFormat}
                        selectedValue={this.state.PickerValue}
                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                    >
                        <Picker.Item label={this.state.padraoEsporte} value={this.state.padraoEsporteValue} />
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
                            <Picker.Item label={this.state.padraoPosicao} value={this.state.padraoPosicaoValue} />
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
                            <Picker.Item label={this.state.padraoPosicao} value={this.state.padraoPosicaoValue} />
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
                            <Picker.Item label={this.state.padraoPosicao} value={this.state.padraoPosicaoValue} />
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
                            <Picker.Item label={this.state.padraoPosicao} value={this.state.padraoPosicaoValue} />
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
                        padding: 15,
                    }}
                    color='#000'
                    style={{
                        width: '100%',
                        marginTop: 15
                    }}
                >
                    Salvar informações
                </Button>

                <Button icon="close" onPress={this.handleExcluir}
                    contentStyle={{
                        padding: 15
                    }}
                    color='#c62828'
                    style={{
                        width: '100%',
                    }}
                >
                    Excluir conta
                </Button>

            </View>
        )
    }
}
