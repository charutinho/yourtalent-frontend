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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 5,
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
    textInputFormSenha: {
        width: '80%',
        borderColor: '#9c27b0',
        marginTop: 15,
        height:65,
    },
    passwordContainer: {
        flexDirection: 'row',
        paddingBottom: 30,
        flex: 1,
      },
      iconFormat:{
        paddingLeft:"60%",
        paddingTop:3,
    },
    botaoLogin: {
        width: '80%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9c27b0',
        borderRadius: 6,
        marginTop: 30,
    },
    textBotaoLogin: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },
});

export default styles;