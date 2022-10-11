import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerFollowerID, registerIndieID } from 'native-notify';
import axios from 'axios'
import { useEffect } from 'react';
import { useRef } from 'react';
import * as Notifications from 'expo-notifications'

const MyMainPage = () => {

    const [miTokenFinal, setMiTokenFinal] = useState('')


    const navigation = useNavigation();

    const obtenerToken = async () => {
        let tokenF = await AsyncStorage.getItem('expo_token')
        setMiTokenFinal(tokenF)
    }

    useEffect(() => {
        obtenerToken()
    }, [])

    console.log("MI TOKEN FINAL, EN MI MYMAINPAGE ES: ", miTokenFinal)
    // const enviarNotification = (userMail) => {

    //     // setLoading(false)
    //     axios.post(`https://app.nativenotify.com/api/indie/notification`, {
    //         subID: `${miToken}`,
    //         appId: 3967,
    //         appToken: 'SbTjXeVrvA7CdDJSAyv7Up',
    //         title: 'Iniciado',
    //         message: `Logueado usueario: ${userMail.split('.')[0]}`,
    //         pushData: { screenName: "Name of Screen" }
    //     });
    // }

    return (
        <View style={{ margin: 20 }}>
            <Text>MyMainPage</Text>
            <Button title="Obtener Token" onPress={() => getToken()} style={{ margin: 20 }} />
            <Text style={{ fontSize: 30, justifyContent: 'center', marginVertical: 10 }}>
                {miTokenFinal}
            </Text>

            <Button title="Setear" onPress={() => enviarNotification(miTokenFinal)} />

            <View style={{ marginTop: 30 }}>
                <Button title="Moduloo1" onPress={() => navigation.navigate('Module1')} />
                <Button title="Moduloo2" onPress={() => navigation.navigate('Module2')} />
                <Button title="Moduloo3" onPress={() => navigation.navigate('Module3')} />
            </View>
        </View>
    )
}

export default MyMainPage

const styles = StyleSheet.create({})