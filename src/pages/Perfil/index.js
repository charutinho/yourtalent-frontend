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
import { ActivityIndicator } from 'react-native-paper';
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
                </TouchableOpacity>
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
            loading: false
        };
    }

    getPosts = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');

        await fetch(`https://yourtalent-backend.herokuapp.com/listarposts/user/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const post = responseJson.post;

                if (post == '') {
                    this.setState({
                        naoPost: true
                    })
                } else {
                    this.setState({
                        listData: post,
                        loading: false,
                        temPost: true
                    });
                }
            })
    }

    // Função de obter dados
    getDados = async () => {
        var idUser = await AsyncStorage.getItem('@Login:id');
        var ip = await AsyncStorage.getItem('@Ip:ip');

        this.setState({ loading: true })
        await fetch(`https://yourtalent-backend.herokuapp.com/data/${idUser}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Data')
                //Dados do usuário
                var nomeUsuario = responseJson.user.nome;
                var nasc = responseJson.user.nasc;
                var descricao = responseJson.user.desc;
                var posicao = responseJson.user.esportePosicao;
                //Foto
                var fotoUsuario = responseJson.user.fotoPerfil;
                var fotoCapa = responseJson.user.fotoCapa;

                //Localização
                var estado = responseJson.user.estado;
                var cidade = responseJson.user.cidade;

                //Nivel
                var nivel = responseJson.user.nivel;
                if (nivel == 1) {
                    this.setState({ isAtleta: true })
                }
                if (nivel == 2) {
                    this.setState({ isAtleta: false });
                    var tipo = responseJson.user.tipo;
                    if (tipo == 'Contratado') {
                        var empresa = responseJson.user.empresa;
                        this.setState({ empresa })
                    }
                    if (tipo == 'Freelancer') {
                        var empresa = responseJson.user.empresa;
                        this.setState({ empresa: 'Sem organização' })
                    }
                    var tempo = responseJson.user.tempo;
                    this.setState({ tempo })
                }
                if (nivel == 3) {
                    this.setState({ isAdm: true })
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
                var imgUser = `https://yourtalent-backend.herokuapp.com/${fotoUsuario}`;

                //Capa do usuário
                var capaUser = `https://yourtalent-backend.herokuapp.com/${fotoCapa}`;

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
                    posicao,
                    loading: false
                });
            })
    }

    async componentDidUpdate(prevProps) {
        const { navigation } = this.props;
        var att = (navigation.getParam('attPerf'));
        if (att == true) {
            await this.getDados();
            this.props.navigation.setParams({ attPerf: false })
        }

        if (prevProps.resource !== this.props.resource) {
            await this.getDados();
        }
    };

    async componentDidMount() {
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
                fetch(`https://yourtalent-backend.herokuapp.com/uploadimg`, config);
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
                fetch(`https://yourtalent-backend.herokuapp.com/uploadimgcapa`, config)
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
        const { temPost } = this.state;
        const { naoPost } = this.state;
        const { isAdm } = this.state;
        const { loading } = this.state;
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

                        {isAdm && (
                            <TouchableOpacity
                                style={{
                                    marginTop: '5%'
                                }}
                                onPress={() => this.props.navigation.navigate('PerfilAdm')}
                            >
                                <View style={styles.campView}>
                                    <Icon
                                        name="shield-key"
                                        color="#00c853"
                                        size={48}
                                    />
                                    <Text style={{ color: '#1b5e20' }}>Área de Administração</Text>
                                </View>
                            </TouchableOpacity>
                        )}

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
                                            <Image source={require('../../assets/icons/position.png')} style={{ width: 40, height: 40 }} />
                                            <Text>{this.state.posicao}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                {temPost && (
                                    <Text style={styles.destaqueTitulo}>
                                        Seus últimos posts
                                    </Text>
                                )}

                                {naoPost && (
                                    <Text style={styles.destaqueTitulo}>
                                        Você ainda não postou nada
                                    </Text>
                                )}
                            </View>
                        )}

                        {this.state.isAtleta == false && (
                            <View>
                                <View style={styles.sobreView}>
                                    <TouchableOpacity
                                        style={{
                                            marginLeft: '10%'
                                        }}
                                    >
                                        <View style={styles.campView}>
                                            <Icon
                                                name="briefcase"
                                                color="#000"
                                                size={45}
                                            />
                                            <Text> {this.state.empresa} </Text>
                                        </View>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => Alert.alert('Tempo de trabalho', `Este olheiro já trabalha há ${this.state.tempo} neste ramo`)}
                                        style={{
                                            marginRight: '10%'
                                        }}
                                    >
                                        <View style={styles.campView}>
                                            <Icon
                                                name="account-clock"
                                                color="#000"
                                                size={48}
                                            />
                                            <Text>{this.state.tempo}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {this.state.isAtleta == false && (
                            <View>
                                {temPost && (
                                    <Text style={styles.destaqueTitulo}>
                                        Seus últimos posts
                                    </Text>
                                )}

                                {naoPost && (
                                    <Text style={styles.destaqueTitulo}>
                                        Você ainda não postou nada
                                    </Text>
                                )}
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
                                                    source={{ uri: `https://yourtalent-backend.herokuapp.com/${item.autor.fotoPerfil}` }}
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

                                        <ConteudoFeed type={item.tipo} source={{ uri: `https://yourtalent-backend.herokuapp.com/${item.conteudoPost}` }} />
                                    </View>
                                );
                            }}
                        />

                    </View>
                    {loading && (
                        <ActivityIndicator
                            size="large"
                            color='#9c27b0'
                            style={{
                                position: 'absolute'
                            }}
                        />
                    )}
                </View>
            </ScrollView>

        )

    }

}
