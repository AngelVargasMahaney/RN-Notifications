import * as Device from 'expo-device';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import ReconnectingWebSocket from 'react-native-reconnecting-websocket';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => (
        {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true
        }
    )
})

const Screen2Module3 = () => {
    const [estadoConexion, setEstadoConexion] = useState('Conectando ...')
    const [mensajeEnviarAServidor, setMensajeEnviarAServidor] = useState('')
    const [bottonEnviar, setBottonEnviar] = useState(true)
    const [mensajesDelServidor, setMensajesDelServidor] = useState([])
    const [inputFieldEmpty, setInputFieldEmpty] = useState(true)
    const [expoPushToken, setExpoPushToken] = useState('')

    const [miLanzadorNotifi, setMiLanzadorNotifi] = useState([])
    // console.log("MI LANZADOR NOTIFI", miLanzadorNotifi)

    let options = {
        maxReconnectAttempts: 10,
        reconnectInterval: 100
    }

    const ws = new ReconnectingWebSocket("ws://20.122.144.190:6002/app/devSalares?protocol=7&client=js&version=7.0.6&flash=false", null, options);
    // const ws = new ReconnectingWebSocket("wss://demo.piesocket.com/v3/channel_2?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self");


    let userID = 7

    const apiCall = {
        "event": "pusher:subscribe",
        "data": {
            "auth": "",
            "activityTimeout": 10000,
            "channel": `notification-user-${userID}`
        }
    }
    const responseListener = useRef();
    const notificationListener = useRef();
    const [notification, setNotification] = useState(false);

    useEffect(() => {

        const mensajesServerTemp = []

        ws.onopen = (response) => {
            console.log("RESPONNSE IN OPEN SECOND COMPONENT", response)
            setEstadoConexion("CONECTADO AL SERVIDOR")
            setBottonEnviar(false)

            console.log("es SECOND COMPONENT", estadoConexion)
            if (estadoConexion == "CONECTADO AL SERVIDOR") {
                ws.send(JSON.stringify(apiCall))
            }

        };
        ws.onmessage = (rpta) => {
            console.log("RESPONSE SECOND COMPONENT", rpta)
            mensajesServerTemp.push(rpta.data)
            setMensajesDelServidor([...mensajesServerTemp])
        }

        ws.onclose = (e) => {
            setEstadoConexion("SE DESCONECTÓ SECOND COMPONENT")
            setBottonEnviar(true)
        };

        ws.onerror = (e) => {
            setEstadoConexion(e.message);
        };

        // if (miLanzadorNotifi.length > 2) {
        //     console.log("PIU PIU, se lanzó la notificación")
        //     setTimeout(() => {
        //         sendPushNotification2(expoPushToken)
        //     }, 5000);
        // }

        return (
            ws.close = (e) => {
                setEstadoConexion("SE DESCONECTÓ SECOND COMPONENT")
            }
        )

    }, [estadoConexion])

    useEffect(() => {
        console.log("MI TAMAÑO MENSAJES SERVER: ", mensajesDelServidor.length)
        if (mensajesDelServidor.length > 2) {
            console.log("PIU PIU, se lanzó la notificación")
            sendPushNotification2(expoPushToken)
        }
    }, [])


    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token)
        }).catch((err) => { console.error(err) })

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            // console.log(response);
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])

    const enviarMensaje = () => {
        ws.send(mensajeEnviarAServidor);
        setMensajeEnviarAServidor('')
        setInputFieldEmpty(true)
    }

    const agregarItemArreglo = () => {
        let temp = [...miLanzadorNotifi]
        temp.push({
            nombre: ''
        })
        setMiLanzadorNotifi(temp)
    }

    async function sendPushNotification2(expoPushToken, signature) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: `Data recibida de ${userID}`,
            data: signature,
        };
        // console.log("MI DATA ENVIADA", message.data)
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


    // // const triggerNotification = async () => {
    // //     const trigger = ''
    // //     try {
    // //         await Notifications.scheduleNotificationAsync({
    // //             content: {
    // //                 title: 'Aviso de solicitud',
    // //                 body: 'El usuario x lo está solicitando'
    // //             },
    // //             trigger
    // //         })
    // //     } catch (e) {
    // //         alert("ERRROR EN EL METODO TRIGGERNOTIFICATION")
    // //     }
    // // }

    const registerForPushNotificationsAsync = async () => {
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
        console.log(token)
        return token;
    }




    return (
        <View>
            <Text>Screen2Module3</Text>

            <TouchableOpacity onPress={() => agregarItemArreglo()} style={[{ margin: 15, backgroundColor: '#18588F', justifyContent: 'center', alignItems: 'center', padding: 7, borderRadius: 5 }]}>
                <Text style={{ color: 'white' }}>Agregar Items miLanzadorNotifi</Text>
            </TouchableOpacity>
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
        </View>
    )
}

export default Screen2Module3

const styles = StyleSheet.create({})