import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    //Header
    header: {
        flex: 1,
        width: '100%',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerTitle: {
        fontSize: 28
    },
    headerIcon: {
        marginLeft: '3%'
    },


    //Body
    body: {
        flex: 5,
        width: '100%',
        borderWidth: 3,
        alignItems: 'center'
    },
    bodyList:{
        width: '95%'
    },
});

export default styles;
