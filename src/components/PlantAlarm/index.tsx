import { Text, StyleSheet, View, SafeAreaView, Platform, Button, Alert, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Device from 'expo-device';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import { styles } from './styles';
import { Plant } from '../../@types/plant';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

interface PlantAlarmProps extends Plant {
    item: Plant,
    close: () => void,
}

const PlantAlarm  = ({item, close}: PlantAlarmProps) => {

  
    const [date, setDate] = useState<Date>(new Date())
    const [show, setShow] = useState<boolean>(false)
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();
    const navigation = useNavigation();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        // return () => {
        //     Notifications.removeNotificationSubscription(notificationListener?.current);
        //     Notifications.removeNotificationSubscription(responseListener?.current);
        // };
    }, []);

    const showDateTimePicker = () => {
        setShow(true);
    }

    const hideDateTimePicker = () => {
        setShow(false);
    }

    const handleDateTimePicker = (event: DateTimePickerEvent, datetime: Date) => {

       
        if (event.type === "dismissed") {
            hideDateTimePicker()
            return
        }

        const currentTime = Date.now();

        if (datetime.getTime() < currentTime) {
            Alert.alert("Por favor, escolha uma hora futura")
            hideDateTimePicker()

            return
        }
       

        const seconds = ((datetime.getTime() - currentTime) / 1000)
        schedulePushNotification(seconds, item.name)
        hideDateTimePicker()
        Alert.alert("Alarme marcado com sucesso!")

    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerText}>

            <Image
                style={{width: 80, height: 100}}
                source = {require('../../assets/plant.png')}
            />

            <Text
                style={{ fontWeight: 'bold', marginVertical: 15, fontSize: 20,}}
            >
                {item.name}
            </Text>

            <Text
                style={{ textAlign: 'justify'}}
            >
                {item.description}
            </Text>




            </View>
            <View style={styles.containerForm}>

                <TouchableOpacity onPress={() => showDateTimePicker()} style={styles.button}>
                {/* <Button
                        title="Press to schedule a notification"
                        onPress={async () => {
                            await schedulePushNotification();
                        }}
                    /> */}
                    <Text
                        style={{color: 'white', fontWeight: 'bold', fontSize: 16}}
                    >Definir Lembrete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={close} style={styles.buttonBack}>
                {/* <Button
                        title="Press to schedule a notification"
                        onPress={async () => {
                            await schedulePushNotification();
                        }}
                    /> */}
                    <Text
                        style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10,}}
                    >Voltar</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    mode={'time'}
                    isVisible={show}
                    onChange={handleDateTimePicker}
                    value={date}

                />
            )}


        </SafeAreaView>
    )
}

async function schedulePushNotification(seconds: number, name: string) {
    
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Hora de Regar",
            body: `${name} precisa de agua`,
            data: { data: 'goes here' },
        },
        trigger: {

            seconds: seconds,

        },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
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
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}


export {PlantAlarm}