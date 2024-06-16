import { useState } from "react";
import { Button, Text, View , StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";

import React from 'react'


export const NavBar = () => {

    const navigation = useNavigation(); // Obtiene el objeto de navegación

    const goToHome = () => {
      // Navega a la pantalla Home
      navigation.navigate('Home');
    }
    return (
    
        
        <View style={styles.navBar}>
      <Button style={styles.button} title="Home" onPress={() => console.log('Botón 1 presionado')} />
      <Button title="Search" onPress={() => console.log('Botón 2 presionado')} />
      <Button title="Botón 3" onPress={() => console.log('Botón 3 presionado')} />
      <Button title="Notifications" onPress={() => console.log('Botón 4 presionado')} />
    </View>
  )}

  

  const styles = StyleSheet.create({
    navBar: {
      flexDirection: 'row', // Alinear elementos en fila
      justifyContent: 'space-around', // Distribuir espacio alrededor de los elementos
      alignItems: 'center', // Centrar verticalmente los elementos
      height: 50, // Altura de la barra de navegación
      backgroundColor: 'grey', // Color de fondo
      paddingHorizontal: 10, // Padding horizontal
    },
    button: {
        backgroundColor: 'grey', // Color de fondo
    }
  });
