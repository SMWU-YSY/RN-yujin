// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const {width:SCREEN_WIDTH}=Dimensions.get("window");
export default function App() {
  return (
      <View style={styles.container}>
        <StatusBar style='light'></StatusBar>
        <View style={styles.city}>
          <Text style={styles.cityName}>Seoul</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled contentContainerStyle={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
        </ScrollView>
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
    backgroundColor:"pink",
    justifyContent:'center',
    alignItems:'center',
  },
  weather:{
    backgroundColor: "purple"
  },
  day:{
    width:SCREEN_WIDTH,
    alignItems:'center',
    backgroundColor: "white"
  },
  cityName:{
    fontSize:68,
    fontWeight:'500',
    // backgroundColor: "white"
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
