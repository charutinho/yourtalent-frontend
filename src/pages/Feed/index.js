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
    Image,
    Picker,
    ActivityIndicator,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart';
import Video from 'react-native-video';

import styles from './styles';
import ConteudoFeed from '../../components/ConteudoFeed';

export default class PageFeed extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CadEscolhaEsporte')
                    }}
                >
                    <Icon
                        name="dots-horizontal"
                        color="#000"
                        size={25}
                        style={{
                            marginRight: 10
                        }}
                    />

                </TouchableOpacity >
            )
        };

    };
    constructor(props) {
        super(props);
        this.state = {
            desc: '',
            confirmar: '',
            PickerValue: '',
            visibleH: 0,
            visibleW: 0,
            loading: true,
            atualizou: 0
        }
    }

    //Criar um post
    novoPost = async (confirmacao) => {
        if (confirmacao == true) {
            var idUser = await AsyncStorage.getItem('@Login:id');
            var ip = await AsyncStorage.getItem('@Ip:ip');

            const config = {
                method: 'POST',
                body: this.state.data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': 0,

                    idUser,
                    categoria: this.state.PickerValue,
                    desc: this.state.desc
                },
            };
            await fetch(`http://${ip}:3000/novopost`, config);
            RNRestart.Restart();
        } else {
            const options = {
                title: 'Imagem/vídeo da sua postagem',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Tirar uma foto',
                chooseFromLibraryButtonTitle: 'Foto da galeria',
                customButtons: [
                    { name: 'video', title: 'Vídeo da galeria' },
                ],
                storageOptions: {
                    skipBackup: false,
                    path: 'images',
                },
            };

            const optionsVideo = {
                storageOptions: {
                    skipBackup: true,
                    path: 'movies'
                },
                noData: true,
                mediaType: 'video'
            };

            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    console.log('Cancelou o picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton === 'video') {
                    ImagePicker.launchImageLibrary(optionsVideo, (response) => {
                        const data = new FormData();
                        data.append('name', 'avatar');
                        data.append('img', {
                            uri: response.uri,
                            type: "video/mp4",
                            name: "videoupload"
                        });
                        const miniatura = { uri: response.uri }
                        this.setState({
                            miniatura: miniatura,
                            data: data,
                            visibleH: 18,
                            visibleW: 63
                        })
                    });

                } else {
                    const data = new FormData();
                    data.append('name', 'avatar');
                    data.append('img', {
                        uri: response.uri,
                        type: response.type,
                        name: "videoupload"
                    });

                    const miniatura = { uri: response.uri }

                    this.setState({
                        miniatura: miniatura,
                        data: data,
                        visibleH: 18,
                        visibleW: 63
                    })
                }
            });
        }
    }

    fetchData = async () => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const idUser = await AsyncStorage.getItem('@Login:id');

        await fetch(`http://${ip}:3000/esportes/getfavesporte/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(`http://${ip}:3000/esportes/getfavesporte/${idUser}`);
                const esporteFeed = responseJson.esporte[0].esporteFeed;

                this.setState({ esporteFeed: esporteFeed })
            })


        if (this.state.esporteFeed == undefined) {
            if (this.state.esporteFeed == undefined) {
                var categoriaEsporte = await AsyncStorage.getItem('Esporte');
                this.setState({ esporteFeed: categoriaEsporte })
                await fetch(`http://${ip}:3000/listarposts/${this.state.esporteFeed}`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson.post[0].autor)
                        const post = responseJson.post;

                        this.setState({
                            listData: post,
                            loading: false,
                            atualizou: 1
                        });
                    })
            }
        }
        this.setState({ loading: true })
        await fetch(`http://${ip}:3000/listarposts/${this.state.esporteFeed}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.post[0].autor)
                const post = responseJson.post;

                this.setState({
                    listData: post,
                    loading: false
                });
            })
    }

    async componentDidUpdate() {
        if (this.state.atualizou === 1) {
            this.fetchData.call();
            this.setState({ atualizou: 2 })
        }
    }

    async componentDidMount() {
        this.fetchData.call();
    }

    handlePerfil = async (id) => {
        this.props.navigation.navigate('PerfilUsuario', {
            userId: id,
        });
    }

    render() {
        const { loading } = this.state;
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

                        <View style={styles.desc}>
                            <TextInput
                                style={styles.textArea}
                                placeholder='Eai atleta, quais são as novidades?'
                                autoCorrect={true}
                                placeholderTextColor="grey"
                                selectionColor='#000'
                                caretHidden={false}
                                multiline={true}
                                numberOfLines={8}
                                underlineColorAndroid="transparent"
                                onChangeText={(desc) => this.setState({ desc })}
                            />
                        </View>

                        <View style={styles.selectImg}>

                            <TouchableOpacity
                                style={{
                                    padding: 5,
                                    fontSize: 22,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                onPress={this.novoPost}
                            >
                                <Icon
                                    name="image-plus"
                                    color="#212121"
                                    size={25}
                                    style={{
                                        marginLeft: 5,
                                        backgroundColor: '#fafafa',
                                        borderRadius: 90,
                                        padding: 5,
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.20,
                                        shadowRadius: 1.41,
                                        elevation: 2,
                                    }}
                                />

                            </TouchableOpacity>

                            <Image source={this.state.miniatura}
                                style={styles.miniaturaImg}
                            />

                            <View style={styles.styleSelect}>

                                <Picker
                                    style={{ height: 50, width: 150 }}
                                    selectedValue={this.state.PickerValue}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                >
                                    <Picker.Item label="Futebol" value="futebol" />
                                    <Picker.Item label="Basquete" value="basquete" />
                                    <Picker.Item label="Counter Strike: Global Offensive" value="cs:go" />
                                    <Picker.Item label="League of Legends" value="lol" />
                                </Picker>

                            </View>


                            <TouchableOpacity
                                onPress={() => this.novoPost(true)}
                            >
                                <Icon
                                    name="send"
                                    color="#212121"
                                    size={25}
                                    style={{
                                        marginLeft: 5,
                                        backgroundColor: '#fafafa',
                                        borderRadius: 8,
                                        padding: 5,
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.20,
                                        shadowRadius: 1.41,
                                        elevation: 2,
                                    }}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>


                    <View style={styles.body}>

                        <FlatList
                            style={styles.containerFlatList}
                            data={this.state.listData}
                            keyExtractor={listarposts => String(listarposts._id)}
                            renderItem={({ item }) => {
                                return (
                                    <View
                                        style={{
                                            marginTop: 10,
                                            marginBottom: 30
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View style={{
                                                width: '50%',
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>

                                                <TouchableOpacity
                                                    onPress={() => this.handlePerfil(item.autor._id)}
                                                >
                                                    <Image
                                                        source={{ uri: `http://${ip}:3000/${item.autor.fotoPerfil}` }}
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            borderRadius: 90,
                                                            overflow: 'hidden',
                                                            marginLeft: 10,
                                                        }}
                                                    />

                                                </TouchableOpacity>

                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        marginLeft: 10,
                                                    }}
                                                    onPress={() => this.handlePerfil(item.autor._id)}
                                                >
                                                    {item.autor.nome}

                                                </Text>

                                            </View>

                                            <View style={{
                                                width: '50%',
                                                alignItems: 'flex-end'
                                            }}>

                                                <TouchableOpacity
                                                >
                                                    <Icon
                                                        name="dots-vertical"
                                                        color="#000"
                                                        size={25}
                                                        style={{
                                                            marginRight: 10
                                                        }}
                                                    />
                                                </TouchableOpacity>

                                            </View>


                                        </View>

                                        <Text
                                            style={{
                                                margin: 10,
                                                textAlign: 'justify',
                                            }}
                                        >
                                            {item.descricao}
                                        </Text>

                                        <ConteudoFeed type={item.tipo} source={{ uri: `http://${ip}:3000/${item.conteudoPost}` }} />
                                    </View>
                                );
                            }}
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

                    <View style={styles.fim}>
                        <Text>
                            Não há mais nada aqui
                        </Text>
                        <Text>
                            Parece que você já viu tudo, que tal escolher outro esporte?
                        </Text>
                    </View>

                </View>
            </ScrollView >
        );
    }
}
