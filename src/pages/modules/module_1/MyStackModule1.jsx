import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1Module1 from './Screen1Module1';
import Screen2Module1 from './Screen2Module1';
import { Module1ContextProvider } from '../../../context/Module1Context';
import Screen3Module1 from './Screen3Module1';
import Screen4Module1 from './Screen4Module1';

const StackModule1 = createNativeStackNavigator()

export function MyStackModule1() {
    return (
        <Module1ContextProvider>
            <StackModule1.Navigator
                screenOptions={{ headerShown: true }}
            >
                <StackModule1.Screen name="Screen1Module1"
                    component={Screen1Module1}


                />
                <StackModule1.Screen name="Screen2Module1"
                    component={Screen2Module1}

                />
                <StackModule1.Screen name="Screen3Module1"
                    component={Screen3Module1}

                />
                <StackModule1.Screen name="Screen4Module1"
                    component={Screen4Module1}

                />

            </StackModule1.Navigator>
        </Module1ContextProvider>
    )
}

