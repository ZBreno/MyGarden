import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    containerText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        borderColor: '#138A63',
        borderRadius: 16,
        margin: 10,
        marginHorizontal: 40,

    },
    button:{
        paddingVertical: 20,
        backgroundColor: '#138A63',
        paddingHorizontal: 90,
        borderRadius: 15,
    },

    buttonBack: {
        marginTop: 20,
        
    },

    title: {
        width: 200,
        fontSize: 18,
        paddingVertical: 15,
        fontWeight: '500',
        textAlign: 'justify',


    },
    containerForm: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
    },
    inputName: {
        borderWidth: 0.5,
        padding: 5,
        width: '80%',

    },
})

export {styles}