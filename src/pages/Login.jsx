import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';

const LoginPage = () => {
    const navigation = useNavigation();

    return (
        <View style={{ margin: 20 }}>
            <Text>MyLoginPage</Text>
            <Button _text={{
                color: "#162349",
                fontWeight: 'bold',

            }}
                disabled={false}
                onPress={() => { navigation.navigate('Home') }}>

                IR
            </Button>
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({})