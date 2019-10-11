import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212121'
    },
    header: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
    },
    campoForm: {
        color: '#fff',
        height: 45,
        width: 300,
        fontSize: 18,
        marginTop: 10,
        marginBottom:10,
    },
    campoForm2: {
        color: '#fff',
        height: 45,
        width: 300,
        fontSize: 18,
        marginTop: 5,
    },
    textFormInput: {
        fontSize: 18,
        color: '#fff',
        marginTop: 10,
        marginLeft: 8,
        flexDirection: 'row',
    },
    radioText:{
        fontSize: 18,
        color: '#fff'
    },
    radioOpcao:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        zIndex: 100
    },
    campoFormInput: {
        flexDirection: 'row',
        height: 45,
        width: 300,
        fontSize: 18,
        marginLeft: -5
    },
    botaoLogin: {
        width: 300,
        height: 50,
        backgroundColor: 'rgba(000, 000,000, 0.8)',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textBotaoLogin: {
        fontWeight: 'bold',
        fontSize: 21,
        color: '#fff',
    },

});

export default styles;