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
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import ConteudoFeed from '../../components/ConteudoFeed';

export default class Perfil extends Component {

    //Navbar
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('PerfilOpcoes')}
                >
                    <Icon
                        name="settings"
                        color="#fff"
                        size={30}
                        style={{
                            marginRight: 10
                        }}
                    />

                </TouchableOpacity >
            )
        };

    };

    //Dados Usuário
    constructor(props) {
        super(props);
        this.state = {
            atualizou: 0,
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
            listPost: '',
            isAtleta: true
        };
    }



    getPosts = async () => {
        console.log('Get posts');
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');

        await fetch(`http://${ip}:3000/listarposts/user/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const post = responseJson.post;

                this.setState({
                    listData: post,
                    loading: false
                });
            })
    }

    // Função de obter dados
    getDados = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');

        await fetch(`http://${ip}:3000/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {

                //Dados do usuário
                var nomeUsuario = responseJson.user.nome;
                var nasc = responseJson.user.nasc;
                var descricao = responseJson.user.desc;
                //Foto
                var fotoUsuario = responseJson.user.fotoPerfil;
                var fotoCapa = responseJson.user.fotoCapa;

                //Localização
                var estado = responseJson.user.estado;
                var cidade = responseJson.user.cidade;

                //Nivel
                var nivel = responseJson.user.nivel;
                if (nivel == 2) {
                    this.setState({ isAtleta: false })
                }

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
                    cidade: cidade,
                    descricao: descricao,
                    nivel: nivel,
                    nivelIcon: nivelIcone,
                });
            })
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.resource !== this.props.resource) {
            await this.getDados();
        }
    };

    async componentDidMount() {
        console.log('Did Mount');
        this.getDados.call();
        this.getPosts.call();
    }

    //Upload image
    handleUploadImage = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
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

                        idUser: idUser
                    },
                };
                this.getDados();
                this.getPosts();
                fetch(`http://${ip}:3000/uploadimg`, config);
                this.setState({ atualizou: 1 })
            }
        });

    }

    handleUploadImageCapa = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
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

                        idUser: idUser
                    },
                };
                this.getDados();
                fetch(`http://${ip}:3000/uploadimgcapa`, config)
                this.setState({ atualizou: 1 })
            }
        });
    }

    verIdade = async () => {
        Alert.alert("Data de nascimento", this.state.nasc);
    }

    verCidade = async () => {
        Alert.alert("Localização", `Estado: ${this.state.estado}\nCidade: ${this.state.cidade}`);
    }

    render() {
        const { navigate } = this.props.navigation;
        const { isAtleta } = this.state;
        return (
            <ScrollView style={{
                backgroundColor: '#fafafa',
            }}>
                <View style={styles.container}>

                    <StatusBar
                        barStyle='light-content'
                        backgroundColor="#572078"
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

                                <TouchableOpacity
                                    onPress={this.handleUploadImageCapa}
                                >
                                    <Icon
                                        name="image-plus"
                                        color="#212121"
                                        size={20}
                                        style={{
                                            backgroundColor: '#eeeeee',
                                            borderRadius: 90,
                                            marginRight: 10,
                                            marginTop: 10,
                                            padding: 5,
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.30,
                                            shadowRadius: 4.65,

                                            elevation: 8,
                                        }}
                                    />

                                </TouchableOpacity>

                            </ImageBackground>



                        </View>

                        <View style={styles.fotoPerfilView}>

                            <View style={styles.fotoPerfil}>
                                <ImageBackground
                                    source={{ uri: `${this.state.foto}` }}
                                    style={styles.fotoUsuario}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={this.handleUploadImage}
                            >
                                <Icon
                                    name="image-plus"
                                    color="#212121"
                                    size={20}
                                    style={{
                                        backgroundColor: '#eeeeee',
                                        borderRadius: 90,
                                        marginRight: 10,
                                        marginTop: 10,
                                        padding: 5,
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.30,
                                        shadowRadius: 4.65,

                                        elevation: 8,
                                    }}
                                />
                            </TouchableOpacity>

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

                            <TouchableOpacity onPress={this.verCidade}>
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
                        {isAtleta && (
                            <View>
                                <View style={styles.sobreView}>

                                    <TouchableOpacity
                                        onPress={() => navigate('PerfilCampeonato')}
                                        style={{
                                            marginLeft: '10%'
                                        }}
                                    >

                                        <View style={styles.campView}>
                                            <Icon
                                                name="trophy"
                                                color="#000"
                                                size={48}
                                            />
                                            <Text>Campeonatos</Text>
                                        </View>

                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={{
                                            marginRight: '10%'
                                        }}
                                    >
                                        <View style={styles.campView}>
                                            <Icon
                                                name="check"
                                                color="#000"
                                                size={48}
                                            />
                                            <Text>{this.state.estado}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                <Text style={styles.destaqueTitulo}>
                                    Seus últimos posts
</Text>
                            </View>
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
