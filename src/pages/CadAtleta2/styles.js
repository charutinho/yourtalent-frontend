import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
     },
  
    
     titleSport:{
        fontSize:28,
        color: '#000',
        marginTop:"80%", 
     },
    
     styleSelect:{
        backgroundColor: 'rgba(123, 31, 162, 0.1)',
        borderWidth:2,
        borderColor:'#7B1FA2', 
        width: 300, 
        height:50,
        justifyContent: 'center',
        textAlign:"center",
        marginLeft: '10%',
        marginTop: 70, 
        borderRadius:8,
    },
    
    botaoLogin: {
        marginTop:80,
        marginLeft: '5%',
        width: 330, 
        height: 50,
        backgroundColor: '#9c27b0',
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
