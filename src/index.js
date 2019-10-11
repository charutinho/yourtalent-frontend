import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import createNavigator from './routes';

export default class App extends Component {
  state = {
    userLogged: false,
  };

  async componentDidMount() {
    const id = await AsyncStorage.getItem('@Login:id');

    this.setState({
      userLogged: !!id,
    });
  }

  render() {
    const { userLogged } = this.state;

    const Routes = createNavigator(userLogged);
    return (
        <Routes />
    );
  }
}
