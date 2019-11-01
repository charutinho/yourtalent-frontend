import { StyleSheet } from 'react-native';

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
        borderBottomLeftRadius: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoFormat: {
        borderBottomLeftRadius: 150,
        overflow: "hidden",
        width: "127%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
        borderWidth:2,
        borderColor:"#9c27b0",
    },
    body: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },

    titleSport: {
        fontSize: 20,
        color: '#000',
        marginTop: "20%",
    },

    styleSelect: {
        backgroundColor: 'rgba(123, 31, 162, 0.1)',
        borderWidth: 1,
        borderColor: '#7B1FA2',
        width: 300,
        height: 50,
        marginLeft: "2%",
        justifyContent: 'center',
        textAlign: "center",
        marginTop: 60,
        borderRadius: 8,
    },
    botaoLogin: {
        marginTop: 60,
        width: 320,
        height: 50,
        backgroundColor: '#9c27b0',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: "3%",
    },
    textBotaoLogin: {
        fontWeight: 'bold',
        fontSize: 21,
        color: '#fff',
    },
});

export default styles;

