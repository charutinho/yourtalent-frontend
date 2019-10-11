import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header:{
        flex: 2,
        width: '100%',
        justifyContent: 'center'
    },
    title:{
        fontSize: 30,
        padding: '10%'
    },
    body: {
        flex: 5,
        width: '100%',
        alignItems: 'center'
    },
    campoForm:{
        width: '80%',
        marginTop: 30
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

});

export default styles;
