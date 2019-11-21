import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

export default class PerfilAdm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Só pra deixar a área bonita usando grid
            opcoes: [
                { id: 1, nome: 'Usuários', icon: 'account-alert', iconcolor: '#b71c1c' },
                { id: 2, nome: 'Posts', icon: 'newspaper', iconcolor: '#b71c1c' },
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.head}>
                    <Text style={styles.headTitle}>
                        Página de Administração
                    </Text>
                    <Icon
                        name='account-tie'
                        size={40}
                        color='#6a1b9a'
                    />
                </View>

                <View style={styles.body}>

                    <FlatList
                        style={styles.flatlistItem}
                        data={this.state.opcoes}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.item}>
                                    <Text style={styles.itemText}>{item.nome}</Text>
                                    <Icon
                                        name={item.icon}
                                        size={30}
                                        color={item.iconcolor}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

            </View>
        )
    }
}
