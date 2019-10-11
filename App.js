import React from 'react';
import { 
  View,
  Text,
  StatusBar,
  SafeAreaView
} from 'react-native';

export default function App() {
  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Text>
        Olá RN 0.61.2
      </Text>
    </View>
  );
}
