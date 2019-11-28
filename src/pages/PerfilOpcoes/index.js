import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Picker,
    ScrollView,
    TextInput,
    ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart'
import {
    Divider,
    Button,
    RadioButton,
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
            secureTextEntry: true,
            iconName: "eye-outline",
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
        this.setState({ loading: false });
        this.props.navigation.navigate('Perfil', {
            attPerf: true
        });
    }


    render() {
        const { checked, loading } = this.state;
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground
                source={require('../../assets/img/bk14.png')}
                style={{
                    width: '100%',
                    height: '100%'
                }}>
                <View style={styles.container}>
                    <ScrollView>

                        <StatusBar
                            barStyle='light-content'
                            backgroundColor="#572078"
                        />

                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>
                                Alterar dados
                            </Text>
                            <Icon
                                name="settings"
                                size={30}
                                style={styles.headerIcon}
                            />
                        </View>

                        <View style={styles.body}>

                            <View style={styles.bodyList}>

                                <Text style={styles.localizacaoStyle}>
                                    Dados pessoais
                            </Text>

                                <View style={styles.bodyListItem1}>
                                    <View style={styles.iconArea}>
                                        <Icon
                                            name='pencil'
                                            size={35}
                                            color="#fff"
                                            onPress={() => { this.inputNome.focus(); }}
                                        />
                                    </View>
                                    <TextInput style={styles.inputFormat}
                                        width='81%'
                                        placeholder='Digite seu nome'
                                        autoCorrect={true}
                                        mode="outlined"
                                        caretHidden={false}
                                        maxLength={30}
                                        value={this.state.nome}
                                        onChangeText={(nome) => this.setState({ nome })}
                                        theme={{
                                            roundness: 10,
                                            colors: {
                                                primary: '#000',
                                                accent: '#000',
                                                surface: '#000',
                                                text: '#000',
                                                backdrop: '#000',
                                                background: '#fff'
                                            }
                                        }}
                                        ref={(input) => { this.inputNome = input; }}
                                    />

                                </View>

                                <Divider />

                                <View style={styles.bodyListItem1}>
                                    <View style={styles.iconArea}>
                                        <Icon
                                            name='calendar'
                                            size={35}
                                            color={"#fff"}
                                            onPress={() => { this.inputNasc.focus(); }}
                                        />
                                    </View>

                                    <TextInput
                                        style={{
                                            width: '82%',
                                            color:"#000"
                                        }}
                                        placeholder='00/00/0000'
                                        autoCorrect={true}
                                        mode="outlined"
                                        editable={true}
                                        caretHidden={false}
                                        value={this.state.nasc}
                                        onChangeText={(nasc) => this.setState({ nasc })}
                                        theme={{
                                            roundness: 10,
                                            colors: {
                                                primary:'#000',
                                                accent: '#000',
                                                surface: '#000',
                                                text: '#000',
                                                backdrop: '#000',
                                                background: '#fff'
                                            }
                                        }}
                                        ref={(input) => { this.inputNasc = input; }}
                                    />


                                </View>

                                <Divider />

                                <View style={styles.bodyListItem3}>

                                    <TouchableOpacity
                                        onPress={() => this.setState({ checked: "M" })}
                                        style={styles.radioOpcao}
                                    >

                                        <View style={styles.iconArea3}>
                                            <Icon
                                                name='gender-male-female'
                                                size={34}
                                                color={"#fff"}
                                                style={{
                                                    marginRight: '7%'
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.radioText}>Masculino</Text>

                                        <RadioButton
                                            value="M"
                                            status={checked === 'M' ? 'checked' : 'unchecked'}
                                            color='#6a1b9a'
                                            uncheckedColor='#6a1b9a'
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => this.setState({ checked: "F" })}
                                        style={styles.radioOpcao}
                                    >


                                        <Text style={styles.radioText}>Feminino</Text>

                                        <RadioButton
                                            value="F"
                                            status={checked === 'F' ? 'checked' : 'unchecked'}
                                            color="#6a1b9a"
                                            uncheckedColor='#6a1b9a'
                                        />

                                    </TouchableOpacity>

                                </View>

                                <Divider />

                                <View style={styles.bodyListItem2}>
                                    <View style={styles.iconArea2}>
                                        <Icon
                                            name='text'
                                            size={30}
                                            onPress={() => { this.inputDesc.focus(); }}
                                            color={"#fff"}
                                        />
                                    </View>

                                    <TextInput
                                        style={{
                                            width: '82%',
                                            color: "#000",
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
                                                primary: '#000',
                                                accent: '#000',
                                                surface: '#000',
                                                text: '#000',
                                                backdrop: '#000',
                                                background: '#fff'
                                            }
                                        }}
                                        ref={(input) => { this.inputDesc = input; }}
                                    />

                                </View>

                                <Text style={styles.localizacaoStyle}>
                                    Localização
                                </Text>

                                <View style={styles.bodyListItem1}>
                                    <View style={styles.iconArea}>
                                        <Icon
                                            name='mailbox'
                                            size={24}
                                            color={"#fff"}
                                            onPress={() => { this.inputCep.focus(); }}
                                        />
                                    </View>

                                    <TextInput
                                        style={{
                                            width: '82%',
                                            color: "#000",
                                        }}
                                        placeholder='00000-000'
                                        keyboardType="phone-pad"
                                        mode="outlined"
                                        value={this.state.cep}
                                        onChangeText={(cep) => this.setState({ cep })}
                                        theme={{
                                            roundness: 10,
                                            colors: {
                                                primary: '#000',
                                                accent: '#000',
                                                surface: '#000',
                                                text: '#000',
                                                backdrop: '#000',
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

                                </View>

                                <Divider />

                                <View style={styles.bodyListItem1}>
                                    <View style={styles.iconArea}>
                                        <Icon
                                            name='city'
                                            size={24}
                                            color={"#fff"}
                                        />
                                    </View>
                                    <TextInput
                                        style={{
                                            width: '82%',
                                            color: "#757575",

                                        }}
                                        placeholder='São Paulo'
                                        keyboardType="phone-pad"
                                        editable={false}
                                        mode="outlined"
                                        value={this.state.estado}
                                        onChangeText={(estado) => this.setState({ estado })}
                                        theme={{
                                            roundness: 10,
                                            colors: {
                                                primary: '#000',
                                                accent: '#000',
                                                surface: '#000',
                                                text: '#000',
                                                backdrop: '#000',
                                                background: '#000'
                                            }
                                        }}
                                    />

                                </View>

                                <Divider />

                                <View style={styles.bodyListItem1}>
                                    <View style={styles.iconArea}>
                                        <Icon
                                            name='home-city'
                                            size={24}
                                            color={"#fff"}
                                        />
                                    </View>
                                    <TextInput
                                        style={{
                                            width: '82%',
                                            color: "#757575",

                                        }}
                                        placeholder='São Paulo'
                                        keyboardType="phone-pad"
                                        editable={false}
                                        mode="outlined"
                                        value={this.state.cidade}
                                        onChangeText={(cidade) => this.setState({ cidade })}
                                        theme={{
                                            roundness: 10,
                                            colors: {
                                                primary: '#000',
                                                accent: '#000',
                                                surface: '#000',
                                                text: '#0000',
                                                backdrop: '#000',
                                                background: '#fff'
                                            }
                                        }}
                                    />
                                </View>

                                {loading && (
                                    <ActivityIndicator
                                        color="#C00"
                                        size="large"
                                        color='#9c27b0'
                                        style={{
                                            position: 'absolute'
                                        }}
                                    />
                                )}

                                <Button icon="save" onPress={this.handleUpdate}
                                    contentStyle={{
                                        padding: 10
                                    }}
                                    color='#000'

                                >
                                    Salvar informações
                                </Button>

                                <TouchableOpacity style={styles.configPessoal} onPress={() => navigate('PerfilOpcoesSenha', {
                                    email: this.state.email
                                })}>
                                    <Text style={styles.configPessoalText}>
                                        Configurações da conta
                                    </Text>
                                    <Icon
                                        name="settings"
                                        size={25}
                                        style={styles.headerIcon}
                                    />
                                </TouchableOpacity>

                            </View>

                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>

        );
    }
}
