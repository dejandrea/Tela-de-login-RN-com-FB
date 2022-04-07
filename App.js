// import 'react-native-gesture-handler';
// import React, { useState, useEffect } from 'react';
// import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import auth from '@react-native-firebase/auth';

// import selectRouters, {routers} from './src/navigationRouters';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'tomato',
//     accent: 'yellow',
//   },
// };

// const Stack = createStackNavigator();

// const App = () => {
//   const [user, setUser] = useState();

//   function onAuthStateChanged(user) {
//     setUser(user);
//   }

//   useEffect(() => {
//      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//      return subscriber; // unsubscribe on unmount
//   }, []);

//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           {user ? (
//             <>
//               <Stack.Screen
//                 name={routers.home}
//                 component={() => selectRouters(routers.home, user)}
//                 options={{
//                   headerShown: false,
//                 }}
//               />
//             </>
//           ) : (
//             <>
//               <Stack.Screen
//                 name={routers.login}
//                 component={() =>selectRouters(routers.login)}
//                 options={{
//                   headerShown: false,
//                 }}
//               />
//               <Stack.Screen
//                 name={routers.createUser}
//                 component={() =>selectRouters(routers.createUser)}
//                 options={{
//                   headerShown: false,
//                 }}
//               />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

export default App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}
