import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Picker,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart'
import {
    Divider,
    Button,
    RadioButton,
    TextInput,
    ActivityIndicator
} from 'react-native-paper';

import styles from './styles';


export default class PerfilOpcoes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: '',
            cep: '',
            loading: false,
            secureTextEntry:true,
            iconName:"eye-outline",
        }
    }
  

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        AsyncStorage.clear();
                        RNRestart.Restart()
                    }}
                >
                    <Icon
                        name="logout"
                        color="#bf360c"
                        size={25}
                        style={{
                            marginRight: 10
                        }}
                    />

                </TouchableOpacity >
            )
        };

    };

    async componentDidMount() {
        id = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`http://${ip}:3000/data/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                //console.log('Nome: ', responseJson.user.nome);

                //Dados pessoais
                let nome = responseJson.user.nome;
                let nasc = responseJson.user.nasc;
                let sexo = responseJson.user.sexo;
                let desc = responseJson.user.desc;
                let email = responseJson.user.email;

                //Localização
                let cep = responseJson.user.cep;
                let estado = responseJson.user.estado;
                let cidade = responseJson.user.cidade;

                //Esporte
                let esporte = responseJson.user.esporte;

                //Estados
                this.setState({
                    nome: nome,
                    nasc: nasc,
                    checked: sexo,
                    email: email,
                    desc: desc,
                    cep: cep,
                    estado: estado,
                    cidade: cidade,
                    PickerValue: esporte
                })
            })
    }

    handleCep = async () => {
        ip = await AsyncStorage.getItem('@Ip:ip');
        const cep = this.state.cep;

        await fetch(`https://api.pagar.me/1/zipcodes/${cep}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    cep: responseJson.zipcode,
                    estado: responseJson.state,
                    cidade: responseJson.city
                })
            })
    }

    //Alterar configurações
    handleUpdate = async () => {
        let nome = this.state.nome;
        let nasc = this.state.nasc;
        let sexo = this.state.checked;
        let email = this.state.email;
        let desc = this.state.desc;
        let cep = this.state.cep;
        let estado = this.state.estado;
        let cidade = this.state.cidade;
        this.setState({ loading: true })
        await fetch(`http://${ip}:3000/updateData`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(
                    {
                        id,
                        nome,
                        nasc,
                        sexo,
                        email,
                        desc,
                        cep,
                        estado,
                        cidade
                    }
                )
            });
            this.setState({ loading: false })
    }


    render() {
        const { checked, loading } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>

                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#eeeeee"
                    />

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Configurações da conta
                    </Text>
                        <Icon
                            name="settings"
                            size={28}
                            style={styles.headerIcon}
                        />
                    </View>

                    <View style={styles.body}>

                        <View style={styles.bodyList}>

                            <Text>
                                Dados pessoais
                            </Text>

                            <View style={styles.bodyListItem}>
                                <TextInput
                                    style={{
                                        width: '90%'
                                    }}
                                    placeholder='Digite seu nome'
                                    autoCorrect={true}
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
                                    ref={(input) => { this.inputNome = input; }}
                                />
                                <Icon
                                    name='pencil'
                                    size={24}
                                    onPress={() => { this.inputNome.focus(); }}
                                />
                            </View>

                            <Divider />

                            <View style={styles.bodyListItem}>

                                <TextInput
                                    style={{
                                        width: '90%'
                                    }}
                                    placeholder='00/00/0000'
                                    autoCorrect={true}
                                    mode="outlined"
                                    disabled={true}
                                    caretHidden={false}
                                    value={this.state.nasc}
                                    onChangeText={(nasc) => this.setState({ nasc })}
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
                                    ref={(input) => { this.inputNasc = input; }}
                                />
                                <Icon
                                    name='calendar'
                                    size={24}
                                    onPress={() => { this.inputNasc.focus(); }}
                                />

                            </View>

                            <Divider />

                            <View style={styles.bodyListItem}>

                                <TouchableOpacity
                                    onPress={() => this.setState({ checked: "M" })}
                                    style={styles.radioOpcao}
                                >
                                    <Icon
                                        name='gender-male'
                                        size={24}
                                        style={{
                                            marginRight: '7%'
                                        }}
                                    />
                                    <Text style={styles.radioText}>Masculino</Text>

                                    <RadioButton
                                        value="M"
                                        status={checked === 'M' ? 'checked' : 'unchecked'}
                                        color='#000'
                                        uncheckedColor='#000'
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.setState({ checked: "F" })}
                                    style={styles.radioOpcao}
                                >
                                    <Icon
                                        name='gender-female'
                                        size={24}
                                        style={{
                                            marginRight: '7%'
                                        }}
                                    />

                                    <Text style={styles.radioText}>Feminino</Text>

                                    <RadioButton
                                        value="F"
                                        status={checked === 'F' ? 'checked' : 'unchecked'}
                                        color="#000"
                                        uncheckedColor='#000'
                                    />

                                </TouchableOpacity>

                            </View>

                            <Divider />

                            <View style={styles.bodyListItem}>
                                <TextInput
                                    style={{
                                        width: '90%'
                                    }}
                                    placeholder='Digite seu nome'
                                    autoCorrect={true}
                                    mode="outlined"
                                    caretHidden={false}
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
                                    ref={(input) => { this.inputEmail = input; }}
                                />
                                <Icon
                                    name='email'
                                    size={24}
                                    onPress={() => { this.inputEmail.focus(); }}
                                />
                            </View>

                            <Divider />

                            <View style={styles.bodyListItem}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                        height: 135
                                    }}
                                    placeholder='Fale um pouco mais sobre você...'
                                    multiline={true}
                                    autoCorrect={true}
                                    mode="outlined"
                                    caretHidden={false}
                                    value={this.state.desc}
                                    onChangeText={(desc) => this.setState({ desc })}
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
                                    ref={(input) => { this.inputDesc = input; }}
                                />
                                <Icon
                                    name='text'
                                    size={24}
                                    onPress={() => { this.inputDesc.focus(); }}
                                />
                            </View>

                            <Text>
                                Localização
                            </Text>

                            <View style={styles.bodyListItem}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                    }}
                                    placeholder='00000-000'
                                    keyboardType="phone-pad"
                                    mode="outlined"
                                    value={this.state.cep}
                                    onChangeText={(cep) => this.setState({ cep })}
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
                                    ref={(input) => { this.inputCep = input; }}
                                    render={props =>
                                        <TextInputMask
                                            {...props}
                                            mask="[00000]-[000]"
                                        />
                                    }
                                    onSubmitEditing={this.handleCep}
                                />
                                <Icon
                                    name='mailbox'
                                    size={24}
                                    onPress={() => { this.inputCep.focus(); }}
                                />
                            </View>

                            <Divider />

                            <View style={styles.bodyListItem}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                    }}
                                    placeholder='São Paulo'
                                    keyboardType="phone-pad"
                                    disabled={true}
                                    mode="outlined"
                                    value={this.state.estado}
                                    onChangeText={(estado) => this.setState({ estado })}
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
                                    name='city'
                                    size={24}
                                />
                            </View>

                            <Divider />

                            <View style={styles.bodyListItem}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                    }}
                                    placeholder='São Paulo'
                                    keyboardType="phone-pad"
                                    disabled={true}
                                    mode="outlined"
                                    value={this.state.cidade}
                                    onChangeText={(cidade) => this.setState({ cidade })}
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
                                    name='home-city'
                                    size={24}
                                />

                            </View>


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

                            <Button icon="save" onPress={this.handleUpdate}
                                contentStyle={{
                                    padding: 3
                                }}
                                color='#9c27b0'
                            >
                                Salvar informações
                            </Button>

                        </View>

                    </View>
                </ScrollView>
            </View>


        );
    }
}
