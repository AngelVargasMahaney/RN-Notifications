import React, { Component, useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ScrollView,
    TextInput,
} from 'react-native';
import { Constants } from 'expo';
import ReconnectingWebSocket from 'react-native-reconnecting-websocket';

export default function App() {
    const [estadoConexion, setEstadoConexion] = useState('Conectando ...')
    const [mensajeEnviarAServidor, setMensajeEnviarAServidor] = useState('')
    const [bottonEnviar, setBottonEnviar] = useState(true)
    const [mensajesDelServidor, setMensajesDelServidor] = useState([])
    const [inputFieldEmpty, setInputFieldEmpty] = useState(true)

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
    useEffect(() => {

        const mensajesServerTemp = []

        ws.onopen = (response) => {
            console.log("RESPONNSE IN OPEN", response)
            setEstadoConexion("CONECTADO AL SERVIDOR")
            setBottonEnviar(false)

            console.log("es", estadoConexion)
            if (estadoConexion == "CONECTADO AL SERVIDOR") {
                ws.send(JSON.stringify(apiCall))
            }

        };
        ws.onmessage = (rpta) => {
            console.log("RESPONSE", rpta)
            mensajesServerTemp.push(rpta.data)
            setMensajesDelServidor([...mensajesServerTemp])
        }

        ws.onclose = (e) => {
            setEstadoConexion("SE DESCONECTÓ")
            setBottonEnviar(true)
        };

        ws.onerror = (e) => {
            setEstadoConexion(e.message);
        };

    }, [estadoConexion])

    const enviarMensaje = () => {
        ws.send(mensajeEnviarAServidor);
        setMensajeEnviarAServidor('')
        setInputFieldEmpty(true)
    }

    return (
        <View style={styles.container}>
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
                <ScrollView>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingTop: 30,
        padding: 8,
    },

});

