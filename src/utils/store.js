import AsyncStorage from '@react-native-community/async-storage';

 async function storeData (state) {
  try {
    if (__DEV__) {console.log("storeData::",state.value);}
    await AsyncStorage.setItem(state.name,state.value);
  } catch (error) {
    if (__DEV__) {  console.log("storeData::err::",error);}
  }
};
 async function fetchData (name) {
 try {

   const value = await AsyncStorage.getItem('@'+name);
   console.log("fetchData::",'@'+name,value);
   if (value !== null) {
     return value;
   }
 } catch (error) {
   console.log("fetchData::err::",error);
 }
};

export {storeData, fetchData};
