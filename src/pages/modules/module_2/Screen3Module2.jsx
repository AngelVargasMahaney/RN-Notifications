import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TextInput } from 'react-native'

const Screen3Module2 = () => {
    const [arregloUsuarios, setArregloUsuarios] = useState([
        { id_user: 0, name_user: '', last_name_user: '', my_hobbies: [], my_birthday_date: '', }
    ])
    const handleAddusuarios = () => {
        setArregloUsuarios((arrayUsuarioInicial) => [
            ...arrayUsuarioInicial,
            {
                id_user: 0, name_user: '', last_name_user: '', my_hobbies: [], my_birthday_date: ''
            }
        ])
    }
    const handleDeleteUsuarios = () => {
        setArregloUsuarios((arrayUsuarioAnterior) => [
            ...arrayUsuarioAnterior.splice(1, 1)
        ])
    }
    return (
        <View>
            <Text>Screen3Module2 METODOS ELEGANTES </Text>
            <Text>Cabe resaltar que los métodos del Screen1Module2 están bien, ya que no agarran el estado directamente y lo modifican, sino que crean una copia (esto pasa al agregar o eliminar) </Text>
            <Text>el estado es INMUTABLE, es decir, no se debe cambiar su valor directamente, me refiero a esto </Text>
            <Text>const [estado,setEstado] , me refiero al estado </Text>
            <Text>A un estado, siempre debe ser modificado con setEstado </Text>
            <Text>Ya sea creando una copia primero de estado y luego setearlo o hacerlo directamente con el setEstado sin crear copia </Text>
            <Text>
                Creando copia sería
                let temp = [...estado]
                {/* temp.push(`{lo que sea o sino sea otro metodo como splice o filter o el que sea}`) */}
                setEstado (temp)
            </Text>
            <Text>
                Directamente desde el estado sería algo como
                {/* setEstado((estadoAnterior)=>[
                ...estado,
                {
                    objeto
                }
                ]) */}
            </Text>
            {
                arregloUsuarios.map((obj, index) => {
                    return (
                        <View style={{ borderWidth: 2, borderColor: '#e0e0e0', margin: 20 }} key={index}>
                            <Text>USUARIO N° {index + 1}</Text>
                            <Text>
                                Nombre
                            </Text>
                            <TextInput
                                style={{ borderColor: 'red', borderWidth: 2 }}
                            // onChangeText={(value) => handleChangeInputUsuarios('name_user', value, indicePadre)}
                            />
                            <Text>
                                Apellido
                            </Text>
                            <TextInput
                                style={{ borderColor: 'red', borderWidth: 2 }}
                            // onChangeText={(value) => handleChangeInputUsuarios('last_name_user', value, indicePadre)}
                            />
                            <Text>
                                Mis HOBBIES
                            </Text>


                        </View>
                    )
                })
            }
            <Button title="Agregar Usuario" onPress={() => handleAddusuarios()} />
            <Button title="Eliminar Usuario" onPress={() => handleDeleteUsuarios()} />
        </View>
    )
}

export default Screen3Module2

const styles = StyleSheet.create({})