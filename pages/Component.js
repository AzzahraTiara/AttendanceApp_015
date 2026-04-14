import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";

// 1. class component

export class KartuClass extends Component{
    render(){
        return( <View style={styles.cardClass}>
            <Text style={styles.textWhite}>Halo saya dari class component!</Text>
            <Text style={styles.textSub}>Sintaks saya lebih panjang dan butuh render()</Text>
        </View>
        );
    }
}

export const KartuFungsional = () =>{
    return(
        <View style={styles.cardFunc}>
            <Text style={styles.textWhite}>Halo saya dari functional component!</Text>
            <Text style={styles.textSub}>Sintaks saya lebih ringkas dan murni sebuah fungsi biasa()</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding:20,},
title: {
            fontSize: 22,
            fontWeight: "bold",           
            marginBottom: 20,},
cardClass: {
    backgroundColor: '#0056A0', // Biru
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
},
cardFunc: {
    backgroundColor: '#2E7D32', // Hijau
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
},
textWhite: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
},
textSub: {
    color: '#D1E8FF',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
}
});
           