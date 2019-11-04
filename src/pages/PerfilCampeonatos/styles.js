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
        textAlign: 'center'
    },
    //Body styles
    body: {
        flex: 5,
        width: '100%',
    },
    bodyNovo: {
        flex: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    novoCampTitle: {
        fontSize: 20
    },
    bodyCamp: {
        flex: 5,
        alignItems: 'center',
    },
    formDois: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default styles;
