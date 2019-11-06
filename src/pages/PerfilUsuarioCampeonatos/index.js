import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Divider,
    List
} from 'react-native-paper';

export default class PerfilUsuarioCampeonatos extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    getCampeonatos = async () => {
        const { navigation } = this.props;
        const ip = await AsyncStorage.getItem('@Ip:ip');
        var idUser = navigation.getParam('idUsuario');
        console.log('==== ', idUser);
        console.log(navigation.getParam('idUsuario'))
        await fetch(`http://${ip}:3000/camp/getcampeonatos/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == 'Nenhum campeonato encontrado') {
                    this.setState({
                        statusCamp: 0,
                        nenhumCamp: true
                    })
                } else {
                    const camp = responseJson.camp;
                    this.setState({
                        data: camp
                    })
                }
            });
    }

    async componentDidMount() {
        this.getCampeonatos.call();
    }

    render() {
        const { nenhumCamp } = this.state;
        return (
            <View style={{flex: 1}}>
                {nenhumCamp && (
                    <View style={{ flex: 1, widht: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{fontSize: 25, textAlign: 'center'}}>Usuário ainda não adicionou nenhum campeonato</Text>
                    </View>
                )}
                <FlatList
                    data={this.state.data}
                    keyExtractor={listarcamps => String(listarcamps._id)}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Divider />
                                <List.Item
                                    title={item.nomeCamp}
                                    description={`Colocação: ${item.colocacao}°  -  ${item.data}`}
                                    left={props =>

                                        <Icon
                                            style={{
                                                padding: 15
                                            }}
                                            name="trophy"
                                            color="#212121"
                                            size={20}
                                        />
                                    }
                                />
                                <Divider />
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}
