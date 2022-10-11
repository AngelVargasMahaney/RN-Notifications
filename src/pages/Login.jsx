import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input } from 'native-base';
import { loginOfTemplate } from '../services/AppServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'
import { useRef } from 'react';
import { useEffect } from 'react';

const LoginPage = () => {
    const [expoPushToken, setExpoPushToken] = useState('')

    const responseListener = useRef();
    const notificationListener = useRef();
    const [notification, setNotification] = useState(false);

    const navigation = useNavigation();
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
    // console.log("MI TOKEN FINAL", expoPushToken)
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

    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('0')
    // const setIndieID = async () => {
    //     registerIndieID(`${dataLogin.email}`, 3967, SbTjXeVrvA7CdDJSAyv7Up)
    // }
    const Login = () => {
        loginOfTemplate(dataLogin).then((rpta) => {
            setLoading(true);
            // console.log(rpta)
            if (rpta.status === 200) {
                AsyncStorage.setItem('token', rpta.data.token)
                AsyncStorage.setItem('email_user', dataLogin.email)
                AsyncStorage.setItem('expo_token', expoPushToken)
                AsyncStorage.setItem('user_id', userId)
                setLoading(false)
                // axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                //     subID: `${dataLogin.email}`,
                //     appId: 3967,
                //     appToken: 'SbTjXeVrvA7CdDJSAyv7Up',
                //     title: 'Iniciado',
                //     message: 'Logueo correcto',
                //     pushData: { screenName: "Name of Screen" }
                // });

                navigation.navigate('Home')
            } else {
                alert('ERROR')
            }
        }).catch((err) => {
            alert('ERROR IN REQUEST', err)
        })
    }
    useEffect(() => {
     console.log("MI ESTO", userId) 
    })
    
    return (
        <View style={{ margin: 20 }}>
            <Text>MyLoginPage</Text>
            <Text>michael.lawson</Text>
            <FormControl.Label
                _text={{
                    bold: false,
                    color: 'dark.300',
                }}>
                Email
            </FormControl.Label>

            <Input
                defaultValue='eve.holt@reqres.in'
                borderColor={'#162349'}
                borderWidth={1.5}
                variant="outline"
                placeholder="--"
                onChangeText={(value) => setDataLogin({
                    ...dataLogin,
                    email: value
                })}
            />
            <FormControl.Label
                _text={{
                    bold: false,
                    color: 'dark.300',
                }}>
                Password
            </FormControl.Label>

            <Input
                defaultValue='cityslicka'
                borderColor={'#162349'}
                borderWidth={1.5}
                variant="outline"
                placeholder="--"
                onChangeText={(value) => setDataLogin({
                    ...dataLogin,
                    password: value
                })}
            />


            <Button _text={{
                color: "#162349",
                fontWeight: 'bold',

            }}
                disabled={false}
                onPress={() => Login()}>

                {
                    loading ? "Cargando" : "Ingresar"
                }
            </Button>
            <Button _text={{
                color: "#162349",
                fontWeight: 'bold',

            }}
                disabled={false}
                onPress={() => setUserId('7')}>

               SOY EL USER 7
            </Button>
            <Button _text={{
                color: "#162349",
                fontWeight: 'bold',

            }}
                disabled={false}
                onPress={() => setUserId('8')}>

               SOY EL USER 8
            </Button>
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({})