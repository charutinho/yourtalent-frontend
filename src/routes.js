import {
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

//Telas

//Telas do usuário não logad
import Splash from './pages/Splash';
import Login from './pages/Login';

//Cadastro
import CadUsuario from './pages/CadUsuario';
import CadEscolha from './pages/CadEscolha';
import CadAtleta from './pages/CadAtleta';
import CadAtleta2 from './pages/CadAtleta2';


//Telas do usuário logado
import PageFeed from './pages/Feed';
import Perfil from './pages/Perfil';
import PerfilOpcoes from './pages/PerfilOpcoes';

const Routes = (userLogged = false) => createAppContainer(
    createSwitchNavigator(
        {
            NaoLogado: createStackNavigator(
                {
                    Splash: Splash,
                    Login: Login,
                    CadUsuario: CadUsuario,
                    CadEscolha: CadEscolha,
                    CadAtleta: CadAtleta,
                    CadAtleta2: CadAtleta2
                }
            ),
            Logado: createMaterialBottomTabNavigator(
                {
                    Feed: createStackNavigator({
                        Feed: {
                            screen: PageFeed,
                            navigationOptions: {
                                headerTitleStyle: {
                                    textAlign: 'center',
                                    flex: 1
                                },
                                headerTitle: 'YourTalent',
                                tabBarLabel: 'Feed',
                            }
                        },
                        //PerfilAtleta
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
                        PerfilOpcoes: PerfilOpcoes
                    })
                },
                {
                    tabBarOptions: {
                        activeTintColor: '#212121',
                        activeBackgroundColor: '#f5f5f5',
                        inactiveBackgroundColor: '#f5f5f5',
                        labelStyle: { fontWeight: 'bold' },
                        showIcon: true,
                        animationEnabled: true,
                        swipeEnabled: true
                    },
                },
            )
        },
        {
            initialRouteName: userLogged ? 'Logado' : 'NaoLogado',
        },
    )
)

export default Routes;
