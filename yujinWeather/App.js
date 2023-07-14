// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import React from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import {API_KEY} from '@env';

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
    const {list} = await (await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    ).json();
    const filteredList = list.filter(({ dt_txt }) => dt_txt.endsWith("00:00:00"));
    setDays(filteredList);
    // console.log(days[0].weather);
    // console.log(days[0].main);
    // console.log(days[0].main.temp);
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
          {days.length===0?(
            <View style={styles.day}>
              <ActivityIndicator 
                color="black" 
                size="large"
                style={{ marginTop: 10 }}
              />
            </View>
          ):(
            days.map((day, index)=>
              <View key={index} style={styles.day}>
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Text style={styles.desc}>
                  {day.weather[0].main}
                </Text>
                <Text style={styles.tinyText}>
                  {day.weather[0].description}
                </Text>
              </View>
            )
          )}
          
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
  tinyText:{
    fontSize:20,
  }

});
