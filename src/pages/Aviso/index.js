import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert,
    Modal,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';

import styles from './styles';

export default class Aviso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalTermos: false
        }
    }
    async componentDidUpdate() {
        if (this.state.pagamentoState.title == 'sucesso') {
            Alert.alert('Sucesso', `Seu pagamento foi aprovado com sucesso!`);
            this.setState({ pagamentoState: undefined })
            this.concluirCad.call();
        }
        if (this.state.pagamentoState.title == 'pendente') {
            Alert.alert('Pendente', `Seu pagamento está sendo processado`)
        }
        if (this.state.pagamentoState.title == 'falha') {
            Alert.alert('Pagamento não aprovado!', 'Verifique os dados e tente novamente')
        }
    }

    concluirCad = async () => {
        ip = await AsyncStorage.getItem('@Ip:ip');

        var nome = await AsyncStorage.getItem('Nome')
        var nasc = await AsyncStorage.getItem('Nasc');
        var sexo = await AsyncStorage.getItem('Sexo')
        var email = await AsyncStorage.getItem('Email')
        var senha = await AsyncStorage.getItem('Senha')
        var cep = await AsyncStorage.getItem('Cep');
        var estado = await AsyncStorage.getItem('Estado')
        var cidade = await AsyncStorage.getItem('Cidade')

        var tipo = await AsyncStorage.getItem('Olheiro')
        var empresa = await AsyncStorage.getItem('Marca')
        var tempo = await AsyncStorage.getItem('Temp')

        this.setState({ loading: true })
        await fetch(`https://yourtalent-backend.herokuapp.com//auth/register`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(
                    {
                        nome: nome,
                        nasc: nasc,
                        sexo: sexo,
                        email: email,
                        senha: senha,

                        desc: 'Conte-nos um pouco sobre você :)',

                        cep: cep,
                        estado: estado,
                        cidade: cidade,

                        nivel: 2,

                        tipo: tipo,
                        empresa: empresa,
                        tempo: tempo,

                        fotoPerfil: 'profilepicture.png',
                        fotoCapa: 'profilecapa.jpg'
                    })

            })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson);

                var id = responseJson.user._id;

                AsyncStorage.setItem('@Nome:nome', nome);
                AsyncStorage.setItem('@Login:id', id);

                this.props.navigation.navigate('CadEscolhaEsporte');


            }).catch((error) => {
                console.error(error);
            });
    }

    static navigationOptions = {
        header: null,
    }

    handleContinuar = () => {
        this.props.navigation.navigate('Pagamento');
    }

    async componentDidMount() {
        var email = await AsyncStorage.getItem('Email');
        this.setState({ email })
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
                        O uso do aplicativo para olheiros tem um custo de R$14.99 mensais.
                    </Text>

                    <Text style={styles.texto}>
                        Você pode cancelar sua assinatura a qualquer momento.
                    </Text>

                    <TouchableOpacity style={styles.botaoLogin} onPress={() => this.setState({ modalVisible: true })}>
                        <Text style={styles.textBotaoLogin}>
                            Continuar
                        </Text>
                    </TouchableOpacity>

                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}
                        style={{
                            width: '100%',
                            alignItems: 'flex-end',
                            padding: 10
                        }}
                    >
                        <Text style={{ fontSize: 25, fontStyle: 'bold' }}> X </Text>
                    </TouchableOpacity>
                    <WebView
                        source={{ uri: `https://yourtalent-backend.herokuapp.com/checkout/1/${this.state.email}` }}
                        style={{ flex: 1 }}
                        onNavigationStateChange={(pagamentoState) => this.setState({ pagamentoState })}
                        startInLoadingState={true}
                        renderLoading={() =>
                            <ActivityIndicator
                                color="#C00"
                                size="large"
                                color='#9c27b0'
                                style={{
                                    marginBottom: 100
                                }}
                            />}
                    />
                </Modal>

                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={this.state.modalTermos}
                    onRequestClose={() => this.setState({ modalTermos: false })}
                >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: '95%', marginTop: 10 }}>
                            <ScrollView>
                                <Text style={styles.termosTitle}>
                                    SEÇÃO 1 - O QUE FAREMOS COM ESTA INFORMAÇÃO?
                                </Text>
                                
                                    <Text style={styles.termosText}>
                                        Quando você realiza alguma transação com nossa loja, como parte do processo de compra e venda, coletamos as informações pessoais que você nos dá tais como: nome, e-mail e endereço.
                                        Quando você acessa nosso site, também recebemos automaticamente o protocolo de internet do seu computador, endereço de IP, a fim de obter informações que nos ajudam a aprender sobre seu navegador e sistema operacional.
                                        Email Marketing será realizado apenas caso você permita. Nestes emails você poderá receber notícia sobre nossa loja, novos produtos e outras atualizações.
                                    </Text>

                                    <Text style={styles.termosTitle}>
                                        SEÇÃO 2 - CONSENTIMENTO
                                    </Text>
                                    
                                    <Text style={styles.termosText}>
                                        Como vocês obtêm meu consentimento?
                                        Quando você fornece informações pessoais como nome, telefone e endereço, para completar: uma transação, verificar seu cartão de crédito, fazer um pedido, providenciar uma entrega ou retornar uma compra. Após a realização de ações entendemos que você está de acordo com a coleta de dados para serem utilizados pela nossa empresa.
                                        Se pedimos por suas informações pessoais por uma razão secundária, como marketing, vamos lhe pedir diretamente por seu consentimento, ou lhe fornecer a oportunidade de dizer não.
                                        E caso você queira retirar seu consentimento, como proceder?
                                        Se após você nos fornecer seus dados, você mudar de ideia, você pode retirar o seu consentimento para que possamos entrar em contato, para a coleção de dados contínua, uso ou divulgação de suas informações, a qualquer momento, entrando em contato conosco em lucas.almeida295@etec.sp.gov.br ou nos enviando uma correspondência em: YourTalent www.YourTalentAPP.com
                                    </Text>

                                    <Text style={styles.termosTitle}>
                                        SEÇÃO 3 - DIVULGAÇÃO
                                    </Text>
                            
                                    <Text style={styles.termosText}>
                                        Podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.
                                    </Text>

                                    <Text style={styles.termosTitle}>
                                        SEÇÃO 4 - SERVIÇOS DE TERCEIROS
                                    </Text>

                                    <Text style={styles.termosText}>
                                        No geral, os fornecedores terceirizados usados por nós irão apenas coletar, usar e divulgar suas informações na medida do necessário para permitir que eles realizem os serviços que eles nos fornecem.
                                        Entretanto, certos fornecedores de serviços terceirizados, tais como gateways de pagamento e outros processadores de transação de pagamento, têm suas próprias políticas de privacidade com respeito à informação que somos obrigados a fornecer para eles de suas transações relacionadas com compras.
                                        Para esses fornecedores, recomendamos que você leia suas políticas de privacidade para que você possa entender a maneira na qual suas informações pessoais serão usadas por esses fornecedores.
                                        Em particular, lembre-se que certos fornecedores podem ser localizados em ou possuir instalações que são localizadas em jurisdições diferentes que você ou nós. Assim, se você quer continuar com uma transação que envolve os serviços de um fornecedor de serviço terceirizado, então suas informações podem tornar-se sujeitas às leis da(s) jurisdição(ões) nas quais o fornecedor de serviço ou suas instalações estão localizados.
                                        Como um exemplo, se você está localizado no Canadá e sua transação é processada por um gateway de pagamento localizado nos Estados Unidos, então suas informações pessoais usadas para completar aquela transação podem estar sujeitas a divulgação sob a legislação dos Estados Unidos, incluindo o Ato Patriota.
                                        Uma vez que você deixe o site da nossa loja ou seja redirecionado para um aplicativo ou site de terceiros, você não será mais regido por essa Política de Privacidade ou pelos Termos de Serviço do nosso site.
                                        Links
                                        Quando você clica em links na nossa loja, eles podem lhe direcionar para fora do nosso site. Não somos responsáveis pelas práticas de privacidade de outros sites e lhe incentivamos a ler as declarações de privacidade deles.
                                    </Text>
                                    
                                    <Text style={styles.termosTitle}>
                                        SEÇÃO 5 - SEGURANÇA
                                    </Text>

                                    <Text style={styles.termosText}>
                                        Para proteger suas informações pessoais, tomamos precauções razoáveis e seguimos as melhores práticas da indústria para nos certificar que elas não serão perdidas inadequadamente, usurpadas, acessadas, divulgadas, alteradas ou destruídas.
                                        Se você nos fornecer as suas informações de cartão de crédito, essa informação é criptografada usando tecnologia "secure socket layer" (SSL) e armazenada com uma criptografia AES-256. Embora nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro, nós seguimos todos os requisitos da PCI-DSS e implementamos padrões adicionais geralmente aceitos pela indústria.
                                    </Text>
                                    
                                    <Text style={styles.termosTitle}>
                                        SEÇÃO 6 - ALTERAÇÕES PARA ESSA POLÍTICA DE PRIVACIDADE
                                    </Text>
        
                                    <Text style={styles.termosText}>
                                        Reservamos o direito de modificar essa política de privacidade a qualquer momento, então por favor, revise-a com frequência. Alterações e esclarecimentos vão surtir efeito imediatamente após sua publicação no site. Se fizermos alterações de materiais para essa política, iremos notificá-lo aqui que eles foram atualizados, para que você tenha ciência sobre quais informações coletamos, como as usamos, e sob que circunstâncias, se alguma, usamos e/ou divulgamos elas.
                                        Se nossa loja for adquirida ou fundida com outra empresa, suas informações podem ser transferidas para os novos proprietários para que possamos continuar a vender produtos para você.
                                    </Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>


                <TouchableOpacity style={styles.bottom}
                    onPress={() => this.setState({ modalTermos: true })}
                >
                    <Text style={styles.bottomText}>
                        Termos de uso
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}
