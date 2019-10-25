import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    head: {
        flex: 1.5,
        width: '80%',
        justifyContent: 'center',
    },
    title: {
        fontSize: 34
    },
    body: {
        flex: 5,
        width: '100%',
        alignItems: 'center'
    },
    formulario: {
        width: '80%',
    },
    card: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    campo: {
        width: '48.8%'
    },
    botaoLogin: {
        width: '100%',
        backgroundColor: '#9c27b0',
        height: 55,
        borderRadius: 10,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBotaoLogin: {
        fontSize: 20,
        color: '#fff'
    },

    FisicoJuridico: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    radioText: {
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15,
    },
    textFormInput: {
        fontSize: 18,
        marginRight: 15
    },
    radioOpcao: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default styles;
