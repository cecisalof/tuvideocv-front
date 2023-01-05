import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Pressable, LogBox } from 'react-native';

const DefaultModalContentOptions = (props) => { 
  return (
    <View style={styles.content}>
        <Pressable testID={'favorito-button'} onPress={()=>{
                  props.onPress("Favorite");
                  //Llamar a las opciones de guardar u optar
                  }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.button
        ]}>
          <Text style={styles.text}>💓</Text>
        </Pressable>
        <Pressable  testID={'optar-button'} onPress={()=>{
                  props.onPress("Candidate");
                  //Llamar a las opciones de guardar u optar
                  }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(210, 230, 255)'
                    : 'white'
                },
              ]}>
          <Text style={styles.text}>📋</Text>
        </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: 100,
    marginLeft:'auto'
  },
  button:{
    marginBottom: 10,
  },
  text:{
    fontSize: 40,
  },
});
export default DefaultModalContentOptions;