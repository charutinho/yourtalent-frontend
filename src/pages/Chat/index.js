import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import io from 'socket.io-client';
import {
    List,
    Divider
} from 'react-native-paper';

import styles from './styles';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }

    countLopp = 0;

    async componentDidUpdate() {
        countLopp = 0;
        if (this.countLopp == 0) {
            this.getChats.call();
            this.countLopp = 1;
        }
    }

    async componentDidMount() {
        await this.getProf.call();
        this.getChats.call();
    }

    getProf = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');

        await fetch(`https://yourtalent-backend.herokuapp.com/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                var nivel = responseJson.user.nivel;
                if (nivel == 1) {
                    this.setState({ nivel: 1, isAtleta: true })
                } else {
                    this.setState({ nivel: 2, isOlheiro: true })
                }
            })
    }

    getChats = async () => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const autorId = await AsyncStorage.getItem('@Login:id')
        await fetch(`https://yourtalent-backend.herokuapp.com/getconversa`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(
                {
                    autor: autorId,
                    nivel: this.state.nivel
                }
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let msgs = responseJson.message;
                if (msgs == 'Nenhuma conversa') {
                    this.setState({ getConversa: false })
                } else {
                    const conversas = responseJson;
                    console.log(conversas)
                    this.setState({
                        conversas,
                        getConversa: true
                    })
                }
            })
    }

    goMsg = async (idDest) => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        if (this.state.nivel == 1) {
            this.props.navigation.navigate('ChatUsuario', {
                idUsuario: idUser,
                idOlheiro: idDest
            })
        } else {
            this.props.navigation.navigate('ChatUsuario', {
                idUsuario: idDest,
                idOlheiro: idUser
            })
        }
    }

    handlePerfil = async (id) => {
        this.props.navigation.navigate('PerfilUsuario', {
            userId: id,
        });
    }

    render() {
        const { isAtleta } = this.state;
        const { isOlheiro } = this.state;
        if (this.state.getConversa == true) {
            return (
                <View style={styles.container} >
                    <StatusBar
                        barStyle='light-content'
                        backgroundColor="#572078"
                    />
                    <Text style={{ fontSize: 30 }}>Conversas</Text>
                    <View style={styles.body}>
                        <FlatList
                            style={{
                                width: '100%',
                            }}
                            data={this.state.conversas}
                            keyExtractor={listarconversas => String(listarconversas._id)}
                            renderItem={({ item }) => {
                                if (this.state.nivel == 1) {
                                    return (
                                        <TouchableOpacity onPress={() => this.goMsg(item.autor._id)}>
                                            <List.Item
                                                title={item.autor.nome}
                                                left={props =>

                                                    <ImageBackground source={{ uri: `https://yourtalent-backend.herokuapp.com/${item.autor.fotoPerfil}` }}
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            borderRadius: 90,
                                                            overflow: 'hidden'
                                                        }}
                                                    />
                                                }
                                                right={props =>
                                                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.handlePerfil(item.autor._id)}>
                                                        <Icon
                                                            name="account-arrow-right"
                                                            color="#000"
                                                            size={35}
                                                        />
                                                    </TouchableOpacity>
                                                }
                                            />
                                            <Divider />
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => this.goMsg(item.destinatario._id)}>
                                            <List.Item
                                                title={item.destinatario.nome}
                                                left={props =>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <ImageBackground source={{ uri: `https://yourtalent-backend.herokuapp.com/${item.destinatario.fotoPerfil}` }}
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: 90,
                                                                overflow: 'hidden'
                                                            }}
                                                        />
                                                    </View>
                                                }
                                                right={props =>
                                                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.handlePerfil(item.destinatario._id)}>
                                                        <Icon
                                                            name="account-arrow-right"
                                                            color="#000"
                                                            size={35}
                                                        />
                                                    </TouchableOpacity>
                                                }
                                            />
                                            <Divider />
                                        </TouchableOpacity>
                                    );
                                }
                            }}
                        />
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container} >
                <StatusBar
                    barStyle='light-content'
                    backgroundColor="#572078"
                />
                <View style={styles.body}>
                    {isAtleta && (
                        <View style={styles.notMessageAtleta}>
                            <Text style={styles.notMessageAtletaText}>
                                Nenhuma mensagem recebida
                            </Text>
                            <Text style={styles.notMessageBodyText}>
                                Que tal postar mais um vídeo mostrando todo seu talento?
                            </Text>
                        </View>
                    )}
                    {isOlheiro && (
                        <View style={styles.notMessageAtleta}>
                            <Text style={styles.notMessageAtletaText}>
                                Você ainda não enviou nenhuma mensagem
                            </Text>
                            <Text style={styles.notMessageBodyText}>
                                Que tal dar mais um olhadinha no feed?
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        )
    }
}