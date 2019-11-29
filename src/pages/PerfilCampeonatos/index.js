import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {
    List,
    Divider
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                Aqui você pode listar todos seu campeonatos disputados
            </Text>
        </View>
    );
}

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class PerfilCampeonatos extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Fala ai campeão',
            headerRight: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('NovoCampeonato')}
                >
                    <Image
                        source={require('../../assets/icons/trophy.png')}
                        style={{
                            width: 50,
                            height: 50
                        }}
                    />

                </TouchableOpacity >
            )
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            statusCamp: 1,
            novocamp: 0
        }
    }

    getCampeonatos = async () => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        const idUser = await AsyncStorage.getItem('@Login:id')
        await fetch(`https://yourtalent-backend.herokuapp.com/camp/getcampeonatos/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == 'Nenhum campeonato encontrado') {
                    this.setState({
                        statusCamp: 0
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

    async componentDidUpdate() {
        this.getCampeonatos.call();
    }

    handleDeletar = async (id) => {
        const ip = await AsyncStorage.getItem('@Ip:ip');
        await fetch(`https://yourtalent-backend.herokuapp.com/camp/delcampeonato/${id}`);
        this.getCampeonatos.call();
    }

    handleNovoCamp = async () => {
        this.props.navigation.navigate('NovoCampeonato');
    }

    render() {
        if (this.state.statusCamp === 1) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor='transparent'
                    />

                    <Header />

                    <View style={styles.body}>
                        <View>

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
                                                right={props =>
                                                    <TouchableOpacity
                                                        style={{
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginRight: '2.5%'
                                                        }}
                                                        onPress={() => this.handleDeletar(item._id)}
                                                    >
                                                        <Icon
                                                            name="close"
                                                            color="#bf360c"
                                                            size={30}
                                                        />
                                                    </TouchableOpacity>
                                                }
                                            />
                                            <Divider />
                                        </View>
                                    );
                                }}
                            />


                        </View>

                    </View>

                </View>
            );
        }
        return (
            <View style={styles.container}>

                <Header />

                <View style={styles.bodyNovo}>
                    <Text style={styles.novoCampTitle}>
                        Nenhum campeonato registrado ainda
                    </Text>

                    <TouchableOpacity
                        onPress={this.handleNovoCamp}
                    >
                        <Image source={require('../../assets/icons/trophy.png')} style={{ width: 220, height: 220 }} />
                    </TouchableOpacity>
                </View>

            </View>
        );

    }
}
