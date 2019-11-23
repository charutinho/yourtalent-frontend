import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import io from 'socket.io-client';

import styles from './styles';

export default class ChatUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        }
    }

    async componentDidUpdate() {
        this.socket.on("chat message", msg => {
            if (msg == 'getmsg') {
                this.socket.emit('chat message', 'attmsg')
                this.getMsg.call();
            }
        })
    };

    async componentDidMount() {
        // this.refs.chatScroll.scrollToEnd({ animated: false })
        await this.getProf.call();
        this.getMsg.call();

        var ip = await AsyncStorage.getItem('@Ip:ip');
        this.socket = io(`http://${ip}:3000`)
    }

    getProf = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');

        await fetch(`http://${ip}:3000/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                var nivel = responseJson.user.nivel;
                if (nivel == 1) {
                    this.setState({ nivel: 1, idUsuario: idUser })
                } else {
                    this.setState({ nivel: 2, idUsuario: idUser })
                }
            })
    }

    getMsg = async () => {
        const { navigation } = this.props;
        var idUsuario = navigation.getParam('idUsuario')
        var idOlheiro = navigation.getParam('idOlheiro')
        const ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`http://${ip}:3000/getchat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(
                {
                    autor: idOlheiro,
                    destinatario: idUsuario
                }
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const resp = responseJson.msgs;
                console.log(resp);
                this.setState({
                    msgs: resp
                })
            })
    }

    sendMsg = async () => {
        const { navigation } = this.props;
        var idUsuario = navigation.getParam('idUsuario')
        var idOlheiro = navigation.getParam('idOlheiro')
        const ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`http://${ip}:3000/chat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(
                {
                    autor: idOlheiro,
                    destinatario: idUsuario,
                    msg: this.state.msg,
                    nivel: this.state.nivel
                }
            )
        })
        this.socket.emit('chat message', 'envioumsg')
        await this.setState({
            msg: ''
        })
        this.getMsg.call();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor="#572078"
                />

                <View style={styles.body}>
                    <FlatList
                        style={{ marginTop: 10, width: '100%', height: '100%' }}
                        data={this.state.msgs}
                        keyExtractor={listarmsgs => String(listarmsgs._id)}
                        renderItem={({ item }) => {
                            if (item.autor == this.state.idUsuario) {
                                return (
                                    <View style={{ alignItems: 'flex-end', marginBottom: 5 }}>
                                        <Text style={{ fontSize: 18, marginRight: 10, backgroundColor: '#01579b', borderRadius: 10, color: '#fff', padding: 9.5 }}> {item.msg} </Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={{ alignItems: 'flex-start', marginBottom: 5 }}>
                                        <Text style={{ fontSize: 18, marginLeft: 10, backgroundColor: '#0288d1', borderRadius: 10, color: '#fff', padding: 9.5 }}>
                                            {item.msg}
                                        </Text>
                                    </View>
                                );
                            }
                        }}
                    />
                </View>

                <Text> {this.state.ncontador} </Text>

                <View style={styles.bottom}>
                    <View style={styles.input}>

                        <TextInput
                            style={{
                                width: '88%',
                                marginLeft: 15,
                                marginRight: -17
                            }}
                            placeholder="Digite uma mensagem"
                            value={this.state.msg}
                            onChangeText={(msg) => this.setState({ msg })}
                        />
                        <TouchableOpacity
                            onPress={this.sendMsg}
                        >
                            <Icon
                                name="send"
                                color="#fafafa"
                                size={25}
                                style={{
                                    backgroundColor: '#4a148c',
                                    borderRadius: 90,
                                    padding: 10,
                                }}
                            />

                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        );
    }
}