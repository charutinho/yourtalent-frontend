import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyListItem1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        marginTop: 15,
    },
    iconArea: {
        backgroundColor: "#000",
        height: 50,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -2,
    },
    styleSelect: {
        borderWidth: 1,
        borderColor: '#000',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        textAlign: "center",
        marginTop: 30,
    },
    olho: {
        marginTop: '-10.5%',
        marginRight: '-65%',
        zIndex: 1
    },
});

export default styles;
