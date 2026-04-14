import React, {Component} from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";

// Komponen Anak : Timer (punya umur/lifecycle)

class TimerLifeCycle extends Component{
    //Fase 0 :INISIALISASI
    constructor(props){
        super(props);
        this.state = {
            detik: 0 };
            console.log("0.[CONSTRUCTOR] memori disiapkan untuk anak");
    }

    //Fase 1 : LAHIR
    componentDidMount(){
        console.log("1.[MOUNTING] anak lahir timer mulai berjalan");

        this.interval = setInterval(() => {
            this.setState({detik: this.state.detik + 1});
            console.log(`[BACKGROUND TIMER] Berjalan ${this.state.detik} detik`);
        }, 1000); 
    }

    //Fase 2 : Tumbuh/update
    componentDidUpdate(prevProps, prevState){
        console.log(`2.[UPDATING] Waktu bertambah ${prevState.detik} detik -> ${this.state.detik} detik`);
    }

    //Fase 3 : Mati
    componentWillUnmount(){
        console.log("3.[UNMOUNTING] anak mati, timer dihentikan");
        clearInterval(this.interval);
    }

    render(){
        return(
            <View style={styles.timerBox}>
                <Text style={styles.timerText}>{this.state.detik}</Text>
                <Text >Detik berjalan</Text>
            </View>
        );
    }
}

export default class ClassLifeCycle extends Component{
    state = {tampilkanTimer: false}

    toggleTimer = () => {
        this.setState({tampilkanTimer: !this.state.tampilkanTimer});
    
    };

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Demo Lifecycle Komponen</Text>

                <View style={styles.content}>
                    {this.state.tampilkanTimer ? (<TimerLifeCycle />) : (<Text style={styles.infoText}>Komponen anak belum lahir</Text>)}
                </View >
                <View style={styles.buttonContainer}>
                    <Button title={this.state.tampilkanTimer ? "Hancurkan Component (unmount)" : "Lahirkan Component(Mount)"} 
                    color={this.state.tampilkanTimer? "#D32F2F" : "#0021b2"} 
                    onPress={this.toggleTimer}/>
                

                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  content: {
    height: 150,
    justifyContent: 'center',
},
timerBox: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
},
timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
},
infoText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
},
buttonContainer: {
    marginTop: 40,
    width: '80%',
}});
