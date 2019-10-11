import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
    },
    title:{
        fontSize: 50,
        color: '#fff',
        zIndex: 1
    },
    titleView:{
        marginTop: 50,
        position: "absolute",
    },
    containerR:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerL: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleOpcao: {
        fontSize: 32,
        position: "absolute",
        color: '#fff',
    }
});

export default styles;