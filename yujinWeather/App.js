// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const {width:SCREEN_WIDTH}=Dimensions.get("window");
export default function App() {
  const [days, setDays]= useState([]);
  const [ok, setOk]= useState(true);
  const [city, setCity]= useState("");
  const getWeather=async()=>{
    const {granted}= await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude,longitude}}=await Location.getCurrentPositionAsync({acuracy:1});
    const location=await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});
    setCity(location[0].region);
  };
  useEffect(()=>{
    getWeather();
  },[]);
  return (
      <View style={styles.container}>
        <StatusBar style='light'></StatusBar>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          pagingEnabled 
          contentContainerStyle={styles.weather}
        >
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
