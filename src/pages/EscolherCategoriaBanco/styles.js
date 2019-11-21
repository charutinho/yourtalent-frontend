import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6a1b9a',
    },
    containerFlatList: {
        marginTop: '80%',
        width: '100%'
    },

    flatlistText: {
        fontSize: 27,
        color: "#fff",
        fontWeight:"bold",
        textAlign: "center",
        paddingTop:20,
    },
    touchableView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 80,    

        marginTop: 15,
    }
});

export default styles;

