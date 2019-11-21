import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {
    View,
    Image
} from 'react-native';

//Telas

//Telas do usuário não logad
import Splash from './pages/Splash';
import Login from './pages/Login';

//Cadastro
import CadUsuario from './pages/CadUsuario';
import CadEscolha from './pages/CadEscolha';
import CadCep from './pages/CadCep';

//Cad Atleta
import CadAtleta2 from './pages/CadAtleta2';
import PosicaoEsporte from './pages/PosicaoEsporte';

//CadOlheiro
import CadOlheiro from './pages/CadOlheiro';

//Aviso e pagamento
import Aviso from './pages/Aviso';
import Pagamento from './pages/Pagamento';

//Telas do usuário logado
import CadEscolhaEsporte from './pages/EscolherCategoria';
import Categorias from './pages/EscolherCategoriaBanco';
import PageFeed from './pages/Feed';
import Perfil from './pages/Perfil';
import PerfilOpcoes from './pages/PerfilOpcoes';
import PerfilOpcoesSenha from './pages/PerfilOpcoesSenha';
import Chat from './pages/Chat';
import ChatUsuario from './pages/ChatUsuario';
import PerfilCampeonato from './pages/PerfilCampeonatos';
import NovoCampeonato from './pages/NovoCampeonato';
import PerfilUsuario from './pages/PerfilUsuario';
import PerfilUsuarioCampeonatos from './pages/PerfilUsuarioCampeonatos';
import PerfilOpcoesSeguro from './pages/PerfilOpcoesSeguro';

//Ademiro
import PerfilAdm from './pages/PerfilAdm';

//Logo
import logoBranco from './assets/img/logoBrancoPNG.png';

const PaginaFeed = createStackNavigator({
    Feed: {
        screen: PageFeed,
        navigationOptions: {
            title: 'YourTalent',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontFamily: 'LemonJelly',
                fontSize: 50,
                marginBottom: 15
            },
            headerLeft: (
                <Image source={logoBranco} style={{ width: 65, height: 65 }} />
            )
        },
        headerLeft: () => {
            <Image source={require('./assets/img/logoBrancoPNG.png')}
                style={{
                    width: 50,
                    height: 50
                }}
            />
        }
    },
    PerfilUsuario: {
        screen: PerfilUsuario,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
        }
    },
    PerfilUsuarioCampeonatos: {
        screen: PerfilUsuarioCampeonatos,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
        }
    }
});

PaginaFeed.navigationOptions = {
    tabBarLabel: 'Feed',
    tabBarColor: '#7b1fa2',
    tabBarIcon: ({ }) => {
        return <Icon name={'home'} size={25} color={'#fff'} />;
    }
}

const PaginaPerfil = createStackNavigator({
    Perfil: {
        screen: Perfil,
        navigationOptions: {
            title: 'Perfil',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontSize: 20,
                marginLeft: "-70%",
                marginTop: 4,
            },
        },
    },
    PerfilOpcoes,
    PerfilCampeonato,
    NovoCampeonato: {
        screen: NovoCampeonato,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
        }
    },
    PerfilOpcoesSenha: {
        screen: PerfilOpcoesSenha,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
        }
    },
    PerfilOpcoesSeguro: {
        screen: PerfilOpcoesSeguro,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
        }
    },

    PerfilAdm: {
        screen: PerfilAdm,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
        }
    },
});

PaginaPerfil.navigationOptions = {
    tabBarLabel: 'Perfil',
    tabBarColor: '#6a1b9a',
    tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name={'account'} size={25} color={'#fff'} />;
    },
}

const PaginaChat = createStackNavigator({
    Chat: {
        screen: Chat,
        navigationOptions: {
            title: 'YourTalent',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontFamily: 'LemonJelly',
                fontSize: 50,
                marginBottom: 15
            },
            headerLeft: (
                <Image source={logoBranco} style={{ width: 65, height: 65 }} />
            )
        },
        headerLeft: () => {
            <Image source={require('./assets/img/logoBrancoPNG.png')}
                style={{
                    width: 50,
                    height: 50
                }}
            />
        }
    },
    ChatUsuario: {
        screen: ChatUsuario,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#6a1b9a', borderBottomColor: '#fff' },
        }
    },
});

PaginaChat.navigationOptions = {
    tabBarLabel: 'Chat',
    tabBarColor: '#4a148c',
    tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name={'chat'} size={25} color={'#fff'} />;
    },
}

const Routes = (userLogged = false) => createAppContainer(
    createSwitchNavigator(
        {
            NaoLogado: createStackNavigator(
                {
                    Splash,
                    Login,
                    CadUsuario,
                    CadEscolha,
                    CadAtleta2,
                    CadCep,
                    Aviso,
                    CadOlheiro,
                    Pagamento,
                    PosicaoEsporte,
                }
            ),
            Logado: createMaterialBottomTabNavigator(
                {
                    PaginaFeed,
                    PaginaPerfil,
                    PaginaChat
                },
                {
                    initialRouteName: "PaginaFeed",
                    activeColor: '#f0edf6',
                    inactiveColor: '#226557',
                    shifting: true,
                },
            ),
            Categoria: createSwitchNavigator(
                {
                    Categorias,
                    CadEscolhaEsporte,
                }
            ),
        },
        {
            initialRouteName: userLogged ? 'Logado' : 'NaoLogado',
        },
    )
)

export default Routes;
