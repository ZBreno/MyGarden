import React, { useState, useEffect, useRef } from "react";
import {styles} from "./styles";
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { PlantAlarm } from "../../components/PlantAlarm";
import { Plant } from "../../@types/plant";

export const Home: React.FC = () => {

    

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [plants, setPlants] = useState<Plant[]>([])
    const [plant, setPlant] = useState<Plant>({} as Plant)

    const save = async () => {
        try {
            const listOfPlants: Plant[] = [...plants]

            const json: Plant = {
                name: name,
                description: description,
            }

            listOfPlants.push(json)
            await AsyncStorage.setItem("@MyGarden", JSON.stringify(listOfPlants))
            setPlants(listOfPlants)
        } catch (err) {
            alert(err)
        }
    }

    const load = async () => {
        try {
            const response = await AsyncStorage.getItem("@MyGarden")

            if (response !== null) {
                const obj: Plant[] = JSON.parse(response)
                setPlants(obj)
            }
        } catch (err) {
            alert(err)
        }
    }


    useEffect(() => {
        load()
    }, [])

    const bottomSheetRef = useRef<BottomSheet>(null)

    const openSheet = (item: Plant) => {
        setPlant(item)
        bottomSheetRef.current?.expand()
    }

    const closeSheet = (): void => {
        bottomSheetRef.current?.close()
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerAddPlants}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#42464D', marginLeft: 5 }}>Adicionar uma nova planta</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.inputName}
                        placeholder="Insira o nome"
                        onChangeText={(name) => setName(name)}
                    />
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={styles.inputName}
                        placeholder="Insira a descrição"
                        onChangeText={(description) => setDescription(description)}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={save}>
                        <Text style={styles.textButton}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerMyPlants}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#42464D', marginLeft: 5 }}>Minhas plantas</Text>
            </View>

            <FlatList
                horizontal
                data={plants}
                keyExtractor={(key) => key.name}
                renderItem={({ item }) =>

                    <View style={styles.containerCard}>
                        <View style={styles.cardPlant}>
                            <Text style={{ fontWeight: 'bold', marginVertical: 10, fontSize: 24, color: '#42464D' }}>{item.name}</Text>
                            <Image
                                style={styles.image}
                                source={require('../../assets/plant.png')}
                            />

                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                            <View style={styles.water}>
                                <TouchableOpacity onPress={() => openSheet(item)}>

                                    <View style={styles.containerButton}>
                                    <Ionicons name="notifications" size={24} color="white" />
                                        <Text style={styles.textWater}>Hora de Regar</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>

                }




            />
           
           <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1, '60%']}
                index={0}
                handleIndicatorStyle={{ backgroundColor: '#138A63' }}
                backgroundStyle={{ backgroundColor: '#fff' }}
            >
                <PlantAlarm item={plant} close={closeSheet}/>
            </BottomSheet>


        </SafeAreaView >
    )
    
}

export default gestureHandlerRootHOC(Home)