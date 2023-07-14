import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View>
      <View style={{width:100, height:100, backgroundColor:"tomato"}}></View>
      <View style={{width:100, height:100, backgroundColor:"orange"}}></View>
      <View style={{width:100, height:100, backgroundColor:"teal"}}></View>
      <Text>
        하이
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
