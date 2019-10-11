import React, { Component, useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    FlatList,
    ScrollView,
    ImageBackground,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNRestart from 'react-native-restart';


import styles from './styles';

const Feed = (props) => {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        async function loadFeed() {
            ip = await AsyncStorage.getItem('@Ip:ip');
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Cache-Control': 'no-cache'
                },
            };
            const response = await fetch(`http://${ip}:3000/listarposts`, config)

            const data = await response.json();

            setFeed(data);
        }
        loadFeed();

    }, []);

    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={listarposts => String(listarposts._id)}
                renderItem={({ item }) => (
                    <View>

                        <Text
                            style={{
                                fontSize: 20,
                                padding: 10,
                                marginBottom: -15
                            }}
                        >
                            {item.autor.nomeUsuario}
                        </Text>

                        <Text
                            style={{
                                padding: 10
                            }}
                        >
                            {item.descricao}
                        </Text>
                        <View style={{
                            height: 400,
                            width: 400,
                            borderRadius: 5,
                            borderColor: '#423',
                        }}>
                            <ImageBackground source={{ uri: `http://${ip}:3000/${item.conteudoPost}` }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </View>
                    </View>
                )}
            />
        </View >
    );
}

export default class PageFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: '',
        }
    }

    async componentDidMount() {
        const redireciona = await AsyncStorage.getItem('Fotoalterada')
        console.log(redireciona);
        if (redireciona == 'alterou') {
            this.props.navigation.navigate('Perfil');
            AsyncStorage.removeItem('Fotoalterada');
        }
    }

    //Criar um post
    novoPost = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var nomeUsuario = await AsyncStorage.getItem('@Nome:nome');
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

                        idUser,
                        nomeUsuario,
                        desc: this.state.desc
                    },
                };
                fetch(`http://${ip}:3000/novopost`, config);
                RNRestart.Restart();
            }
        });
    }

    render() {
        return (
            <ScrollView style={{
                backgroundColor: '#fafafa',
            }} >
                <View style={styles.container} >

                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#f5f5f5"
                    />

                    <View style={styles.header}>

                    </View>

                    <View style={styles.body}>
                        <Feed />
                    </View>

                </View>
            </ScrollView >
        );
    }
}
