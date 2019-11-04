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
         marginLeft:70,   
     }, 
     title:{
        marginTop:145,
        fontSize:21,
        color: '#000',
        textAlign:"center",
        
     },
     titleSport:{
        fontSize:28,
        color: '#000',
        marginTop:350, 
     },
     selectFormat:{
        backgroundColor: 'rgba(123, 31, 162, 0.1)',
    },  
     styleSelect:{
        borderWidth:2,
        borderColor:'#7B1FA2', 
        width: 300, 
        height:50,
        justifyContent: 'center',
        textAlign:"center",
        marginLeft: '10%',
        marginTop: 30, 
        borderRadius:8,
    },
    botaoLogin: {
        marginTop: 200,
        marginLeft: '5%',
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
