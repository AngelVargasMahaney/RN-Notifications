import React, { Component, useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    // Button,
    ScrollView,
    TextInput,
} from 'react-native';
import { Constants } from 'expo';
import ReconnectingWebSocket from 'react-native-reconnecting-websocket';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'
import * as TaskManager from 'expo-task-manager'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getPushDataObject, registerIndieID } from 'native-notify';
import { CheckIcon, FormControl, Input, Select, Modal, Button } from 'native-base';


const Screen1Module3 = () => {
    let pushDataObject = getPushDataObject()
    let longitudArr = Object.keys(pushDataObject).length
    const [estadoConexion, setEstadoConexion] = useState('Conectando ...')
    const [tokenFinalEsto, setTokenFinalEsto] = useState('')
    const [mensajeEnviarAServidor, setMensajeEnviarAServidor] = useState('')
    const [bottonEnviar, setBottonEnviar] = useState(true)
    const [mensajesDelServidor, setMensajesDelServidor] = useState([])
    const [inputFieldEmpty, setInputFieldEmpty] = useState(true)
    const [piupiu, setPiupiu] = useState('No Notify')
    const [miIdUsuario, setMiIdUsuario] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const ayuda = useRef(false)

    const obtenerToken = async () => {
        let myToken = await AsyncStorage.getItem('token')
        let userTemp = await AsyncStorage.getItem('user_id')
        console.log("USER TEMP ES IGUAL A: ", userTemp)
        // await registerIndieID(`${myToken}`, 4186, 'KTKh4FLPSogRjuzjdDrwkQ');

        setTokenFinalEsto(myToken)
        setMiIdUsuario(userTemp)
    }
    useEffect(() => {
        obtenerToken()
    }, [])

    let options = {
        maxReconnectAttempts: 10,
        reconnectInterval: 100
    }

    const ws = new ReconnectingWebSocket("ws://20.122.144.190:6002/app/devSalares?protocol=7&client=js&version=7.0.6&flash=false", null, options);
    // const ws = new ReconnectingWebSocket("wss://demo.piesocket.com/v3/channel_2?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self");


    let userID = miIdUsuario
    const [notifyIsTriggered, setNotifyIsTriggered] = useState(false)
    const apiCall = {
        "event": "pusher:subscribe",
        "data": {
            "auth": "",
            "activityTimeout": 10000,
            "channel": `notification-user-${userID}`
        }
    }

    // let likethis = false

    useEffect(() => {


        ws.onopen = (response) => {
            // console.log("RESPONNSE IN OPEN", response)
            setEstadoConexion("CONECTADO AL SERVIDOR")
            setBottonEnviar(false)

            console.log("es", estadoConexion)
            // if (estadoConexion == "CONECTADO AL SERVIDOR") {
            ws.send(JSON.stringify(apiCall))
            // }

        };
        const mensajesServerTemp = []
        ws.onmessage = (rpta) => {
            // console.log("RESPONSE", rpta)
            let comparar = JSON.parse(rpta.data)
            mensajesServerTemp.push(rpta.data)
            setMensajesDelServidor([...mensajesServerTemp])
            if (comparar.event == 'App\\Events\\AplicacionNotificacion\\AppNotificate') {
                console.log("PIU PIU, se lanzó la notificación")
                setPiupiu("PIU PIU, notificación activada")
                // likethis = true;
                axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                    subID: `${tokenFinalEsto}`,
                    appId: 4186,
                    appToken: 'KTKh4FLPSogRjuzjdDrwkQ',
                    title: 'SOLICITUD FIRMA',
                    message: 'EL USUARIO: CERDO ESTÁ SOLICITANDO SU FIRMA EN: ART',
                    pushData: `${comparar.data}`
                });
                // setContador(++contador)

                // console.log("NOTIFY TRIGGERED IN LINE 95: ", notifyIsTriggered)

                // sendPushNotification(tokenFinalEsto)
            }
            ayuda.current = true;

        }
        ws.onclose = (e) => {
            setEstadoConexion("SE DESCONECTÓ")
            setBottonEnviar(true)
        };

        ws.onerror = (e) => {
            setEstadoConexion(e.message);
        };
    }, [estadoConexion])



    const lanzarNotify = () => {
        console.log("LONGITUD ARREGLO", longitudArr)

        if (ayuda.current == true) {
            console.log("MI LINEA 116 -> Data object actual según el click:", pushDataObject)
            setModalVisible(true)
            // alert("Porfa")
        }
    }
    useEffect(() => {
        lanzarNotify()

    }, [pushDataObject])




    // useEffect(() => {
    //     const ss = () => alert("aw")
    //     if (longitudArr > 0) {
    //         ss()
    //     }
    //     // lanzarNotify()
    //     // if (pushDataObject.isTriggered == 'Yes') {
    //     //     console.log("MI LINEA 1121", pushDataObject)
    //     //     alert("Porfa")
    //     // }
    //     // console.log("PUBOJECT", Object.keys(pushDataObject).length)
    //     // if (ayuda == true && Object.keys(pushDataObject).length > 0) {
    //     //     alert("Necesito")

    //     // console.log("MI LINEA 116", pushDataObject)
    //     console.log("adwdawwa")

    //     // }
    // }, [pushDataObject, ayuda])

    // console.log("TAMAÑO MENSAJES SERVER", mensajesDelServidor.length)

    const enviarMensaje = () => {
        ws.send(mensajeEnviarAServidor);
        setMensajeEnviarAServidor('')
        setInputFieldEmpty(true)
    }


    // ---------------------------------------------------------------> ESTO ES DE LAS NOTIFICACIONES <--------------------------------------------------------------- 
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Modal isOpen={modalVisible} onClose={setModalVisible} size={'md'}>
                <Modal.Content maxH="212">
                    <Modal.CloseButton />
                    <Modal.Header>Notificación</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <Text>
                                El Usuario Pedro está realizando el ART y necesita su aprobación. De este objeto:
                                {pushDataObject.user_destiny_id}
                            </Text>
                        </ScrollView>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: 'center' }}>
                        <Button.Group space={8}>
                            <Button onPress={() => {
                                setModalVisible(false);
                            }}>
                                Rechazar
                            </Button>
                            <Button onPress={() => {
                                setModalVisible(false);
                            }}>
                                Verificar
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            {/* <Button title="Screen2 - Moduloo3" onPress={() => navigation.navigate('Screen2Module3')} style={{ margin: 20 }} /> */}
            <View style={{
                height: 30,
                backgroundColor: '#eeceff',
                padding: 5
            }}>
                <Text>{estadoConexion}</Text>
            </View>

            <View style={{
                backgroundColor: '#ffeece',
                padding: 5,
                flexGrow: 1
            }}>
                <Text>{piupiu}</Text>
                <ScrollView style={{ margin: 10, marginBottom: 20 }}>
                    {
                        mensajesDelServidor.map((item, index) => {
                            return (
                                <Text key={index}>{item}</Text>
                            )
                        })
                    }
                </ScrollView>
            </View>

            <View style={{
                flexDirection: 'row',

            }}>
                <TextInput style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    flexGrow: 1,
                    padding: 5,
                }}
                    placeholder={'Add Message'}
                    onChangeText={text => {
                        setMensajeEnviarAServidor(text)
                        setInputFieldEmpty(text.length > 0 ? false : true)
                    }}
                    value={mensajeEnviarAServidor}
                />
                <Button
                    onPress={enviarMensaje}
                    title={'Submit'}
                    disabled={bottonEnviar || inputFieldEmpty}
                />
            </View>

        </View>
    );
}

export default Screen1Module3
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingTop: 30,
        padding: 8,
    },

});

