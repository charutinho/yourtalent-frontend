import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    ImageBackground,
    Button
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNRestart from 'react-native-restart';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default class Perfil extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('PerfilOpcoes')}
                >
                    <Icon
                        name="settings"
                        color="#000"
                        size={30}
                        style={{
                            marginRight: 10
                        }}
                    />

                </TouchableOpacity >
            )
        };

    };

    //Dados Usuário
    constructor(props) {
        super(props);
        this.state = {
            nomeUsuario: '',
            idade: '',
            sexo: '',
            email: '',
            descricao: '',
            nivel: '',
            nasc: '',
            esporte: '',
            estado: '',
            //Fotos
            foto: '../../assets/icons/profile.png',
            capa: '../../assets/img/gatinho.jpg'
        };
    }

    //Upload image
    handleUploadImage = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');

        const options = {
            title: '',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Usar câmera',
            chooseFromLibraryButtonTitle: 'Foto da galeria',
            storageOptions: {
                skipBackup: false,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('Usuário cancelou o Image Picker');
            } else if (response.error) {
                console.log('Ocorrou o seguinte erro: ', response.error);
            } else if (response.customButton) {
                console.log('Usuário apertou um botão customizado: ', response.customButton);
            } else {
                const data = new FormData();
                data.append('name', 'avatar');
                data.append('img', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                });
                const config = {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': 0,

                        idUser: idUser
                    },
                };

                fetch(`http://${ip}:3000/uploadimg`, config);
                Alert.alert("Sucesso!", "A sua foto de perfil foi alterada com sucesso!");
                AsyncStorage.setItem('Fotoalterada', 'alterou');
                RNRestart.Restart();

            }
        });

    }

    handleUploadImageCapa = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');
        const options = {
            title: '',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Usar câmera',
            chooseFromLibraryButtonTitle: 'Foto da galeria',
            storageOptions: {
                skipBackup: false,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('Usuário cancelou o Image Picker');
            } else if (response.error) {
                console.log('Ocorrou o seguinte erro: ', response.error);
            } else if (response.customButton) {
                console.log('Usuário apertou um botão customizado: ', response.customButton);
            } else {
                const data = new FormData();
                data.append('name', 'avatar');
                data.append('img', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                });
                const config = {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': 0,

                        idUser: idUser
                    },
                };

                fetchFoto = async () => {
                    await fetch(`http://${ip}:3000/uploadimgcapa`, config);
                    Alert.alert("Sucesso!", "A sua foto de capa foi alterada com sucesso!");
                    AsyncStorage.setItem('Fotoalterada', 'alterou');
                    RNRestart.Restart();
                }
                fetchFoto.call();
            }
        });
    }

    async componentDidMount() {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');

        await fetch(`http://${ip}:3000/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {

                //Dados do usuário
                var nomeUsuario = responseJson.user.nome;
                var nasc = responseJson.user.nasc;
                var esporte = responseJson.user.esporte;
                var estado = responseJson.user.estado;
                var descricao = responseJson.user.descricao;
                //Foto
                var fotoUsuario = responseJson.user.fotoPerfil;
                var fotoCapa = responseJson.user.fotoCapa;


                // Calculo idade
                var saveNasc = nasc;
                var nasc = nasc.split("/");
                var anoAtual = new Date();
                var ano = anoAtual.getFullYear();
                var idade = ano - nasc[2];

                //Foto do usuário
                var imgUser = `http://${ip}:3000/${fotoUsuario}`;

                //Capa do usuário
                var capaUser = `http://${ip}:3000/${fotoCapa}`;

                this.setState({
                    nomeUsuario: nomeUsuario,
                    idade: idade,
                    nasc: saveNasc,
                    foto: imgUser,
                    capa: capaUser,
                    esporte: esporte,
                    estado: estado,
                    descricao: descricao
                });

            }).catch((error) => {
                console.error(error);
            });
    }

    verIdade = async () => {
        Alert.alert("Data de nascimento", this.state.nasc);
    }

    render() {
        return (
            <ScrollView style={{
                backgroundColor: '#fafafa',
            }}>
                <View style={styles.container}>

                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#f5f5f5"
                    />

                    <View style={styles.header}>

                        <View style={styles.capa}>

                            <ImageBackground source={{ uri: `${this.state.capa}` }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'flex-end'
                                }}
                            >

                                <TouchableOpacity
                                    onPress={this.handleUploadImageCapa}
                                >
                                    <Icon
                                        name="image-plus"
                                        color="#212121"
                                        size={30}
                                        style={{
                                            padding: 8
                                        }}
                                    />

                                </TouchableOpacity>

                            </ImageBackground>



                        </View>

                        <View style={styles.fotoPerfilView}>

                            <View style={styles.fotoPerfil}>
                                <ImageBackground
                                    source={{ uri: `${this.state.foto}` }}
                                    style={styles.fotoUsuario}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={this.handleUploadImage}
                            >
                                <Icon
                                    name="image-plus"
                                    color="#212121"
                                    size={35}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={styles.body}>

                        <View style={styles.nomeView}>
                            <Text style={styles.nome}>
                                {this.state.nomeUsuario}
                            </Text>
                        </View>

                        <View>
                            <TouchableOpacity onPress={this.Logout}>
                                <Text>
                                    Logoff
                            </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.descricaoView}>
                            <Text style={styles.descricao}>
                                {this.state.descricao}
                            </Text>
                        </View>

                        <View style={styles.sobreView}>

                            <TouchableOpacity onPress={this.verIdade}>
                                <View style={styles.idadeView}>
                                    <Icon
                                        name="account"
                                        color="#000"
                                        size={50}
                                    />
                                    <Text>
                                        {this.state.idade} anos
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={styles.esporteView}>
                                    <Icon
                                        name="google-controller"
                                        color="#000"
                                        size={50}
                                    />
                                    <Text>{this.state.esporte}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={styles.estadoView}>
                                    <Icon
                                        name="map-marker"
                                        color="#000"
                                        size={48}
                                    />
                                    <Text>{this.state.estado}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>


                        <View style={styles.destaqueView}>
                            <Text style={styles.destaqueTitulo}>
                                Últimas postagens
                            </Text>

                            <View style={styles.destaqueVideo}>

                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>

        )

    }

}