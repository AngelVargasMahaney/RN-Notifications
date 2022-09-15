import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FormControl, Input } from 'native-base';
import Module1Context from '../../../context/Module1Context';

const Screen2Module1 = () => {
    const navigation = useNavigation();
    const { objetoModule1, setObjetoModule1 } = useContext(Module1Context)
    console.log("Estoy en el Screen 2 del Modulo 1",objetoModule1)

    const [miData2, setMiData2] = useState({
        description1Data2: "",
        description2Data2: "",
    })


    const handleSubmitEquipos = () => {
        setObjetoModule1({
            ...objetoModule1,
            ...miData2
        })
        
        // console.log("MIDATA2", miData2)
    }
    return (
        <View style={{ margin: 20 }}>
            <Text>Screen2Module1</Text>
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
                onChangeText={(value) => setMiData2({
                    ...miData2,
                    description1Data2: value
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
                onChangeText={(value) => setMiData2({
                    ...miData2,
                    description2Data2: value
                })}
            />
            <Button title="Enviar Información" onPress={() => handleSubmitEquipos()} style={{ margin: 20 }} />

            <Button title="Screen3 - Modulo1" onPress={() => navigation.navigate('Screen3Module1')} />

        </View>
    )
}

export default Screen2Module1

const styles = StyleSheet.create({})