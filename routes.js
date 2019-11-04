import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
import Chat from './pages/Chat';
import PerfilCampeonato from './pages/PerfilCampeonatos';
import NovoCampeonato from './pages/NovoCampeonato';

import PerfilUsuario from './pages/PerfilUsuario';

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
            Logado: createBottomTabNavigator(
                {
                    Feed: createStackNavigator({
                        Feed: {
                            screen: PageFeed,
                            navigationOptions: {
                                headerTitleStyle: {
                                    textAlign: 'center',
                                    flex: 1,
                                    marginLeft: '22%'
                                },
                                headerTitle: 'YourTalent',
                                tabBarLabel: 'Feed',
                            },
                        },
                        PerfilUsuario: PerfilUsuario,
                    }),

                    Perfil: createStackNavigator({
                        Perfil: {
                            screen: Perfil,
                            navigationOptions: {
                                headerTitleStyle: {
                                    textAlign: 'center',
                                    flex: 1,
                                    marginLeft: '22%'
                                },
                                headerTitle: 'Perfil',
                                tabBarLabel: 'Perfil',
                            }
                        },
                        PerfilOpcoes: PerfilOpcoes,
                        NovoCampeonato: NovoCampeonato,
                        PerfilCampeonato: PerfilCampeonato,
                    }),

                    Chat: createStackNavigator({
                        Chat: {
                            screen: Chat,
                            navigationOptions: {
                                headerTitleStyle: {
                                    textAlign: 'center',
                                    flex: 1,
                                },
                                headerTitle: 'Chat',
                                tabBarLabel: 'Chat',
                            }
                        },
                    }),
                },
                {
                    tabBarOptions: {
                        activeTintColor: '#212121',
                        activeBackgroundColor: '#f5f5f5',
                        inactiveBackgroundColor: '#f5f5f5',
                        labelStyle: { fontWeight: 'bold' },
                        showIcon: true,
                    },
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
