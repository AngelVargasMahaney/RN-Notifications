import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Module1Context from '../../../context/Module1Context';
import { CheckIcon, FormControl, Input, ScrollView, Select } from 'native-base';
import { getAllRiskAsociate, getAllUsers } from '../../../services/AppServices';
import * as Notifications from 'expo-notifications';

const Screen1Module1 = () => {

    const [loading, setLoading] = useState(false);
    const [misUsuarios, setMisUsuarios] = useState([])
    const [selectUsuarioNotification, setSelectUsuarioNotification] = useState('Seleccione un usuario')
    const navigation = useNavigation();
    const { objetoModule1, setObjetoModule1 } = useContext(Module1Context)
    console.log("OBJETOCONTEXT", objetoModule1)
    const [userID, setUserID] = useState(0)
    // console.log("EStoy en el SCreen 1 del modulo 1", objetoModule1)
    const [miData1, setMiData1] = useState({
        description1Data1: "",
        description2Data1: "",
    })


    const handleSubmitEquipos = () => {
        setObjetoModule1({
            ...objetoModule1,
            ...miData1
        })
        // console.log("MIDATA1", miData1)
    }

    const getUsersAll = () => {
        setLoading(true)
        getAllUsers().then((rpta) => {
            if (rpta.status == 200) {
                // console.log(rpta.data)
                setMisUsuarios(rpta.data)
            }
            setLoading(false)
            // console.log("Lista de cerdos", rpta)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getUsersAll()
    }, [])
    useEffect(() => {
        // console.log("MI USUARIO ID ES", userID)
    })


    // console.log(misUsuarios)


    const enviarNotifee = (idActualUser, idUserToNotify) => {
        // console.log("SOY EL USUARIO " + idActualUser + " Y LE ENVIARÉ UNA NOTIFICACIÓN AL USUARIO " + idUserToNotify)

    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
        handleSuccess: (response) => {
            alert(response)
        }
    });

    Notifications.scheduleNotificationAsync({
        content: {
            title: 'Look at that notification',
            body: "I'm so proud of myself!",
        },
        trigger: "SDWA",
    });

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    /*
    OBTENIENDO EL TOKEN DEL DISPOSITIVO
    
    */
    async function registerForPushNotificationsAsync() {
        let token;
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log(token);


        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        // console.log(token)
        return token;
    }
    // AQUI SE ACABA


    // ESTO ES PARA ENVIAR LA NOTIFCACION A UN SUSURIO X

    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: `El usuario ${userID} le envió un mensaje!`,
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }


    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            // console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const [myArrayPermisos, setMyArrayPermisos] = useState([
        {
            select_id: "",
            position_select: ""
        }
    ])

    const renderOptions = (objeto, j) => {
        // console.log("REDNER OBTIONS", objeto)
        return (
            <Select.Item key={j} value={objeto.id} label={objeto.name_user} />)
    }
    const handleAddPermisos = () => {
        const temp = [...myArrayPermisos]
        temp.push(
            {
                select_id: "",
                position_select: ""
            })
        setMyArrayPermisos(temp)

    }
    const handleDataPermisos = (name, value, index) => {
        const data = [...myArrayPermisos]
        data[index].position_select = index
        data[index][name] = value
    }


    const handleRemovePermisos = () => {
        const newValues = [...myArrayPermisos]
        newValues.splice(-1)
        setMyArrayPermisos(newValues)
    }


    // useEffect(() => {
    //     console.log("Mi Array Permisos", myArrayPermisos)
    // })
    //----------------> SERVICE RIESGOS ASOCIADAS ------------------------------------
    const [listRiesgos, setListRiesgo] = useState([]);
    const [selectedRiesgo, setSelectedRiesgo] = useState([])
    const [selectedRiesgoEnvio, setSelectedRiesgoEnvio] = useState([])

    const traerRiesgos = () => {
        getAllUsers().then(rpta => {
            //console.log('mi DATA RISKS')
            //console.log(rpta.data.data)
            setListRiesgo(rpta.data);
        })
    }
    const agregandoSelectRiesgo = (value, posPadre) => {
        const data = [...steps]
        data[posPadre].risk.push(value)

        // const search = objeto => selectedRiesgo.find(element => element.id === objeto);

        // const found = search(item2.id);


        // //console.log(found);
        // if (found) {
        //     //console.log('quitando')      
        //     setSelectedRiesgo(current =>
        //         current.filter(employee => {
        //             return employee.id !== item2.id;
        //         }),
        //     );
        //     //console.log(selectedRiesgo);
        //     traerRiesgos()
        // } else {
        //     //console.log('agregando')
        //     selectedRiesgo.push(item2)
        //     selectedRiesgo.sort(function (a, b) { return a.id - b.id })
        //     //console.log(selectedRiesgo)
        //     traerRiesgos()

        // }

        // if (selectedRiesgoEnvio.includes(item2.id)) {
        //     selectedRiesgoEnvio.splice(selectedRiesgoEnvio.indexOf(item2.id), 1)
        //     selectedRiesgoEnvio.sort(function (a, b) { return a - b })
        //     console.log(selectedRiesgoEnvio)
        // }
        // else {

        //     selectedRiesgoEnvio.push(item2.id)
        //     selectedRiesgoEnvio.sort(function (a, b) { return a - b })
        //     console.log(selectedRiesgoEnvio)

        // }


        //----------------> SOLO PARA ARRAY SIMPLE ------------------------------

    }




    useEffect(() => {
        traerRiesgos()
    }, [])

    const [elPadreDeTodo, setElPadreDeTodo] = useState(0)


    // ----------------------> ESTO SON MIS CONSTANTES PARA EL RENDERIZADO DINÁMICO DE DATOS <---------------------
    const [steps, setSteps] = useState([
        {
            description: '', risk: [], epp: [], control: []
        }
    ])
    const handleAddSteps = () => {

        let temp = []
        temp = [...steps]
        temp.push(
            {
                description: '', risk: [], epp: [], control: []
            }
        )
        setSteps(temp)

    }

    // ----------------------> END - ESTO SON MIS CONSTANTES PARA EL RENDERIZADO DINÁMICO DE DATOS <---------------------


    // ----------------------> ESTOS SON LOS MÉTODOS PARA REALIZAR EL SETEO DE DATOS DINÁMICO SEGUN EL ID DEL PADRE EN LOS SELECT <----------------------

    const handleStepDescription = (value, posPadre) => {
        let temp = [...steps]
        temp[posPadre].description = value
    }
    const [misRiesgosElegidos, setMisRiesgosElegidos] = useState([])
    const [misEppsElegidos, setMisEppsElegidos] = useState([])
    const handleOptionSelect = (value, posPadre, type) => {

        let temp = []
        let temp2 = []
        if (type === "Riesgos") {
            temp = [...misRiesgosElegidos]
            temp2 = steps[posPadre].risk
        } else if (type === "Epps") {
            temp = [...misEppsElegidos]
            temp2 = steps[posPadre].epp
        }
        temp[posPadre] = value
        if (!temp2.includes(value)) {
            temp2.push(temp[posPadre])
        } else {
            // temp2.splice(temp[posPadre])
            temp2.splice(temp2.indexOf(value), 1)
            temp2.sort(function (a, b) { return a - b })
        }
    }
    // ----------------------> END - ESTOS SON LOS MÉTODOS PARA REALIZAR EL SETEO DE DATOS DINÁMICO SEGUN EL ID DEL PADRE EN LOS SELECT<----------------------


    // ----------------------> ESTOS SON LOS MÉTODOS PARA REALIZAR EL SETEO DE DATOS DINÁMICO SEGUN EL ID DEL PADRE EN LOS INPUTS <----------------------
    // const [arrayCantidadInputsMedidas, setArrayCantidadInputsMedidas] = useState([
    //     { description: '', indexPadre: elPadreDeTodo }
    // ])
    const [arrayCantidadInputsMedidas, setArrayCantidadInputsMedidas] = useState([
        { description: '', indexPadre: elPadreDeTodo }]
    )
    const handleAddInputsMedidas = (indicePadre, objetoPadre) => {
        let temp = [...arrayCantidadInputsMedidas]
        temp.push(
            { description: '', indexPadre: indicePadre }
        )
        setArrayCantidadInputsMedidas(temp)

        objetoPadre.control.push({ description: '', indexPadre: indicePadre })


    }

    const handleDeleteInputsMedidas = (indicePadre, objetoPadre) => {
        console.log(objetoPadre)
        // const temp = objetoPadre
        // temp.control.splice(-1)

    }


    const handleDataInputMedidas = (objPadre, value, indexPequeno) => {

        console.log(objPadre)
        objPadre.description = value

    }
    // ----------------------> END - ESTOS SON LOS MÉTODOS PARA REALIZAR EL SETEO DE DATOS DINÁMICO SEGUN EL ID DEL PADRE EN LOS INPUTS <----------------------


    const MostrarEstructura = () => {
        console.log("MIOBJETOFINAL ES", steps)
        console.log("MISRIESGOS", misRiesgosElegidos)
        console.log("MISEEPSELEGIDOS", misEppsElegidos)
    }

    return (
        <ScrollView>
            {
                steps.map((objPadreTotal, posPadre) => {
                    return (
                        <View key={posPadre} style={{ margin: 30, borderWidth: 2, borderColor: 'blue' }}>
                            <Text>SOY EL STEP NÚMERO {posPadre}</Text>
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
                                onChangeText={(value) => { handleStepDescription(value, posPadre) }}
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
                    onChangeText={(value) => setMiData1({
                        ...miData1,
                        description2Data1: value
                    })}
                />
                            <Text style={{ margin: 20 }}>SEPARADOR</Text>


                            <View style={{ padding: 20, borderWidth: 2, borderColor: 'red' }}>
                    <Text>Your expo push token: {expoPushToken}</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Title: {notification && notification.request.content.title} </Text>
                        <Text>Body: {notification && notification.request.content.body}</Text>
                        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                    </View>
                    <Button
                        title="Press to Send Notification"
                        onPress={async () => {
                            await sendPushNotification(expoPushToken);
                        }}
                    />
                    <Button
                        title="ENVIANDO NOTI A OTRO"
                        onPress={async () => {
                            await sendPushNotification('ExponentPushToken[tpP3t7O1v9OWWFVnVgm-8O]');
                        }}
                    />
                </View>


                            {
                    loading ? <Text>ESTOY CARGANDO{JSON.stringify(misUsuarios)}</Text> : (
                        <View>
                            <Select selectedValue={selectUsuarioNotification} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => { setSelectUsuarioNotification(itemValue) }}>
                                {
                                    misUsuarios.map((obj) =>

                                        renderOptions(obj))
                                }

                            </Select>
                        </View>
                    )
                }
                            <View style={{ marginTop: 5 }}>
                                <FormControl.Label _text={{
                                    bold: false,
                                    color: 'dark.300'
                                }}>Riesgos asociados:</FormControl.Label>
                                <Select
                                    selectedValue=''
                                    placeholder='AGREGUE RIESGOS'
                                    _dark={{
                                        bg: "#F9F9F9"
                                    }}
                                    _light={{
                                        bg: "#F9F9F9",
                                        borderColor: '#162349',
                                        borderWidth: 1.5
                                    }}

                                    color="black"
                                    accessibilityLabel="-"
                                    _selectedItem={{
                                        bg: "white"
                                    }}
                                    onValueChange={value => handleOptionSelect(value, posPadre, 'Riesgos')}>
                                    {
                                        listRiesgos.map((data, i) => {
                                            return (
                                                <Select.Item key={i} label={data.name_user} value={data.id} />
                                            )
                                        })}
                                </Select>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                {
                                    selectedRiesgo.map((data, i) => {
                                        return (
                                            <View key={i} style={{

                                                borderRadius: 10,
                                                backgroundColor: '#ffde59',
                                                margin: 3
                                            }}>
                                                <Text style={{
                                                    margin: 2,
                                                    color: '#18234b',
                                                }}>{data.name_user}</Text></View>
                                        )
                                    })}
                            </View>
                            <Text>MIS EPPS</Text>
                            {
                                myArrayPermisos.map((obj, i) => {
                                    return (<Select key={i} selectedValue={''} minWidth="200" accessibilityLabel="Choose Service" placeholder="AGREGUE EPPS" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1}
                                        onValueChange={value => handleOptionSelect(value, posPadre, 'Epps')
                                        }>
                                        {
                                            misUsuarios.map((obj, j) =>
                                                renderOptions(obj, j))
                                        }

                                    </Select>
                                    )

                                })
                            }


                            <Button title="QUIERO SER 1" onPress={() => setUserID(1)} style={{ margin: 20 }} />
                <Button title="QUIERO SER 2" onPress={() => setUserID(2)} style={{ margin: 20 }} />

                <Button title="Enviar Notificación" onPress={() => enviarNotifee(userID, selectUsuarioNotification)} style={{ margin: 20 }} />

                            {/* <Button title="Agregar Permisos" onPress={() => handleAddPermisos()} style={{ margin: 20 }} />
                <Button title="Eliminar Permisos" onPress={() => handleRemovePermisos()} style={{ margin: 20 }} />
                <Button title="Enviar Información" onPress={() => handleSubmitEquipos()} style={{ margin: 20 }} /> */}
                            <Button title="Añadir Medidas" onPress={() => { handleAddInputsMedidas(posPadre, objPadreTotal), setElPadreDeTodo(posPadre) }} style={{ margin: 20 }} />
                            <Button title="Eliminar Medidas" onPress={() => { handleDeleteInputsMedidas(posPadre, objPadreTotal) }} style={{ margin: 20 }} />
                            {
                                objPadreTotal.control.map((objPadre, indexPadrePequeno) => {
                                    return (
                                        <View key={indexPadrePequeno}>
                                            <FormControl.Label
                                                _text={{
                                                    bold: false,
                                                    color: 'dark.300',
                                                }}>
                                                Medidas de Control
                                            </FormControl.Label>

                                            <Input
                                                borderColor={'#162349'}
                                                borderWidth={1.5}
                                                variant="outline"
                                                placeholder="--"
                                                onChangeText={(value) => handleDataInputMedidas(objPadre, value, indexPadrePequeno)}
                                            />
                                        </View>
                                    )
                                })
                            }

                        </View >
                    )

                })

            }
            <Button title="Añadir Más Steps" onPress={() => { handleAddSteps() }} style={{ margin: 20 }} />
            <Button title="MostrarEstrucutura" onPress={() => MostrarEstructura()} style={{ margin: 20 }} />

            <Button title="Screen2 - Moduloo1" onPress={() => navigation.navigate('Screen2Module1')} style={{ margin: 20 }} />
        </ScrollView >
    )
}

export default Screen1Module1

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});