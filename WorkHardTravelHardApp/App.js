import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, ScrollView } from 'react-native';
import { theme } from './colors';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const STORAGE_KEY="@toDos";

export default function App() {
  useEffect(()=>{
    loadToDos();
  },[]);

  const [working, setWorking]=useState(true);
  const [text,setText]=useState("");
  const [toDos,setToDos]=useState({});
  const saveToDos = async(toSave)=>{
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(toSave));
  };

  const travel=()=>setWorking(false);
  const work=()=>setWorking(true);
  const onChangeText=(event)=>setText(event);
  const loadToDos= async()=>{
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if(s){
      setToDos(JSON.parse(s));
    }
    // console.log(s);
  };
  
  const addTodo= async()=>{
    if(text===""){
      return;
    }
    const newToDos = {
      ...toDos, 
      [Date.now()] : { text, working },
    };
    // const newToDos=Object.assign(
    //   {},
    //   toDos,
    //   {[Date.now()]:{text, work:working}})
    // alert(text);
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  console.log(toDos);

  const deleteToDo= (key)=>{
    if(Platform.OS==='web'){
      const ok=window.confirm("Delete Todo?");
      if(ok){
        const newToDos={...toDos};
        delete newToDos[key];
        setToDos(newToDos);
        saveToDos(newToDos);
      }
    }else{
      Alert.alert(
        "Delete Todo?",
        "Are you sure?", [
          {text:"Cancel"},
          {
            text: "I'm sure", 
            onPress: ()=>{
              const newToDos={...toDos};
              delete newToDos[key];
              setToDos(newToDos);
              saveToDos(newToDos);
            },
          },
        ]);
    }
    
    
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{
            fontSize:50,
            fontWeight:'600', 
            color:working?"white":theme.grey
          }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{
            fontSize:50,
            fontWeight:'600', 
            color:!working?"white":theme.grey
          }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput 
        onChangeText={onChangeText}
        onSubmitEditing={addTodo}
        returnKeyType='Done'
        value={text}
        style={styles.input}
        placeholder={working?"Add a To Do":"Where do you want to go?"}
      />
      <ScrollView>
        {Object.keys(toDos).map(key=>
          toDos[key].working===working?(
          <View style={styles.toDos} key={key}>
            <Text style={styles.toDosText}>
              {toDos[key].text}
            </Text>
            <TouchableOpacity onPress={()=>deleteToDo(key)}>
              <Text><Fontisto name='trash' size={20} color={theme.grey}/></Text>
            </TouchableOpacity>
          </View>
        ) : null
        )}
      </ScrollView>
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
  input:{
    backgroundColor:"white",
    paddingVertical:15,
    paddingHorizontal:20,
    borderRadius:20,
    marginVertical:20,
    fontSize:20,
  },
  toDos:{
    backgroundColor: theme.toDoBg,
    marginBottom:10,
    paddingVertical:20,
    paddingHorizontal:20,
    borderRadius:15,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  toDosText:{
    color:'white',
    fontSize:16,
    fontWeight:"500",
  }
});
