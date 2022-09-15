import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FormControl, Input } from 'native-base';
import Module1Context from '../../../context/Module1Context';

const Screen4Module1 = () => {
    const navigation = useNavigation();
    const { objetoModule1, setObjetoModule1 } = useContext(Module1Context)
    console.log("Estoy en el Screen 3 del Modulo 1", objetoModule1)

    const [miData4, setMiData4] = useState({
        description1Data4: "",
        description2Data4: "",
    })


    const handleSubmitEquipos = () => {
        setObjetoModule1({
            ...objetoModule1,
            miData4
        })
        // console.log("MIDATA3", miData3)
    }
    return (
        <View style={{ margin: 20 }}>
            <Text>Screen4Module1</Text>
            <FormControl.Label
                _text={{
                    bold: false,
                    color: 'dark.300',
                }}>
                Description 1
            </FormControl.Label>

            <Input
                borderColor={'#162349'}
                borderWidth={1.5}
                variant="outline"
                placeholder="--"
                onChangeText={(value) => setMiData4({
                    ...miData4,
                    description1Data4: value
                })}
            />
            <FormControl.Label
                _text={{
                    bold: false,
                    color: 'dark.300',
                }}>
                Description 2
            </FormControl.Label>

            <Input
                borderColor={'#162349'}
                borderWidth={1.5}
                variant="outline"
                placeholder="--"
                onChangeText={(value) => setMiData4({
                    ...miData4,
                    description2Data4: value
                })}
            />
            <Button title="Enviar Información" onPress={() => handleSubmitEquipos()} style={{ margin: 20 }} />

            <Button title="Screen4 - Modulo1" onPress={() => navigation.navigate('Screen1Module1')} />

        </View>
    )
}

export default Screen4Module1

const styles = StyleSheet.create({})