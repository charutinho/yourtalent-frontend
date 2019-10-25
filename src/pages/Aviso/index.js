import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native';

import styles from './styles';

export default class Aviso extends Component {
    static navigationOptions = {
        header: null,
    }

    handleContinuar = () => {
        this.props.navigation.navigate('Pagamento');
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent
                    backgroundColor='transparent'
                    barStyle='light-content'
                />



                <View style={styles.body}>
                    <Text style={styles.title}>
                        Aviso
                </Text>
                    <Text style={styles.texto}>
                        O uso do aplicativo é gratuito por 14 dias.
                </Text>

                    <Text style={styles.texto}>
                        Logo após o período de testes será cobrado R$14,99 mensais.
                </Text>

                    <Text style={styles.texto}>
                        Você pode cancelar sua assinatura a qualquer momento.
                </Text>

                    <TouchableOpacity style={styles.botaoLogin} onPress={this.handleContinuar}>
                        <Text style={styles.textBotaoLogin}>
                            Continuar
                            </Text>
                    </TouchableOpacity>

                </View>



                <TouchableOpacity style={styles.bottom}
                    onPress={() => Alert.alert("Termos de uso", "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")}
                >
                    <Text style={styles.bottomText}>
                        Termos de uso
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}
