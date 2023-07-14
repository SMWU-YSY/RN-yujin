// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <StatusBar style='light'></StatusBar>
        <View style={styles.city}>
          <Text style={styles.cityName}>Seoul</Text>
        </View>
        <View style={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>

        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"pink"
  },
  city:{
    flex:1,
    backgroundColor: "white",
    justifyContent:'center',
    alignItems:'center',
  },
  weather:{
    flex:3,
    backgroundColor: "purple"
  },
  day:{
    alignItems:'center',
    flex:1,
    backgroundColor: "teal"
  },
  cityName:{
    fontSize:68,
    fontWeight:'500',
    backgroundColor: "white"
  },
  temp:{
    marginTop:50,
    fontSize:160
  },
  desc:{
    marginTop:-30,
    fontSize:60
  },

});
