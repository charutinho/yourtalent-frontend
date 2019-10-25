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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '12%'
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
        alignItems: 'center'
    },
    bodyList:{
        width: '90%',
        marginTop: 15
    },
    bodyListItem:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    //Body-List-Radio
    radioText:{
        fontSize: 14,
        color: '#000'
    },
    radioOpcao:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        zIndex: 100,
        width: '50%',
        alignContent: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },
});

export default styles;
