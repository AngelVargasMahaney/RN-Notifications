import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Modal } from 'native-base';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const Screen2Module2 = () => {
    const [misUsuarioa, setMisUsuarioa] = useState([
        {
            id_user: 0,
            name_user: '',
            audio: ''
        }
    ])
    const [audios, setAudios] = useState([
        {
            audio: '',
            audio_id: '',
            isRecording: false,
            isPlaying: false,
            visible: '',
            duration: 0,
            sound: '',
            actualTempo: duracionActual,
            generalMethods: ''
        }
    ])
    const navigation = useNavigation();


    const handleAddUsuario = () => {
        let temp = [...misUsuarioa];
        let tempAudio = [...audios];
        temp.push({
            id_user: 0,
            name_user: '',
            audio: '',
        })
        tempAudio.push({
            audio: '',
            audio_id: '',
            isRecording: false,
            isPlaying: false,
            visible: '',
            duration: 0,
            sound: '',
            actualTempo: duracionActual,
            generalMethods: ''
        })
        setMisUsuarioa(temp)
        setAudios(tempAudio)
    }
    const handleDeleteUsuario = () => {
        let temp = [...misUsuarioa];
        temp.splice(-1)
        setMisUsuarioa(temp)
    }
    const handleChangeInputUsuarios = (tag, index, value) => {
        let temp = [...misUsuarioa];
        temp[index][tag] = value
        setMisUsuarioa(temp)
    }


    //                 PARTE DEL AUDIO                           //
    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);
    const [message, setMessage] = useState("");
    const startRecording = async (index) => {
        let temp = [...audios]
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                temp[index].audio_id = index
                temp[index].audio = recording
                temp[index].isRecording = true


                setMisUsuarioa(temp)
                setRecording(recording);
            } else {
                setMessage("Please grant permission to app to access microphone");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }
    const stopRecording = async (index) => {
        let temp = [...audios]
        // temp[index].audio_id = index
        temp[index].audio = undefined
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        // console.log("ELSTATUSSSS", status);
        temp[index].generalMethods = status
        temp[index].audio = recording.getURI()
        temp[index].isRecording = false
        // temp[index].duration = getDurationFormatted(status.durationMillis)
        temp[index].duration = status.durationMillis
        // console.log("TIEMPO ACTUALwdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaw", status.durationMillis);
        temp[index].actualTempo = status.positionMillis
        temp[index].sound = sound
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            // duration: status.durationMillis,
            file: recording.getURI()
        });
        setMisUsuarioa(temp)
        setRecordings(updatedRecordings);
    }

    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }
    //              END ---PARTE DEL AUDIO---   END                        //
    const [duracionActual, setDuracionActual] = useState(0)
    const UpdateStatus = async (data) => {
        try {

            if (data.positionMillis) {
                let pos = data.positionMillis
                if (data.durationMillis) {
                    setDuracionActual(pos)
                }
            }
        } catch (error) {
            console.log('Error');
        }
    };
    const playRecorder = async (index) => {
        let temp = [...audios]
        try {
            const result = await temp[index].sound.replayAsync();
            if (result.isLoaded) {
                if (result.isPlaying === false) {

                    temp[index].sound.playAsync();
                    temp[index].sound.setOnPlaybackStatusUpdate(UpdateStatus)
                    temp[index].isPlaying = true
                }
                if (temp[index].duration == temp[index].actualTempo) {
                    temp[index].isPlaying = false
                }

            }


        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        console.log("MIS AUDIOS", audios)
    })
    const calcularPosicion = (index) => {
        let temp = [...audios]
        var res = temp[index].actualTempo / temp[index].duration
        console.log(res)
    }
    useEffect(() => {
        calcularPosicion(0)
    }, [])

    const [currentTempoBar, setCurrentTempoBar] = useState(0)
    const [cerdotte, setCerdotte] = useState(0)
    return (
        <ScrollView>
            <Text>Screen2Module2</Text>
            <Button title="Screen1 - Moduloo2" onPress={() => navigation.navigate('Screen1Module2')} />
            {/* <SText>{message}</SText> */}
            {/* <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording} />
            {getRecordingLines()} */}
            <StatusBar style="auto" />


            <View style={{ borderWidth: 1.5, borderColor: 'blue', margin: 20 }}>
                {
                    misUsuarioa.map((objMisUsuarios, idMisUsuarios) => {
                        return (

                            <View key={idMisUsuarios} style={{ margin: 20 }}>
                                <Text>
                                    Nombre
                                </Text>
                                <TextInput
                                    style={{ borderColor: 'red', borderWidth: 2 }}
                                    onChangeText={(value) => handleChangeInputUsuarios('name_user', idMisUsuarios, value)}
                                />
                                <Text>
                                    {objMisUsuarios.name_user}
                                </Text>

                                <Button
                                    title={audios[idMisUsuarios].isRecording ? 'Stop Recording' : 'Start Recording'}
                                    onPress={audios[idMisUsuarios].isRecording ? () => stopRecording(idMisUsuarios) : () => startRecording(idMisUsuarios)} />
                                {/* <Button onPress={() => audios[idMisUsuarios].sound.replayAsync()} title="Play"></Button> */}
                                <Button onPress={() => playRecorder(idMisUsuarios)} title="Play"></Button>
                                <View style={{ marginTop: 20, justifyContent: 'center' }}>
                                    <View style={{alignItems:'center'}}>
                                        <FontAwesomeIcon name='play-circle' size={30} color={'#162349'} />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>{currentTempoBar ? getDurationFormatted(currentTempoBar) : getDurationFormatted(duracionActual)}</Text>
                                        {/* <Text>{duracionActual}</Text> */}
                                        {/* <Text>{getDurationFormatted(audios[idMisUsuarios].duration)}</Text> */}
                                        <Text>{getDurationFormatted(audios[idMisUsuarios].duration)}</Text>
                                    </View>
                                </View>
                                {/* <Text> ss {}</Text> */}
                                {/* <Text>qq {duracionActual / 1000}</Text> */}
                                {/* <Text>{duracionActual}</Text> */}
                                <Slider
                                    style={{ flex: 1 }}
                                    value={duracionActual}
                                    minimumValue={0}
                                    maximumValue={audios[idMisUsuarios].duration}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(value) => {
                                        // console.log(value * audios[idMisUsuarios].duration);
                                        setCurrentTempoBar((value));
                                        // setCurrentTempoBar((value * duracionActual));

                                    }}
                                    onSlidingStart={
                                        () => {

                                        }
                                    }
                                    onSlidingComplete={(value) => {
                                        audios[idMisUsuarios].sound.playAsync()
                                        // console.log("CERDOOOOOTE", value);
                                        // alert(value);
                                        // setCurrentTempoBar(0)

                                    }}
                                />

                            </View>
                        )
                    })
                }
                <Button
                    title='Agregar un Usuario'
                    onPress={() => handleAddUsuario()} />
                <Button
                    title='Eliminar un Usuario'
                    onPress={() => handleDeleteUsuario()} />

            </View>
            <Button title="Screen3 - Moduloo2" onPress={() => navigation.navigate('Screen3Module2')} />

        </ScrollView >
    )
}

export default Screen2Module2

const styles = StyleSheet.create({})