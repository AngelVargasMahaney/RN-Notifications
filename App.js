import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/Login';

import MyMainPage from './src/pages/modules/MyMainPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/pages/Login';
import { MyStackModule1 } from './src/pages/modules/module_1/MyStackModule1';
import { MyStackModule2 } from './src/pages/modules/module_2/MyStackModule2';
import { MyStackModule3 } from './src/pages/modules/module_3/MyStackModule3';

import registerNNPushToken from 'native-notify';


const Stack = createNativeStackNavigator()
function MyMainStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,

    }
    }>
      <Stack.Screen name="Log"
        component={LoginPage}
        options={() => ({
          title: 'Login',

          // header: () => (
          //   <Header />
          // ),

        })}
      />
      <Stack.Group
        screenOptions={() => ({
          // header: () => (
          //   <Header tipoBotonEsFlecha={tipoBotonEsFlecha} miPaginacionAislacion={miPaginacionAislacion} isActive={isActive} miPaginasTotales={miPaginasTotales} colorPaginacion={colorPaginacion} />
          // ),
          headerShown: true
        })}

      >
        <Stack.Screen name="Home"
          component={MyMainPage}
          options={() => ({
            title: 'HomePage',

            // header: () => (
            //   <Header />
            // ),

          })}
        />
        <Stack.Screen name="Module1"
          component={MyStackModule1} />
        <Stack.Screen name="Module2"
          component={MyStackModule2} />
        <Stack.Screen name="Module3"
          component={MyStackModule3} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default function App() {
  registerNNPushToken(4186, 'KTKh4FLPSogRjuzjdDrwkQ')
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MyMainStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
