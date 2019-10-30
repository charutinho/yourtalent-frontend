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
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart';

import styles from './styles';

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
            loading: true
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
            fetch(`http://${ip}:3000/novopost`, config);
            RNRestart.Restart();
        } else {
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
                const data = new FormData();
                data.append('name', 'avatar');
                data.append('img', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                });

                const miniatura = { uri: response.uri }

                this.setState({
                    miniatura: miniatura,
                    data: data,
                    visibleH: 18,
                    visibleW: 63
                })

            });
        }
    }

    fetchData = async () => {
        const categoriaEsporte = await AsyncStorage.getItem('Esporte');
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const response = await fetch(`http://${ip}:3000/listarposts/${categoriaEsporte}`)
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

    async componentDidUpdate(){
        this.fetchData.call();
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
                        <View style={styles.novoPostContainer}>
                            <TouchableOpacity
                                onPress={this.novoPost}
                                style={{
                                    padding: 5,
                                    fontSize: 22,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                    }}
                                >
                                    Selecionar imagem
                            </Text>
                                <Icon
                                    name="image-plus"
                                    color="#212121"
                                    size={18}
                                    style={{
                                        marginLeft: 5,
                                        backgroundColor: '#fafafa',
                                        borderRadius: 90,
                                        padding: 4,
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


                            <TouchableOpacity onPress={this.novoPost}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        marginLeft: 10
                                    }}>
                                    {this.state.confirmar}
                                </Text>

                            </TouchableOpacity>

                        </View>

                        <Image source={this.state.miniatura}
                            style={{
                                width: 50,
                                height: 50,
                                marginLeft: 20
                            }}
                        />

                        <Text
                            onPress={() => this.novoPost(true)}
                            style={{
                                width: this.state.visibleW,
                                height: this.state.visibleH
                            }}
                        >
                            Confirmar
                        </Text>


                    </View>


                    <View style={styles.body}>
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
                                            <TouchableOpacity
                                                onPress={() => this.handlePerfil(item.autor.idUsuario)}
                                            >
                                                <Image
                                                    source={{ uri: `http://${ip}:3000/${item.autor.fotoPerfil}` }}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: 90,
                                                        overflow: 'hidden',
                                                        marginLeft: 10
                                                    }}
                                                />
                                            </TouchableOpacity>

                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    marginLeft: 10
                                                }}
                                                onPress={() => this.handlePerfil(item.autor.idUsuario)}
                                            >
                                                {item.autor.nome}

                                            </Text>
                                        </View>

                                        <Text
                                            style={{
                                                margin: 10,
                                                textAlign: 'justify',
                                            }}
                                        >
                                            {item.descricao}
                                        </Text>

                                        <ImageBackground source={{ uri: `http://${ip}:3000/${item.conteudoPost}` }}
                                            style={{
                                                width: '100%',
                                                height: 470,
                                            }}
                                        />

                                    </View>
                                );
                            }}
                        />
                    </View>

                    <View style={styles.fim}>
                        <Text>
                            Não há mais nada aqui
                        </Text>
                        <Text>
                            Parece que você já viu tudo, qual tal escolher outro esporte?
                        </Text>
                    </View>

                </View>
            </ScrollView >
        );
    }
}
