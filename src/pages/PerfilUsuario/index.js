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
    Button,
    FlatList
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import ConteudoFeed from '../../components/ConteudoFeed';

export default class PerfilUsuario extends Component {
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
            capa: '../../assets/img/gatinho.jpg',
            listPost: ''
        };
    }



    getPosts = async () => {
        const { navigation } = this.props;
        var idUser = navigation.getParam('userId')
        var ip = await AsyncStorage.getItem('@Ip:ip');

        await fetch(`http://${ip}:3000/listarposts/user/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const post = responseJson.post;
                this.setState({
                    listPost: post
                })
            })
    }

    // Função de obter dados
    getDados = async () => {
        const { navigation } = this.props;
        var idUser = navigation.getParam('userId')
        var ip = await AsyncStorage.getItem('@Ip:ip');

        await fetch(`http://${ip}:3000/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {

                //Dados do usuário
                var nomeUsuario = responseJson.user.nome;
                var nasc = responseJson.user.nasc;
                var estado = responseJson.user.estado;
                var descricao = responseJson.user.desc;
                //Foto
                var fotoUsuario = responseJson.user.fotoPerfil;
                var fotoCapa = responseJson.user.fotoCapa;

                // Calculo idade
                var saveNasc = nasc;
                var nasc = nasc.split("/");
                var anoAtual = new Date();
                var ano = anoAtual.getFullYear();
                var idade = ano - nasc[2];

                //Icone
                var nivel = responseJson.user.nivel;

                if (nivel == 1) {
                    var nivelIcone = 'google-controller'
                } else {
                    var nivelIcone = 'account-tie'
                }

                //Esporte x Tipo
                var esporte = responseJson.user.esporte;

                if (esporte == undefined) {
                    var esporte = responseJson.user.tipo;
                }


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
                    descricao: descricao,
                    nivel: nivel,
                    nivelIcon: nivelIcone
                });

            }).catch((error) => {
                console.error(error);
            });

    }

    async componentDidUpdate() {
        this.getDados.call();
    }

    async componentDidMount() {
        this.getDados.call();
        this.getPosts.call();
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
                            </ImageBackground>

                        </View>

                        <View style={styles.fotoPerfilView}>

                            <View style={styles.fotoPerfil}>
                                <ImageBackground
                                    source={{ uri: `${this.state.foto}` }}
                                    style={styles.fotoUsuario}
                                />
                            </View>
                        </View>

                    </View>

                    <View style={styles.body}>

                        <View style={styles.nomeView}>
                            <Text style={styles.nome}>
                                {this.state.nomeUsuario}
                            </Text>
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
                                        name={this.state.nivelIcon}
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

                        <Text style={styles.destaqueTitulo}>
                            Últimos posts de {this.state.nomeUsuario}
                        </Text>

                        <FlatList
                            style={{
                                width: '100%',
                                marginBottom: 20,
                                marginTop: 30
                            }}
                            data={this.state.listPost}
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


                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        marginLeft: 10,
                                                    }}
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
                </View>
            </ScrollView>

        )

    }

}
