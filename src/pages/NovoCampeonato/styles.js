import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    //Header styles
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginTop:"50%",
    },
    //Body styles
    body: {
        flex: 5,
        width: '100%',
        borderWidth: 1,
    },
    bodyNovo: {
        flex: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"32%",
    },
    novoCampTitle: {
        fontSize: 20
    },
    formDois: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trofeuPosition:{
    },
});

export default styles;
