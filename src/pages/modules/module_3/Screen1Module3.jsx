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

export default function App() {
    const [estadoConexion, setEstadoConexion] = useState('')
    const ws = new WebSocket("ws://20.122.144.190:6002/app/devSalares?protocol=7&client=js&version=7.0.6&flash=false");

    const apiCall = {
        "event": "pusher:subscribe",
        "data": {
            "auth": "",
            "activityTimeout": 10000,
            "channel": "notification-user-8"
        }
    }
    useEffect(() => {
        ws.onopen = (response) => {
            console.log("CONECTED TO SERVER", response)
            setEstadoConexion("CONECTADO AL SERVIDOR")
            ws.send(JSON.stringify(apiCall));
        };
        ws.onclose = (e) => {
            setEstadoConexion("SE DESCONECTÓ")

        };

        ws.onerror = (e) => {
            setEstadoConexion(e.message);
        };
    }, [])

    return (
        <View style={styles.container}>
            <Text>Screen Websockets</Text>
            <Text>{estadoConexion}</Text>
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
