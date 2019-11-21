import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Header
    head: {
        flex: 1,
        borderWidth: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headTitle: {
        fontSize: 25,
        color: '#6a1b9a',
        marginRight: '4%'
    },
    //Body
    body: {
        flex: 5,
        borderWidth: 1,
        width: '100%',
        flexDirection: 'row'
    },
    iconButton: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    flatlistItem: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        margin: 4,
        flexGrow: 1,
        width: '50%',
        height: 150,
        flexBasis: 0,
    },
    itemText: {
        fontSize: 20,
        marginRight: '5%'
    }
})

export default styles;
