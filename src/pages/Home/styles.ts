import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    containerAddPlants: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 20,
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    label: {
        fontWeight: '500',
        marginBottom: 5,

    },
    inputName: {
        borderWidth: 0.5,
        padding: 5,
        paddingLeft: 10,
        width: 340,
        borderRadius: 8,
        borderColor: '#42464D',
        color: '#42464D',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#138A63',
        width: 340,
        marginTop: 10,
        borderRadius: 8,
    },
    textButton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 8,
        elevation: 5,
    },
    containerCard: {

        marginHorizontal: 10,
        marginTop: 10,
    },
    cardPlant: {
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 16,
        width: 160,
        height: 300,

    },
    image: {
        width: 80,
        height: 100,
    },
    description: {
        fontSize: 14,
        marginHorizontal: 5,
        marginTop: 10,
        textAlign: 'justify',
        fontWeight: '500',
        color: '#42464D',
        height: 85,
    },
    water: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#138A63',
        width: 160,
        marginTop: 'auto',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },

    textWater: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,

    },
    containerButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    containerMyPlants: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40,
        marginLeft: 20,
    }
})

export {styles}