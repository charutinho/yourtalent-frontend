import React, { Component, useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    FlatList,
    ScrollView,
    Image,
    Picker,
    ActivityIndicator,
} from 'react-native';
import {
    RadioButton,
    Button,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart';

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
                        color="#fff"
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
            atualizou: 0,
            nivel: true,
            nivelOlheiro: false,
            checked: '',
            notFound: false,
            buscaAtleta: false,
            placeholderValue: 'Eai atleta, quais são as novidades?',
            nivelPost: false
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
                const esporteFeed = responseJson.esporte[0].esporteFeed;
                this.setState({ esporteFeed: esporteFeed });
                if (esporteFeed == 'Futebol') {
                    this.setState({ esporteFutebol: true })
                } else if (esporteFeed == 'Basquete') {
                    this.setState({ esporteBasquete: true })
                } else if (esporteFeed == 'CS:GO') {
                    this.setState({ esportecsgo: true })
                } else if (esporteFeed == 'LoL') {
                    this.setState({ esportelol: true })
                }
            })


        if (this.state.esporteFeed == undefined) {
            if (this.state.esporteFeed == undefined) {
                var categoriaEsporte = await AsyncStorage.getItem('Esporte');
                this.setState({ esporteFeed: categoriaEsporte })
                await fetch(`http://${ip}:3000/listarposts`, {
                    method: 'POST',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(
                        {
                            esporte: this.state.esporteFeed
                        })
                })
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
        await fetch(`http://${ip}:3000/listarposts`, {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify
                ({
                    esporte: this.state.esporteFeed
                })
        })
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

    async componentDidUpdate(prevProps) {
        if (prevProps.resource !== this.props.resource) {
            await this.fetchData.call();
        }
    };

    async componentDidMount() {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const idUser = await AsyncStorage.getItem('@Login:id');
        await fetch(`http://${ip}:3000/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const nivel = responseJson.user.nivel;
                if (nivel == 2) {
                    this.setState({ nivel: false, nivelOlheiro: true, nivelPost: true })
                }
            })
        this.fetchData.call();
    }

    handlePerfil = async (id) => {
        this.props.navigation.navigate('PerfilUsuario', {
            userId: id,
        });
    }

    handleBusca = async () => {
        console.log('Posição: ', this.state.posicaoEscolhida);
        console.log('Cidade: ', this.state.estadoEscolhido);
        console.log('Sexo: ', this.state.checked);
        const ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`http://${ip}:3000/listarposts/especificos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(
                {
                    posicao: this.state.posicaoEscolhida,
                    estado: this.state.estadoEscolhido,
                    sexo: this.state.checked
                }
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.user);
                const ids = responseJson.user;
                if (ids == undefined) {
                    this.setState({ notFound: true, listData: null })
                } else {
                    this.setState({ atletasId: ids });
                    this.buscaOlheiro();
                }
            })
    }

    buscaOlheiro = async () => {
        fetch(`http://${ip}:3000/listarposts/atleta`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(
                {
                    ids: this.state.atletasId
                }
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const post = responseJson.post;
                this.setState({ listData: post, notFound: false })
            })
    }

    render() {
        const { checked } = this.state;
        const { nivel } = this.state;
        const { nivelOlheiro } = this.state;
        const { loading } = this.state;
        const { esporteFutebol } = this.state;
        const { esporteBasquete } = this.state;
        const { esportecsgo } = this.state;
        const { esportelol } = this.state;
        const { notFound } = this.state;
        const { buscaAtleta } = this.state;
        const { nivelPost } = this.state;
        return (
            <ScrollView style={{
                backgroundColor: '#fafafa',
            }} >
                <View style={styles.container} >

                    <StatusBar
                        barStyle='light-content'
                        backgroundColor="#572078"
                    />

                    {nivelOlheiro && (
                        <View style={styles.header}>
                            <View style={{ width: '100%', flexDirection: 'row' }} >
                                <TouchableOpacity style={styles.olheiroOption}
                                    activeOpacity={.9}
                                    onPress={() => this.setState({ nivelOlheiro: false, buscaAtleta: true })}>
                                    <Icon
                                        name="account-search"
                                        color="#572078"
                                        size={50}
                                    />
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        color: '#572078'
                                    }}>
                                        Buscar atletas
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.olheiroOption}
                                    activeOpacity={.9}
                                    onPress={() => this.setState({ nivelOlheiro: false, nivel: true, placeholderValue: 'Eae olheiro, o que há de novo?' })}>
                                    <Icon
                                        name="pencil-plus"
                                        color="#572078"
                                        size={50}
                                    />
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontSize: 15,
                                            color: '#572078'
                                        }}>
                                        Novo post
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {buscaAtleta && (
                        <View style={styles.busca}>
                            <View style={styles.buscaTitleView}>
                                <TouchableOpacity
                                    style={{
                                        marginLeft: '5%',
                                        marginRight: '-10%',
                                        zIndex: 1
                                    }}
                                    onPress={() => this.setState({ nivel: true, buscaAtleta: false, placeholderValue: 'Eae olheiro, o que há de novo?' })}
                                >
                                    <Icon
                                        name="pencil-plus"
                                        color="#572078"
                                        size={35}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.buscaTitle}>
                                    O que está buscando?
                                </Text>
                            </View>

                            {esporteFutebol && (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.6, borderColor: '#bdbdbd' }}>
                                    <Text style={{ fontSize: 17, width: '20%' }} >Posição: </Text>
                                    <Picker
                                        style={{ height: 50, width: '80%' }}
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
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.6, borderColor: '#bdbdbd' }}>
                                    <Text style={{ fontSize: 17, width: '20%' }} >Posição: </Text>
                                    <Picker
                                        style={{ height: 50, width: '80%' }}
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
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.6, borderColor: '#bdbdbd' }}>
                                    <View style={{ width: '20%' }}>
                                        <Text style={{ fontSize: 17 }} >Posição: </Text>
                                    </View>
                                    <Picker
                                        style={{ height: 50, width: '80%' }}
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
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.6, borderColor: '#bdbdbd' }}>
                                    <Text style={{ fontSize: 17, width: '20%' }} >Posição: </Text>
                                    <Picker
                                        style={{ height: 50, width: '80%' }}
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

                            <View style={styles.buscaCidade}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.6, borderColor: '#bdbdbd' }}>
                                    <View style={{ width: '20%' }}>
                                        <Text style={{ fontSize: 17 }} >Estado: </Text>
                                    </View>
                                    <Picker
                                        style={{ height: 50, width: '80%' }}
                                        selectedValue={this.state.estadoEscolhido}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ estadoEscolhido: itemValue })}
                                    >
                                        <Picker.Item label='Acre' value='AC' />
                                        <Picker.Item label='Alagoas' value='AL' />
                                        <Picker.Item label='Amapá' value='AP' />
                                        <Picker.Item label='Amazonas' value='AM' />
                                        <Picker.Item label='Bahia' value='BA' />
                                        <Picker.Item label='Ceará' value='CE' />
                                        <Picker.Item label='Distrito Federal' value='DF' />
                                        <Picker.Item label='Espírito Santo' value='ES' />
                                        <Picker.Item label='Goiás' value='GO' />
                                        <Picker.Item label='Maranhão' value='MA' />
                                        <Picker.Item label='Mato Grosso' value='MT' />
                                        <Picker.Item label='Mato Grosso do Sul' value='MS' />
                                        <Picker.Item label='Minas Gerais' value='MG' />
                                        <Picker.Item label='Pará' value='PA' />
                                        <Picker.Item label='Paraíba' value='PB' />
                                        <Picker.Item label='Paraná' value='PR' />
                                        <Picker.Item label='Pernambuco' value='PE' />
                                        <Picker.Item label='Piauí' value='PI' />
                                        <Picker.Item label='Rio de Janeiro' value='RJ' />
                                        <Picker.Item label='Rio Grande do Norte' value='RN' />
                                        <Picker.Item label='Rio Grande do Sul' value='RS' />
                                        <Picker.Item label='Rondônia' value='RO' />
                                        <Picker.Item label='Roraima' value='RR' />
                                        <Picker.Item label='Santa Catarina' value='SC' />
                                        <Picker.Item label='São Paulo' value='SP' />
                                        <Picker.Item label='Sergipe' value='SE' />
                                        <Picker.Item label='Tocantis' value='TO' />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.buscaSexo}>

                                <View style={styles.inputSexo}>
                                    <Text style={{ fontSize: 17, width: '20%' }}>
                                        Sexo:
                                    </Text>

                                    <View style={{ width: '80%', flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ checked: "M" })}
                                            style={styles.radioOpcao}
                                        >

                                            <RadioButton
                                                style={styles.radioButton}
                                                value="M"
                                                status={checked === 'M' ? 'checked' : 'unchecked'}
                                                color='#000'
                                                uncheckedColor='#000'
                                            />

                                            <Text style={styles.radioText}>Masculino</Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => this.setState({ checked: "F" })}
                                            style={styles.radioOpcao}
                                        >

                                            <RadioButton
                                                value="F"
                                                status={checked === 'F' ? 'checked' : 'unchecked'}
                                                color="#000"
                                                uncheckedColor='#000'
                                            />

                                            <Text style={styles.radioText}>Feminino</Text>

                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <View style>
                                    <Button
                                        mode="contained"
                                        onPress={this.handleBusca}
                                        color='#6a1b9a'
                                        style={{ marginTop: '2%', marginBottom: '5%' }}
                                    >
                                        Buscar atletas
                                        </Button>
                                </View>
                            </View>
                        </View>
                    )}

                    {nivel && (
                        <View style={styles.header}>

                            <View style={styles.desc}>
                                {nivelPost && (
                                    <TouchableOpacity
                                        style={{
                                            marginBottom: '-10%',
                                            marginLeft: '90%',
                                            zIndex: 1
                                        }}
                                        onPress={() => this.setState({ nivel: false, buscaAtleta: true })}
                                    >
                                        <Icon
                                            name="account-search"
                                            color="#572078"
                                            size={35}
                                            style={{ opacity: 0.38 }}
                                        />
                                    </TouchableOpacity>
                                )}
                                <TextInput
                                    style={styles.textArea}
                                    placeholder={this.state.placeholderValue}
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
                                        <Picker.Item label="Futebol" value="Futebol" />
                                        <Picker.Item label="Basquete" value="Basquete" />
                                        <Picker.Item label="Counter Strike: Global Offensive" value="CS:GO" />
                                        <Picker.Item label="League of Legends" value="LoL" />
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
                    )}



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

                    {notFound && (
                        <View style={styles.fim}>
                            <Text>
                                Nenhum atleta encontrado
                        </Text>
                        </View>
                    )}

                </View>
            </ScrollView >
        );
    }
}
