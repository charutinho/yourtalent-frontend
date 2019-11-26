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
        width: '100%',
    },
    iconButton: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlistItem: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6a1b9a',
        borderRadius: 5,
        margin: 4,
        flexGrow: 1,
        height: 150,
        flexBasis: 0,
    },
    itemText: {
        fontSize: 20,
        marginRight: '5%',
        color: '#fff'
    },

    //Denuncias
    denunciasView: {
        width: '100%',
    },
    denunciasFlatlist: {
        width: '100%',
        backgroundColor: '#fafafa'
    },
    denunciasHeader: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
    },
    denunciasIcon: {
    },
    denunciasTouchable: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})

export default styles;
