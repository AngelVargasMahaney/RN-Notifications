import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input } from 'native-base';
import { loginOfTemplate } from '../services/AppServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerIndieID } from 'native-notify';

const LoginPage = () => {
    const navigation = useNavigation();

    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const setIndieID = async () => {
        registerIndieID(`${dataLogin.email}`, 3967, SbTjXeVrvA7CdDJSAyv7Up)
    }
    const Login = () => {
        loginOfTemplate(dataLogin).then((rpta) => {
            setLoading(true);
            // console.log(rpta)
            if (rpta.status === 200) {
                AsyncStorage.setItem('token', rpta.data.token)
                AsyncStorage.setItem('email_user', dataLogin.email)
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
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({})