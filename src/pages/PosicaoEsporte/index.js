import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Image,
    Picker,

} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class PosicaoEsporte extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            esporte: '',
        }
    }

    async componentDidMount() {
        const esporte = await AsyncStorage.getItem('EsporteCad');
        this.setState({
            esporte: esporte
        });

    }




    render() {

        /*telaFutebol*/

        if (this.state.esporte === "Futebol") {
            return (
                <ImageBackground
                    source={require('../../assets/img/bk9.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}>
                    <View style={styles.container}>

                        
                    <StatusBar
                            barStyle="dark-content"
                            translucent
                            backgroundColor="transparent"
                        />

                        <View style={styles.header}>

                            <View style={styles.logoFormat}>
                                <Image style={styles.gifPosition} source={require('../../assets/img/futebol.gif')}

                                ></Image>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View>

                                <Text style={styles.titleSport}>Qual sua principal posição em jogo?</Text>
                                <View style={styles.styleSelect}>
                                    <Picker
                                        style={styles.selectFormat}
                                        selectedValue={this.state.PickerValue}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                    >
                                        <Picker.Item label="Goleiro" value="goleiro" />
                                        <Picker.Item label="Lateral Direito" value="lateralD" />
                                        <Picker.Item label="Lateral Esquerdo " value="lateralE" />
                                        <Picker.Item label="Zagueiro" value="zagueiro" />
                                        <Picker.Item label="Meia" value="meia" />
                                        <Picker.Item label="Volante" value="volante" />
                                        <Picker.Item label="Ponta" value="ponta" />
                                        <Picker.Item label="Centro-avante" value="centroAvante" />
                                        <Picker.Item label="Atacante " value="atacante " />
                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                                    <Text style={styles.textBotaoLogin}>
                                        Continuar
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </ImageBackground>
            );
        }


        /*tela CSGO*/

        if (this.state.esporte == "CS:GO") {
            return (
                <ImageBackground
                    source={require('../../assets/img/bk9.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}>
                    <View style={styles.container}>

                        <StatusBar
                            barStyle="dark-content"
                            translucent
                            backgroundColor="transparent"
                        />

                        <View style={styles.header}>

                            <View style={styles.logoFormat}>
                                <Image style={styles.gifPositionCSGO} source={require('../../assets/img/coldGif.gif')}

                                ></Image>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View>

                                <Text style={styles.titleSport}>Qual sua principal posição em jogo?</Text>
                                <View style={styles.styleSelect}>
                                    <Picker
                                        style={styles.selectFormat}
                                        selectedValue={this.state.PickerValue}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                    >
                                        <Picker.Item label="Lurker" value="lurker" />
                                        <Picker.Item label="Fragger" value="fragger" />
                                        <Picker.Item label="Entry Fragger" value="entryFragger" />
                                        <Picker.Item label="Capitão" value="capitao" />
                                        <Picker.Item label="AWPer" value="awper" />
                                        <Picker.Item label="Support" value="suport" />


                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                                    <Text style={styles.textBotaoLogin}>
                                        Continuar
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </ImageBackground>
            );
        }


        /*tela LOL*/

        if (this.state.esporte == "LoL") {
            return (
                <ImageBackground
                    source={require('../../assets/img/bk9.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}>
                    <View style={styles.container}>

                      
                    <StatusBar
                            barStyle="dark-content"
                            translucent
                            backgroundColor="transparent"
                        />

                        <View style={styles.header}>

                            <View style={styles.logoFormat}>
                                <Image style={styles.gifPositionCSGO} source={require('../../assets/img/giphy.webp')}

                                ></Image>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View>

                                <Text style={styles.titleSport}>Qual sua principal posição em jogo?</Text>
                                <View style={styles.styleSelect}>
                                    <Picker
                                        style={styles.selectFormat}
                                        selectedValue={this.state.PickerValue}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                    >
                                        <Picker.Item label="Topo" value="topo" />
                                        <Picker.Item label="Meio" value="meio" />
                                        <Picker.Item label="Atirador" value="atirador" />
                                        <Picker.Item label="Suporte" value="suporte" />
                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                                    <Text style={styles.textBotaoLogin}>
                                        Continuar
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </ImageBackground>
            );
        }

        /*tela Basquete*/

        if (this.state.esporte === "Basquete") {
            return (
                <ImageBackground
                    source={require('../../assets/img/bk9.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}>
                    <View style={styles.container}>

                       
                    <StatusBar
                            barStyle="dark-content"
                            translucent
                            backgroundColor="transparent"
                        />

                        <View style={styles.header}>

                            <View style={styles.logoFormat}>
                                <Image style={styles.gifPositionCSGO} source={require('../../assets/img/basquete.gif')}

                                ></Image>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View>

                                <Text style={styles.titleSport}>Qual sua principal posição em jogo?</Text>
                                <View style={styles.styleSelect}>
                                    <Picker
                                        style={styles.selectFormat}
                                        selectedValue={this.state.PickerValue}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
                                    >
                                        <Picker.Item label="Armador Principal" value="armadorPrincipal" />
                                        <Picker.Item label="Escolta" value="escolta" />
                                        <Picker.Item label="Lateral" value="lateral" />
                                        <Picker.Item label="Líbero" value="libero" />
                                        <Picker.Item label="Pivo " value="pivo" />
                                        <Picker.Item label="AWPer" value="awper" />
                                        <Picker.Item label="Support" value="suport" />


                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.botaoLogin} onPress={this.handleRegistro}>
                                    <Text style={styles.textBotaoLogin}>
                                        Continuar
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </ImageBackground>
            );
        }

        return (
            <View><Text>{this.state.esporte}</Text></View>
        );
    }
}

