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
        width: '95%',
        borderColor: '#eeeeee',
        borderWidth: 1,
        padding: 5,
        marginTop: '5%',
        borderRadius: 8
    },
    body: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
    },
    desc: {
        width: '95%',
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
    selectFormat: {
        backgroundColor: 'rgba(123, 31, 162, 0.1)',
    },
    fim: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 80
    },
    //Style da miniatura e botão de confirmar 
    miniaturaImg: {
        width: 40,
        height: 40,
        marginRight: 20,
        borderRadius: 4,
        overflow: 'hidden',
        marginLeft: '5%',
        marginRight: '5%',
        zIndex: 2
    },
    selectImg: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '-11%',
    },
    styleSelect: {
        marginLeft: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    //Olheiro
    busca: {
        width: '90%',
        borderRadius: 5
    },
    buscaTitleView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%',
        flexDirection: 'row'
    },
    buscaTitle: {
        fontSize: 22,
        width: '100%',
        textAlign: 'center'
    },
    textInputForm: {
        width: '80%',
        height: 60,
    },
    inputSexo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioText: {
        fontSize: 15,
    },
    textFormInput: {
        fontSize: 18,
    },
    radioOpcao: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buscaSexo: {
        marginTop: '1%'
    },
    olheiroOption: {
        width: '50%',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center'
    },

    checkboxDenuncia: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6
    }
});

export default styles;