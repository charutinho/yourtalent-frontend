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
        borderBottomLeftRadius: 150,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    loginText: {
        padding: 15,
        color: '#fff',
        fontSize: 20,
    },
    body: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    formArea: {
        width: '100%',
        alignItems: 'center',
        marginTop: '15%'
    },
    textInputFormEmail: {
        width: '80%',
        borderColor: '#9c27b0',
    },
    textInputFormSenha: {
        width: '80%',
        borderColor: '#9c27b0',
        marginTop: 15
    },
    botaoLogin: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9c27b0',
        borderRadius: 6,
        marginTop: 20,
        marginBottom: 20,
    },
    textBotaoLogin: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff'
    },
    titleCad: {
        fontSize: 17,
        textAlign: 'center',
        color: '#000',
    },
    titleCadRegitro:{
        fontSize: 17,
        marginLeft: 5,
        color: '#9c27b0'
    },
    containerCad: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: '100%',
        height: 45,
        justifyContent: 'center',
    },
});

export default styles;