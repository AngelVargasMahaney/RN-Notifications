import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1Module3 from './Screen1Module3';
import Screen2Module3 from './Screen2Module3';


const StackModule3 = createNativeStackNavigator()

export function MyStackModule3() {
    return (
        <StackModule3.Navigator
            screenOptions={{ headerShown: true }}
        >
            <StackModule3.Screen name="Screen1Module3"
                component={Screen1Module3} />
            {/* <StackModule3.Screen name="Screen2Module3"
                component={Screen2Module3} /> */}




        </StackModule3.Navigator>
    )
}

