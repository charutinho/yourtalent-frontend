import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import {
    ActivityIndicator
} from 'react-native-paper';

import styles from './styles';

export default class PerfilAdm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Só pra deixar a área bonita usando grid
            opcoes: [
                { id: 1, nome: 'Denúncias', icon: 'account-alert', iconcolor: '#fff' },
                { id: 2, nome: 'Posts', icon: 'newspaper', iconcolor: '#fff' },
            ],
            verOpcoes: true,
            opcaoAdmin: null,
            denuncias: [],
            modalDenuncia: false,
            tipo: null,
            nomePagina: 'administração',




            //video
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            paused: false,
            skin: 'custom',
            ignoreSilentSwitch: null,
            isBuffering: false,
            imageHeight: 0,
            zindexvideo: 0,
            loading: true
        }

        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
    }

    async componentDidMount() {
        this.getDenuncias.call();
        this.onLoad.call();
    }

    onLoad(data) {
        this.setState({
            duration: data.duration,
            paused: true,
            loading: false
        });
    }

    onProgress(data) {
        this.setState({ currentTime: data.currentTime });
    }

    onBuffer({ isBuffering } = { isBuffering: boolean }) {
        this.setState({ isBuffering });
    }

    getDenuncias = async () => {
        const ip = await AsyncStorage.getItem('@Ip:ip')
        await fetch(`http://${ip}:3000/getdenuncias`)
            .then((response) => response.json())
            .then((responseJson) => {
                const denuncias = responseJson;
                const semDenuncias = responseJson.message;
                if (semDenuncias == true) {
                    this.setState({ semDenuncias: true })
                } else {
                    this.setState({ denuncias })
                }
            })
    }

    opcoesDenuncia = async (nomeUsuario, tipoPost, /* post */ postDesc, postConteudo, postTipo, idPost, /* denuncia */ dSpam, dViolencia, dAssedio, dFalsosa, dDiscurso, dOutro, dOutroTxt, /* idUsuario */ idUser) => {
        this.setState({ modalDenuncia: true, nomeDenuncia: nomeUsuario, tipo: tipoPost, postDesc, postConteudo, postTipo, idPost, dSpam, dViolencia, dAssedio, dFalsosa, dDiscurso, dOutro, dOutroTxt, idUser })
    }

    anularDenuncia = async (idDenuncia) => {
        await this.setState({ denuncias: null })
        const ip = await AsyncStorage.getItem('@Ip:ip');
        fetch(`http://${ip}:3000/anulardenuncia/${idDenuncia}`)
        await this.getDenuncias.call();
        await this.setState({ modalDenuncia: false, nomeDenuncia: '', tipo: '', postDesc: '', postConteudo: '', postTipo: '', idPost: '' })
    }

    banirUsuario = async (idUser) => {
        await this.setState({ denuncias: null })
        const ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`http://${ip}:3000/banirusuario/${idUser}`)
        await this.getDenuncias.call();
        await this.setState({ modalDenuncia: false, nomeDenuncia: '', tipo: '', postDesc: '', postConteudo: '', postTipo: '', idPost: '' })
    }

    render() {
        const { verOpcoes } = this.state;
        const { opcaoAdmin } = this.state;
        const { tipo } = this.state;
        const { loading } = this.state;
        return (
            <View style={styles.container}>

                <View style={styles.head}>
                    <Text style={styles.headTitle}>
                        Área de {this.state.nomePagina}
                    </Text>
                    <Icon
                        name='account-tie'
                        size={40}
                        color='#6a1b9a'
                    />
                </View>

                <View style={styles.body}>

                    {verOpcoes && (
                        <FlatList
                            style={styles.flatlistItem}
                            data={this.state.opcoes}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.item} onPress={() => this.setState({ opcaoAdmin: item.id, verOpcoes: false, nomePagina: 'denúncias' })}>
                                        <Text style={styles.itemText}>{item.nome}</Text>
                                        <Icon
                                            name={item.icon}
                                            size={30}
                                            color={item.iconcolor}
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    )}

                    {opcaoAdmin == 1 && (
                        <View style={styles.denunciasView}>
                            {this.state.semDenuncias == true && (
                                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 30 }}> Nenhuma denúncia </Text>
                                </View>
                            )}
                            <FlatList
                                data={this.state.denuncias}
                                keyExtractor={item => item._id}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.denunciasFlatlist}>
                                            <TouchableOpacity style={styles.denunciasHeader} onPress={() => this.opcoesDenuncia(item.idDenuncia.nome, item.tipo, item.idPost.descricao, item.idPost.conteudoPost, item.idPost.tipo, item._id, item.spam, item.violencia, item.assedio, item.falsosa, item.discurso, item.outro, item.outroTxt, item.idDenuncia._id)} >
                                                <Image style={{ width: 50, height: 50, borderRadius: 90, overflow: 'hidden' }} source={{ uri: `http://${ip}:3000/${item.idDenuncia.fotoPerfil}` }} />
                                                <Text> {item.idDenuncia.nome} </Text>
                                                <Icon
                                                    name={item.tipo}
                                                    size={30}
                                                    color={'#000'}
                                                    style={styles.denunciasIcon}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    )}
                </View>

                <Modal visible={this.state.modalDenuncia} transparent={true} animationType='fade' onRequestClose={() => this.setState({ modalDenuncia: false })}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <View style={{
                            width: '95%',
                            backgroundColor: '#fafafa',
                            padding: 10,
                            borderRadius: 8,
                            justifyContent: 'center',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,
                            elevation: 24,
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 22 }}> Denúncia de</Text>
                                <Text style={{ fontSize: 22, color: '#b71c1c', fontWeight: 'bold' }}> {this.state.nomeDenuncia} </Text>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10, paddingHorizontal: 2 }}>
                                <Text style={{ fontWeight: 'bold' }}>Infrações:</Text>
                                {this.state.dSpam && (
                                    <Text style={{ color: '#ffb74d', fontWeight: 'bold' }}> spam, </Text>
                                )}
                                {this.state.dViolencia && (
                                    <Text style={{ color: '#b71c1c', fontWeight: 'bold' }}>violência, </Text>
                                )}
                                {this.state.dAssedio && (
                                    <Text style={{ color: '#b71c1c', fontWeight: 'bold' }}>assédio, </Text>
                                )}
                                {this.state.dFalsosa && (
                                    <Text style={{ color: '#ffb74d', fontWeight: 'bold' }}>falsos anúncios, </Text>
                                )}
                                {this.state.dDiscurso && (
                                    <Text style={{ color: '#b71c1c', fontWeight: 'bold' }}>discurso de ódio, </Text>
                                )}
                                {this.state.dOutro == true && this.state.dOutroTxt !== '' && (
                                    <Text style={{ fontWeight: 'bold' }}> {this.state.dOutroTxt} </Text>
                                )}
                            </View>
                            <View>
                                {tipo == 'newspaper' && (
                                    <View>
                                        <View style={{ width: '100%', alignItems: 'center', marginBottom: '7%' }}>
                                            <Text style={{ fontSize: 18 }}> Post da denúncia </Text>
                                        </View>
                                        <View style={{ width: '100%', alignItems: 'center' }}>
                                            <View style={{ width: '100%' }}>
                                                <Text style={{ fontSize: 15, marginBottom: '1.85%' }}> {this.state.postDesc} </Text>
                                            </View>
                                            {this.state.postTipo == 'image' && (
                                                <Image style={{ width: 350, height: 350 }} source={{ uri: `http://${ip}:3000/${this.state.postConteudo}` }} />
                                            )}
                                            {this.state.postTipo == 'video' && (
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ paused: !this.state.paused })}
                                                    activeOpacity={0.85}
                                                    style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Video
                                                        source={{ uri: `http://${ip}:3000/${this.state.postConteudo}` }}
                                                        style={{
                                                            width: 350,
                                                            height: 350,
                                                            backgroundColor: '#fafafa',
                                                            zIndex: this.state.zindexvideo
                                                        }}
                                                        rate={this.state.rate}
                                                        paused={this.state.paused}
                                                        volume={this.state.volume}
                                                        muted={this.state.muted}
                                                        ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                                                        resizeMode={'cover'}
                                                        onLoad={this.onLoad}
                                                        onBuffer={this.onBuffer}
                                                        onProgress={this.onProgress}
                                                        onEnd={() => null}
                                                        repeat={true}
                                                    />
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
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', marginTop: '3%', justifyContent: 'space-around' }}>
                                            <TouchableOpacity style={styles.denunciasTouchable} onPress={() => this.anularDenuncia(this.state.idPost)}>
                                                <Text> Anular denúncia </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.denunciasTouchable} onPress={() => this.banirUsuario(this.state.idUser)}>
                                                <Text> Banir usuário </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
