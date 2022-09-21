import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from 'react-native';

const Screen1Module2 = () => {
    const navigation = useNavigation();

    //********** ESTE ES MI ESTADO DONDE SE IRÁ GUARDANDO LOS OBJETOS USUARIOS **********
    //SI DIGAMOS, QUIERO QUE EN PANTALLA NO APAREZCA NADA POR DEFAULT, ES DECIR, SOLO EL BOTON AGREGAR, ENTONCES DEBO ELIMINAR EL OBJETO POR DEFECTO DE LA LINEA 12 Y SOLO DEBE QUEDAR []
    const [arregloUsuarios, setArregloUsuarios] = useState([
        { id_user: 0, name_user: '', last_name_user: '', my_hobbies: [], my_birthday_date: '', }
    ])
    //********** END -ESTE ES MI ESTADO DONDE SE IRÁ GUARDANDO LOS OBJETOS USUARIOS **********

    //ESTE ESTADO ES PARA PROBAR LOS MÉTODOS DE *********USO DINÁMICO DE LIBRERÍAS EXTERNAS
    const [miArregloFechas, setMiArregloFechas] = useState([
        {
            id_date: 0,
            value_date: '',
            modal_date_visible: false
        }
    ])
    //END - ESTE ESTADO ES PARA PROBAR LOS MÉTODOS DE ****************USO DINÁMICO DE LIBRERÍAS EXTERNAS


    //********** METODO QUE PERMITE PUSHEAR A NUESTRO ARREGLO DE USUARIO DINÁMICAMENTE **********
    const handleAddusuarios = () => {
        //AQUELLAS QUE DIGAN __FECHA, SIRVEN PARA AQUELLOS MÉTODOS DE LA LÍNEAUSO DINÁMICO DE LIBRERÍAS EXTERNAS (para las fechas). Básicamente si se presiona agregar un usuario, este debe tener su propia fecha de cumpleaños

        const temp = [...arregloUsuarios]
        const tempFechas = [...miArregloFechas]
        temp.push({
            id_user: arregloUsuarios.length,
            name_user: '',
            last_name_user: '',
            my_hobbies: [],
            my_birthday_date: ''
        })
        tempFechas.push({
            id_date: tempFechas.length,
            value_date: '',
            modal_date_visible: false
        })
        setArregloUsuarios(temp)
        setMiArregloFechas(tempFechas)
    }
    //********** END - METODO QUE PERMITE PUSHEAR A NUESTRO ARREGLO DE USUARIO DINÁMICAMENTE **********

    //********** METODO QUE PERMITE QUITAR A NUESTRO ARREGLO DE USUARIO DINÁMICAMENTE EL ÚLTIMO USUARIO **********
    const handleDeleteUsuarios = () => {
        const temp = [...arregloUsuarios]
        temp.splice(-1)
        setArregloUsuarios(temp)
    }
    //********** END - METODO QUE PERMITE PUSHEAR A NUESTRO ARREGLO DE USUARIO DINÁMICAMENTE **********

    //********** METODO QUE PERMITE EDITAR CADA UNO DE MUESTROS OBJETOS DE NUESTRO ARREGLO DINÁMICAMENTE **********
    const handleChangeInputUsuarios = (tagInput, valueInput, indice) => {
        const temp = [...arregloUsuarios]
        temp[indice][tagInput] = valueInput
        setArregloUsuarios(temp)

    }
    //********** END - METODO QUE PERMITE EDITAR CADA UNO DE MUESTROS OBJETOS DE NUESTRO ARREGLO DINÁMICAMENTE **********



    // SI DIGAMOS, TENGO UN OBJETO PADRE QUE TIENE EN SU INTERIOR UN ARREGLO DE OBJETOS, PARA LLENARLO DEBO DE REALIZAR LO SIGUIENTE:

    const [arregloMisHobbies, setArregloMisHobbies] = useState([])

    const handleAddHobbies = (objetoPadre, indicePadre) => {

        const temp = [...arregloUsuarios]
        // console.log(temp)
        temp[indicePadre].my_hobbies.push({})
        setArregloUsuarios(temp)
    }

    const handleDeleteHobbies = (objetoPadre, indicePadre) => {
        const temp = [...arregloUsuarios]
        temp[indicePadre].my_hobbies.splice(-1)
        setArregloUsuarios(temp)
    }

    //Metodo 1 de como manejar información de los hijos del padre dinámicamente
    const handleChangeInputHobbies = (tagInput, valorInput, indicePadre, indiceHobbie) => {
        const temp = [...arregloUsuarios]
        temp[indicePadre].my_hobbies[indiceHobbie][tagInput] = valorInput
        setArregloUsuarios(temp)
    }
    // END - Metodo 1 de como manejar información de los hijos del padre dinámicamente

    // Método 2 de como manejar información de los hijos del padre dinámicamente
    const handleChangeInput2Hobbies = (objHobbie, tagInput, value) => {
        objHobbie[tagInput] = value
    }
    // END Método 2 de como manejar información de los hijos del padre dinámicamente

    // END - SI DIGAMOS, TENGO UN OBJETO PADRE QUE TIENE EN SU INTERIOR UN ARREGLO DE OBJETOS, PARA LLENARLO DEBO DE REALIZAR LO ANTERIOR:

    //************************************************* USO DINÁMICO DE LIBRERÍAS EXTERNAS ************************************************* */
    // SI DIGAMOS, QUIERO UTILIZAR UNA LIBRERÍA EXTERNA PARA QUE EN CADA UNA SE ABRA SEGÚN SU REFERNCIA DE ID, DEBO REALIZAR LO SIGUIENTE:
    // ESTO TAMBIÉN SE PUDO HABER HECHO CON EL ARREGLO DE MIS HOBBIES, SINO QUE ESTA ES OTRA MANERA DE REALIZAR EL PUSHEO DE DATA A UN ARREGLO
    const handleDateConfirm = (data, index) => {
        //  console.log(data.format('YYYY-MM-DD HH:mm:ss'))

        let temp = [...miArregloFechas];
        temp[index].value_date = data,
            temp[index].modal_date_visible = false;
        arregloUsuarios[index].my_birthday_date = data.getDate() + '/' + (data.getMonth() + 1) + "/" + data.getFullYear()
        setMiArregloFechas(temp);
    };
    // END - SI DIGAMOS, QUIERO UTILIZAR UNA LIBRERÍA EXTERNA PARA QUE EN CADA UNA SE ABRA SEGÚN SU REFERNCIA DE ID, DEBO REALIZAR LO SIGUIENTE:
    const onOpen = (index) => {
        // setHoraClicked(true)
        console.log("ESTOY APRETANDO EL DATAPICKER", index);
        try {
            let temp = [...miArregloFechas];
            console.log("ESTE ES MI ARREGLO DE LA LINEA 174", temp);
            temp[index].modal_date_visible = true;
            setMiArregloFechas(temp);
            // console.log(temp);
        } catch (error) {
            console.log(error);
        }
    };
    const onCancel = (index) => {
        let temp = [...miArregloFechas];
        temp[index].modal_date_visible = false;
        setMiArregloFechas(temp);
    };





    useEffect(() => {
        console.log('ARREGLO USUARIOS', arregloUsuarios)
        // console.log('ARREGLO HOBBIES', arregloMisHobbies)
        console.log('ARREGLO FECHAS TEMP', miArregloFechas)
    })



    return (
        <ScrollView>
            <Text>Screen1Module2</Text>
            <Text>ARREGLOS DINÁMICOS</Text>

            {
                arregloUsuarios.map((objetoPadre, indicePadre) => {
                    return (
                        <View style={{ borderWidth: 2, borderColor: '#e0e0e0', margin: 20 }} key={indicePadre}>
                            <Text>USUARIO N° {indicePadre + 1}</Text>
                            <Text>
                                Nombre
                            </Text>
                            <TextInput
                                style={{ borderColor: 'red', borderWidth: 2 }}
                                onChangeText={(value) => handleChangeInputUsuarios('name_user', value, indicePadre)}
                            />
                            <Text>
                                Apellido
                            </Text>
                            <TextInput
                                style={{ borderColor: 'red', borderWidth: 2 }}
                                onChangeText={(value) => handleChangeInputUsuarios('last_name_user', value, indicePadre)}
                            />
                            <Text>
                                Mis HOBBIES
                            </Text>
                            <Button title="Agregar Hobbie" onPress={() => handleAddHobbies(objetoPadre, indicePadre)} />
                            {
                                objetoPadre.my_hobbies.map((objHobbie, indexHobbie) => {
                                    return (
                                        <View key={indexHobbie}>
                                            <Text>
                                                Mi Hobbie {indexHobbie + 1}
                                            </Text>
                                            {/* <TextInput
                                                style={{ borderColor: 'red', borderWidth: 2 }}
                                                onChangeText={(value) => handleChangeInputHobbies('description', value, indicePadre, indexHobbie)}
                                            /> */}
                                            <TextInput
                                                style={{ borderColor: 'red', borderWidth: 2 }}
                                                onChangeText={(value) => handleChangeInput2Hobbies(objHobbie, 'description', value)}
                                            />
                                        </View>
                                    )
                                })
                            }
                            <Button title="Quitar Hobbie" onPress={() => handleDeleteHobbies(objetoPadre, indicePadre)} />
                            <Text> MI FECHA DE CUMPLEAÑOS</Text>
                            {miArregloFechas[indicePadre].value_date != '' ?

                                (<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 0.1, justifyContent: 'center' }} onPress={() => onOpen(indicePadre)}>
                                    <Text style={[styles.textDate]}>
                                        {miArregloFechas[indicePadre].value_date.getDate() > 9 ? (miArregloFechas[indicePadre].value_date.getDate()) : ("0" + miArregloFechas[indicePadre].value_date.getDate())}
                                        /
                                    </Text>

                                    <Text style={[styles.textDate]}>
                                        {
                                            (miArregloFechas[indicePadre].value_date.getMonth() + 1) > 9 ? (miArregloFechas[indicePadre].value_date.getMonth() + 1) : "0" + (miArregloFechas[indicePadre].value_date.getMonth() + 1) + "/"
                                        }
                                    </Text>
                                    <Text style={[styles.textDate]}>{miArregloFechas[indicePadre].value_date.getFullYear()}</Text>
                                    
                                </TouchableOpacity>) :
                                (<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 0.1, justifyContent: 'center' }} onPress={() => onOpen(indicePadre)}>
                                    <Text style={styles.textDate}>--</Text>
                                    <Text style={styles.textDate}>--</Text>
                                    <Text style={styles.textDate}>--</Text>
                                </TouchableOpacity>)}
                            <DateTimePickerModal
                                isVisible={miArregloFechas[indicePadre].modal_date_visible}
                                // onChange={handleChangeDate}
                                mode="date"
                                onConfirm={(data) => handleDateConfirm(data, indicePadre)}
                                onCancel={() => onCancel(indicePadre)}

                            // timeZoneOffsetInMinutes={0}
                            />
                        </View>
                    )
                })
            }

            <Button title="Agregar Usuario" onPress={() => handleAddusuarios()} />
            <Button title="Eliminar Usuario" onPress={() => handleDeleteUsuarios()} />

            <Button title="Screen1 - Moduloo2" onPress={() => navigation.navigate('Screen2Module2')} />

        </ScrollView>
    )
}

export default Screen1Module2

const styles = StyleSheet.create({})