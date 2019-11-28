import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212121',
    },
    body: {
        width: '90%',
        flex: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50,
        color: '#9c27b0',
        marginBottom: 20
    },
    texto: {
        fontSize: 20,
        textAlign: 'center',
        color: '#f5f5f5',
        marginBottom: 5
    },
    botaoLogin: {
        width: '80%',
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
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '88%'
    },
    bottomText: {
        color: '#fafafa'
    },
    termosTitle: {
        fontWeight: 'bold',
        marginTop: '2%',
        marginBottom: '2%',
        fontSize: 15
    },
    termosText: {
        textAlign: 'justify'
    }
});

export default styles;
