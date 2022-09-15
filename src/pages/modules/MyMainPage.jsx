import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const MyMainPage = () => {
    const navigation = useNavigation();

    return (
        <View style={{margin:20}}>
            <Text>MyMainPage</Text>
            <Button title="Moduloo1" onPress={() => navigation.navigate('Module1')} />
            <Button title="Moduloo2" onPress={() => navigation.navigate('Module2')} />

        </View>
    )
}

export default MyMainPage

const styles = StyleSheet.create({})