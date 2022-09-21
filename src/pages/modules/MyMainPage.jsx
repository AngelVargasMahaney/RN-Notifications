import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerFollowerID, registerIndieID } from 'native-notify';
import axios from 'axios'

const MyMainPage = () => {
    const navigation = useNavigation();
    const [miToken, setmiToken] = useState('TOKEN NO OBTENIDO')
    const getToken = async () => {
        const token = await AsyncStorage.getItem('email_user')
        console.log(token)
        setmiToken(`Bienvenido ${token}`)
    }

    const enviarNotification = (userMail) => {

        // setLoading(false)
        axios.post(`https://app.nativenotify.com/api/indie/notification`, {
            subID: `${miToken}`,
            appId: 3967,
            appToken: 'SbTjXeVrvA7CdDJSAyv7Up',
            title: 'Iniciado',
            message: `Logueado usueario: ${userMail.split('.')[0]}`,
            pushData: { screenName: "Name of Screen" }
        });

    }

    return (
        <View style={{ margin: 20 }}>
            <Text>MyMainPage</Text>
            <Button title="Obtener Token" onPress={() => getToken()} style={{ margin: 20 }} />
            <Text style={{ fontSize: 30, justifyContent: 'center', marginVertical: 10 }}>
                {miToken}
            </Text>

            <Button title="Setear" onPress={() => enviarNotification(miToken)} />

            <View style={{ marginTop: 30 }}>
                <Button title="Moduloo1" onPress={() => navigation.navigate('Module1')} />
                <Button title="Moduloo2" onPress={() => navigation.navigate('Module2')} />
            </View>
        </View>
    )
}

export default MyMainPage

const styles = StyleSheet.create({})