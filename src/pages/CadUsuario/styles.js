import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    body: {
        marginTop: 30,
        flex: 9,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',

    },
    title: {
        paddingTop: 60,
        fontSize: 23,
    },
    formArea: {
        width: '100%',
        alignItems: 'center',
    },
    textInputForm: {
        width: '80%',
        marginTop: 10,
        height: 60,
    },
    inputSexo: {
        width: '80%',
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
});

export default styles;