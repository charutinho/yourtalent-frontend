import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 3,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center'
    },
    body: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
    },
    desc: {
        width: '95%',
        borderColor: '#eeeeee',
        borderWidth: 1,
        padding: 5,
        marginTop: '5%'
    },
    textArea: {
        padding: 15,
        textAlignVertical: 'top'
    },
    novoPostContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    selectFormat:{
        backgroundColor: 'rgba(123, 31, 162, 0.1)',
    },
    fim: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 80
    }

});

export default styles;