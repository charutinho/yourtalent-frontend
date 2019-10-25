import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Alert
} from 'react-native';
import styles from './styles';

export default class CadEscolhaEsporte extends Component {
    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />


                <TouchableOpacity
                    style={styles.containerL}
                    onPress={() => {
                        this.props.navigation.navigate('Categorias', {
                            esporte: 'Esporte'
                        });
                    }}>

                    <ImageBackground
                        source={require('../../assets/img/bkEsporte.png')}
                        style={{ width: '100%', height: '100%' }}
                    />

                    <Text style={styles.titleOpcao}>
                        Esporte
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.containerL}
                    onPress={() => {
                        this.props.navigation.navigate('Categorias', {
                            esporte: 'eSport'
                        });
                    }}>

                    <ImageBackground
                        source={require('../../assets/img/bkEsport.png')}
                        style={{ width: '100%', height: '100%' }}
                    />
                    <Text style={styles.titleOpcao}>
                        eSport
                    </Text>
                </TouchableOpacity>

                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        Você deseja ver...
                    </Text>
                </View>


            </View>
        );
    }
}