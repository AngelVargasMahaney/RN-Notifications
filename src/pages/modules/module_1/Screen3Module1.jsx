import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FormControl, Input } from 'native-base';
import Module1Context from '../../../context/Module1Context';

const Screen3Module1 = () => {
    const navigation = useNavigation();
    const { objetoModule1, setObjetoModule1 } = useContext(Module1Context)
    console.log("Estoy en el Screen 3 del Modulo 1", objetoModule1)

    const [miData3, setMiData3] = useState({
        description1Data3: "",
        description2Data3: "",
    })


    const handleSubmitEquipos = () => {
        setObjetoModule1({
            ...objetoModule1,
            ...miData3
        })
        // console.log("MIDATA3", miData3)
    }
    return (
        <View style={{ margin: 20 }}>
            <Text>Screen3Module1</Text>
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
                onChangeText={(value) => setMiData3({
                    ...miData3,
                    description1Data3: value
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
                onChangeText={(value) => setMiData3({
                    ...miData3,
                    description2Data3: value
                })}
            />
            <Button title="Enviar Información" onPress={() => handleSubmitEquipos()} style={{ margin: 20 }} />

            <Button title="Screen1 - Modulo1" onPress={() => navigation.navigate('Screen4Module1')} />

        </View>
    )
}

export default Screen3Module1

const styles = StyleSheet.create({})