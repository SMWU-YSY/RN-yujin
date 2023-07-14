import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { theme } from './colors';
import { useState } from 'react';

export default function App() {
  const [working, setWorking]=useState(true);
  const [text,setText]=useState("");
  const travel=()=>setWorking(false);
  const work=()=>setWorking(true);
  const onChangeText=(event)=>setText(event);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color:working?"white":theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color:!working?"white":theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput 
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
        placeholder={working?"Add a To Do":"Where do you want to go?"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal:20,
  },
  header:{
    flexDirection:"row",
    marginTop:100,
    justifyContent:'space-between'
  },
  btnText:{
    fontSize:50,
    fontWeight:'600',
  },
  input:{
    backgroundColor:"white",
    paddingVertical:15,
    paddingHorizontal:20,
    borderRadius:20,
    marginTop:20,
    fontSize:20,
  },
});