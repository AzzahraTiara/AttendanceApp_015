import Home from "./pages/Home";
import { KartuClass, KartuFungsional } from "./pages/Component";
import ClassLifeCycle from "./pages/ClassLifeCycle";

import { SafeAreaView, ScrollView, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{}}>
      <ScrollView >       
        {/* <KartuClass />
        <KartuFungsional /> */}

      <Home />
      
      </ScrollView>
    </SafeAreaView>
  );
}

// import { SafeAreaView, ScrollView, View } from 'react-native';

// export default function App() {
//   return (
//     <SafeAreaView>
//       <ScrollView>

//         {/* Kotak */}
//         <View
//           style={{
//             width: 150,
//             height: 150,
//             backgroundColor: 'blue',
//             margin: 20,
//           }}
//         />

//       </ScrollView>
//     </SafeAreaView>
//   );
// }