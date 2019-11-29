import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    TextInput,
    Snackbar
} from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

export default class NovoCampeonato extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleCriarCamp = async () => {
        const id = await AsyncStorage.getItem('@Login:id');
        const config = {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    nomeCamp: this.state.nomeCamp,
                    colocacao: this.state.colocacao,
                    data: this.state.data,
                    idParticipante: id
                }
            )
        }
        const ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`https://yourtalent-backend.herokuapp.com/camp/novocampeonato`, config);
        this.props.navigation.navigate('Perfil');
    }

    nascimento = () => {
        var data = this.state.data.split("/");

        if (this.state.data.length == 10) {
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
            if (data[2] > 2019) {
                data[2] = 2019
                this.setState({
                    visible: true
                })
            }
            if (data[1] == 2 && data[0] > 28) {
                data[0] = 28;
            }

            var nasc = data[0] + '/' + data[1] + '/' + data[2];
            this.setState({
                data: nasc,
            })
        }
    }

    render() {
        const { visible } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>

                    <View>
                        <Text style={styles.headerTitle}>
                            Coloque aqui seus campeonatos participados
                        </Text>
                    </View>
                    <View style={styles.trofeuPosition}>
                        <Image style={{
                            width: 170,
                            height: 170,
                        }}
                            source={require('../../assets/icons/trophyLouro.png')} />
                    </View>

                </View>

                <View style={styles.bodyNovo}>

                    <TextInput
                        style={{ width: '90%', }}
                        label="Nome do campeonato"
                        keyboardType='default'
                        placeholder='Ex: Campeonato Regional de São Paulo'
                        autoCorrect={true}
                        mode="outlined"
                        caretHidden={false}
                        autoCompleteType={'name'}
                        value={this.state.nomeCamp}
                        onChangeText={(nomeCamp) => this.setState({ nomeCamp })}
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

                    <View style={styles.formDois}>
                        <TextInput
                            style={{ width: '49%' }}
                            label="Colocação"
                            keyboardType='numeric'
                            placeholder='Ex: 4'
                            mode="outlined"
                            value={this.state.colocacao}
                            onChangeText={(colocacao) => this.setState({ colocacao })}
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
                                    mask="[00]"
                                />
                            }
                        />

                        <TextInput
                            style={{ width: '49%', }}
                            label="Data do Campeonato"
                            placeholder='00/00/0000'
                            mode="outlined"
                            keyboardType='phone-pad'
                            value={this.state.data}
                            onChangeText={(data) => this.setState({ data })}
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

                    </View>

                    <TouchableOpacity
                        style={{
                            width: '90%',
                            height: 55,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fafafa',
                            borderColor: '#9c27b0',
                            borderWidth: 2,
                            borderRadius: 6,
                            flexDirection: 'row',
                            marginTop: '5%'
                        }}
                        onPress={this.handleCriarCamp}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                color: '#424242',
                                marginRight: '6%',
                            }}
                        >
                            Adicionar campeonato
                            </Text>
                        <Icon
                            name="trophy-outline"
                            color="#424242"
                            size={30}
                        />
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
                    }}>
                    Confira a data do campeonato
                    </Snackbar>

            </View>
        );
    }
}