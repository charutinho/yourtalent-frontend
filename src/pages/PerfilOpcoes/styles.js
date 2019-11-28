import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff"
    },
    //Header
    header: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '6%',
    },
    headerTitle: {
        fontSize: 28,
        color: "#000",
        fontWeight: '700'
    },
    headerIcon: {
        marginLeft: '3%'
    },
    //Body
    body: {
        flex: 5,
        width: '100%',
        alignItems: 'center',
    },
    bodyList: {
        width: '80%',
    },
    bodyListItem1: {
        borderColor: "#6a1b9a",
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        marginTop: 15,
    },
    iconArea: {
        borderTopLeftRadius: 10,
        backgroundColor: "#6a1b9a",
        borderColor: "#6a1b9a",
        backgroundColor: "#6a1b9a",
        height: 50,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        borderBottomEndRadius: 20,
        marginLeft: -2,
    },
    inputFormat: {
        width: '70%',
        height: 35,
        marginLeft: "1%",
        borderBottomColor: "#6a1b9a",
        color: "#000",
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
    },
    bodyListItem2: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        borderWidth: 1,
        borderColor: "#6a1b9a",
        borderColor: "#6a1b9a",
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        marginTop: 15,
    },
    iconArea3: {
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        backgroundColor: "#6a1b9a",
        borderColor: "#6a1b9a",
        height: 50,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -15,

    },
    bodyListItem3: {
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20, 
        borderColor: "#6a1b9a",
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,

        marginTop: 15,
    },
    iconArea2: {
        backgroundColor: "#6a1b9a",
        backgroundColor:"#6a1b9a",
        borderTopLeftRadius:20,
        borderBottomEndRadius:20,
        borderBottomEndRadius: 20,
        height: 80,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -2,

    },
    localizacaoStyle: {
        marginTop: 25,
        fontSize: 22,
    },

    //Body-List-Radio
    radioText: {
        paddingLeft: 5,
        fontSize: 14,
        color:"#000",
    },
    radioOpcao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        zIndex: 100,
        width: '50%',
        alignContent: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },
    configPessoal: {
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginBottom: 40
    },
    configPessoalText: {
        fontSize: 15
    }
});

export default styles;
