import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Screen2Module2 = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Screen2Module2</Text>
            <Button title="Screen1 - Moduloo2" onPress={() => navigation.navigate('Screen1Module2')} />

        </View>
    )
}

export default Screen2Module2

const styles = StyleSheet.create({})