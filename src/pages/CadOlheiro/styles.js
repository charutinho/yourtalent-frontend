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
      
    },
    title: {
        padding: 20,
        fontSize: 30,
        color:"#fff",
        marginLeft:"25%",
        marginTop:"15%",
    },
    body: {
        flex: 5,
        alignItems: 'center',
        width: '100%',    },
    campoForm:{
        width: '80%',
        height:68,
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
        marginTop: 10,
        marginLeft:"-25%",
    },
    radioText: {
        fontSize: 18,
        paddingTop: 15,
        fontFamily:"Roboto-Medium",
        paddingBottom: 15,
    },
    textFormInput: {
        fontSize: 25,
        fontFamily:"Roboto-Bold",
        marginLeft:"-68%",
        color: "#9c27b0"

    },
    radioOpcao: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:30,

    },
    //botao
    botaoLogin: {
        width: '80%',
        backgroundColor: '#9c27b0',
        height: 55,
        borderRadius: 10,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBotaoLogin: {
        color: '#fff',
        fontFamily:"Roboto-Bold",
        fontSize:27,
    },



});

export default styles;
