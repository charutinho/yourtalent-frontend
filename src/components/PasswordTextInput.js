import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class PasswordToggleInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            secureTextEntry:true,
            iconName:"eye-outline",
        }
    }

    onIconPress = ()=>{
        let iconName = (this.state.secureTextEntry) ? "eye-off-outline":"eye-outline";
        
        this.setState({
            secureTextEntry:!this.state.secureTextEntry,
            iconName:iconName
        });
    }


    render() {
        return (
            <View style={{ borderBottomWidth: 1, flexDirection: "row",marginTop:10,width:"80%", }}>
                <TextInput
                    style={{flex:1}}
                    secureTextEntry={this.state.secureTextEntry}
                />
                <TouchableOpacity onPress={this.onIconPress}>
                <Icon name={this.state.iconName} size={20}/>
                </TouchableOpacity>
            </View>

        );
    }
}
