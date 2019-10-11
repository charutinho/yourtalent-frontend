import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: 200,
    },
    capa:{
        position: 'absolute',
        height: 200,
        width: '100%',
    },
    body: {
        flex: 7,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: 75
    },
    fotoPerfilView:{
        marginBottom: -65,
        alignItems: 'flex-end'
    },
    fotoPerfil: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -40,
        borderRadius: 90,
        overflow: 'hidden'
    },
    fotoUsuario: {
        width: '100%',
        height: '100%',
    },
    uploadImage: {
        alignContent: 'flex-end'
    },
    nomeView: {
        marginTop: 15,
    },
    nome: {
        fontSize: 20,
    },
    descricaoView: {
        marginTop: 5,
        width: 300,
        height: 80,
    },
    descricao:{
        fontSize: 15,
        textAlign: 'center',
    },
    sobreView:{
        width: 400,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infoView:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    esporteView:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    estadoView:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    opcoesView:{
        width: 300,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    chatView:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    esporteView:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    destaqueView: {
        marginTop: 15,
    },
    destaqueTitulo:{
        fontSize: 20,
        textAlign: 'center',
    },
    destaqueVideo:{
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'red',
        width: 350,
        height: 180
    }
});

export default styles;
