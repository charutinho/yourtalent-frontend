import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
     },
     logoFormat:{
         position:"absolute",
         width:200,
         height:200,
         marginTop:30,
     }, 
     title:{
        fontSize:21,
        color: '#000',
        textAlign:"center",
     },
     titleSport:{
        fontSize:28,
        color: '#000',
     },
     selectFormat:{
    },  
     styleSelect:{
        borderWidth:2,
        borderColor:'#7B1FA2', 
        backgroundColor: 'rgba(123, 31, 162, 0.1)',
        width: 300, 
        height:50,
        justifyContent: 'center',
        textAlign:"center",
        marginTop: 30, 
        borderRadius:8,
    },
    botaoLogin: {
        marginTop: 50,
        width: 330, 
        height: 50,
        backgroundColor: '#7B1FA2',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBotaoLogin: {
        fontWeight: 'bold',
        fontSize: 21,
        color: '#fff',
    },
   

});
 
export default styles;
