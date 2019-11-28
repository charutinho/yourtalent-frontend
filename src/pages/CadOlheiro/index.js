import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StatusBar,
    Alert,
    TouchableOpacity
} from 'react-native';
import {
    TextInput,
    RadioButton,
    Snackbar,
} from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default class CadOlheiro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            marca: '',
            checked: 'Freelancer',
            freelancer: true,
            tempo: '',
            visible: false,
        }
    }

    handleContinuar = async () => {

        if (this.state.tempo == '') {
            this.setState({ visible: true })
        } else {
            await AsyncStorage.setItem('Olheiro', this.state.checked)
            await AsyncStorage.setItem('Marca', this.state.marca)
            await AsyncStorage.setItem('Temp', this.state.tempo)

            this.props.navigation.navigate('Aviso');
        }
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        const { checked } = this.state;
        return (
            <ImageBackground
                source={require('../../assets/img/bk5.png')}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >

                <View style={styles.container}>

                    <StatusBar
                        translucent
                        barStyle='light-content'
                        backgroundColor='transparent'
                    />

                    <View style={styles.header}>

                    </View>

                    <View style={styles.body}>

                        <View style={styles.bodyList}>

                            <Text style={styles.textFormInput}>
                                Você é:
                            </Text>

                            <View style={styles.inputSexo}>



                                <TouchableOpacity
                                    onPress={() => this.setState({ checked: "Freelancer", freelancer: true, marca: '' })}
                                    style={styles.radioOpcao}
                                >

                                    <RadioButton
                                        style={styles.radioButton}
                                        value="Freelancer"
                                        status={checked === 'Freelancer' ? 'checked' : 'unchecked'}
                                        color='#000'
                                        uncheckedColor='#000'
                                    />

                                    <Text style={styles.radioText}>Freelancer</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.setState({ checked: "Contratado", freelancer: false })}
                                    style={styles.radioOpcao}
                                >

                                    <RadioButton
                                        value="Contratado"
                                        status={checked === 'Contratado' ? 'checked' : 'unchecked'}
                                        color="#000"
                                        uncheckedColor='#000'
                                    />

                                    <Text style={styles.radioText}>Contratado</Text>

                                </TouchableOpacity>

                            </View>

                            <View style={styles.bodyListItem}>

                                <TextInput
                                    style={styles.campoForm}
                                    label="Empresa ou time"
                                    keyboardType='default'
                                    placeholder='Ex: CBF'
                                    mode="outlined"
                                    disabled={this.state.freelancer}
                                    value={this.state.marca}
                                    onChangeText={(marca) => this.setState({ marca })}
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
                                <Icon
                                    name='comment-question-outline'
                                    size={24}
                                    style={{
                                        marginLeft: 12
                                    }}
                                    onPress={() => Alert.alert("O que é?", "Caso você represente alguma marca ou empresa deve preencher este campo, caso seja freelancer o campo deve permanecer em branco")}
                                />
                            </View>

                            <View style={styles.bodyListItem}>

                                <TextInput
                                    style={styles.campoForm}
                                    label="Tempo de trabalho"
                                    keyboardType='numeric'
                                    placeholder='Ex: 4 anos'
                                    mode="outlined"
                                    value={this.state.tempo}
                                    onChangeText={(tempo) => this.setState({ tempo })}
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
                                            mask="[00] anos"
                                        />
                                    }
                                />
                                <Icon
                                    name='comment-question-outline'
                                    size={24}
                                    style={{
                                        marginLeft: 12
                                    }}
                                    onPress={() => Alert.alert("O que é?", "A quantos anos representa esta empresa?")}
                                />

                            </View>
                        </View>

                        <TouchableOpacity style={styles.botaoLogin} onPress={this.handleContinuar}>
                            <Text style={styles.textBotaoLogin}>
                                Continuar
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Snackbar
                        visible={this.state.visible}
                        onDismiss={() => this.setState({ visible: false })}
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
                        action={{
                            label: 'Ok',
                            onPress: () => {
                                // Do something
                            },
                        }}
                    >
                        Preencha todos os campos corretamente
                    </Snackbar>

                </View>

            </ImageBackground>

        );
    }
}
