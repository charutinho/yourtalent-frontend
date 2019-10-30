import {
    StyleSheet,
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
        flexDirection: 'column',
        marginLeft: "-30%",
        
    },
    body: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginTop:90,
        
    },
    campoForm: {
        color: '#000',
        height: 45,
        width: 300,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
    },
    campoForm2: {
        color: '#000',
        height: 45,
        width: 300,
        fontSize: 18,
        marginTop: 5,
    },
    textFormInput: {
        fontSize: 18,
        color: '#000',
        marginTop: 10,
        marginLeft: 8,
        flexDirection: 'row',
    },
    radioText: {
        fontSize: 18,
        color: '#000'
    },
    radioOpcao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        zIndex: 100,
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
        backgroundColor: '#8e24aa',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textBotaoLogin: {
        fontWeight: 'bold',
        fontSize: 21,
        color: '#fff',
    }
});

export default styles;