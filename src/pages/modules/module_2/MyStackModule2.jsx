import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1Module2 from './Screen1Module2';
import Screen2Module2 from './Screen2Module2';
import Screen3Module2 from './Screen3Module2';

const StackModule2 = createNativeStackNavigator()

export function MyStackModule2() {
    return (
        <StackModule2.Navigator
            screenOptions={{ headerShown: true }}
        >
            <StackModule2.Screen name="Screen1Module2"
                component={Screen1Module2}


            />
            <StackModule2.Screen name="Screen2Module2"
                component={Screen2Module2}

            />
            <StackModule2.Screen name="Screen3Module2"
                component={Screen3Module2}

            />

        </StackModule2.Navigator>
    )
}

