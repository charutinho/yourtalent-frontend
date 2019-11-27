import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 25,
        width: '100%',
    },
    bottom: {
        flex: 2,
        width: '100%',
        backgroundColor: '#fafafa',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    notMessageAtleta: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notMessageAtletaText: {
        fontSize: 35,
        marginBottom: '10%',
        color: '#000',
        textAlign: 'center'
    },
    notMessageBodyText: {
        fontSize: 25,
        textAlign: 'center',
        color: '#000'
    }
});

export default styles;
