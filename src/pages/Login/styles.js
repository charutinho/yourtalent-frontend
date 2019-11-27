import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 3,
        width: '100%',
        backgroundColor: '#9c27b0',
        borderBottomLeftRadius: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    logo: {
        width: 180,
        height: 180
    },
    formulario: {
        width: '100%',
        marginTop: '10%',
        alignItems: 'center',
    },
    inputEmail: {
        width: '88%',
        marginBottom: '5%'
    },
    inputSenha: {
        width: '88%',
    },
    olho: {
        marginTop: '-10.98%',
        marginRight: '-74%',
        zIndex: 1
    },
    esqueceuView: {
        marginTop: '7%',
        width: '88%',
        alignItems: 'flex-end',
        marginBottom: '10%'
    },
    botaoLogin: {
        width: '88%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9c27b0',
        borderRadius: 6,
    },
    loginText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: "Roboto-Bold",
        fontSize: 22,
    },
    novaconta: {
        flexDirection: 'row',
        marginBottom: 14
    },
    novacontaText: {
        fontSize: 18
    },
    novacontaRegistro: {
        fontSize: 18,
        color: '#9c27b0'
    },
    modalFundo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalDentro: {
        width: '95%',
        backgroundColor: '#fafafa',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        justifyContent: 'flex-start'
    }
});

export default styles;
