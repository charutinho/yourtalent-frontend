import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        flex: 2,
        alignItems: 'flex-start',
        width: '100%',
        borderWidth: 2,
        borderColor: '#123'
    },
    title: {
        padding: 20,
        fontSize: 30
    },
    body: {
        flex: 5,
        alignItems: 'center',
        width: '100%',
        borderWidth: 2,
        borderColor: '#321'
    },
    campoForm:{
        width: '80%'
    },

    //form
    bodyList:{
        width: '90%',
        marginTop: 15,
        alignItems: 'center'
    },
    bodyListItem:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '10%'
    },

    //input
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

    //botao
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



});

export default styles;
