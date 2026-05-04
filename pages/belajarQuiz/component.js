// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // Functional Component untuk tombol
// const CounterButton = ({ label, onPress, buttonStyle }) => {
//   return (
//     <TouchableOpacity 
//       style={[styles.button, buttonStyle]} 
//       onPress={onPress}
//     >
//       <Text style={styles.buttonText}>{label}</Text>
//     </TouchableOpacity>
//   );
// };

// // Class Component utama
// class CounterApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//   }

//   // Method untuk menambah angka
//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   };

//   // Method untuk mengurangi angka
//   decrement = () => {
//     this.setState({ count: this.state.count - 1 });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Counter App</Text>
        
//         {/* Menampilkan angka di atas tombol */}
//         <Text style={styles.countText}>{this.state.count}</Text>
        
//         {/* Dua tombol: kiri untuk mengurangi, kanan untuk menambah */}
//         <View style={styles.buttonContainer}>
//           <CounterButton 
//             label="-" 
//             onPress={this.decrement}
//             buttonStyle={styles.decrementButton}
//           />
//           <CounterButton 
//             label="+" 
//             onPress={this.increment}
//             buttonStyle={styles.incrementButton}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   countText: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     gap: 20,
//   },
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   decrementButton: {
//     backgroundColor: '#e74c3c',
//   },
//   incrementButton: {
//     backgroundColor: '#27ae60',
//   },
// });

// export default CounterApp;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Tombol
const CounterButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

// Main
const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>

      <Text style={styles.count}>{count}</Text>

      <View style={styles.row}>
        <CounterButton label="-" onPress={() => setCount(count - 1)} />
        <CounterButton label="+" onPress={() => setCount(count + 1)} />
      </View>
    </View>
  );
};

export default CounterApp;

// Style sederhana
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  count: {
    fontSize: 40,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    padding: 15,
    margin: 5,
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 20,
  },
});