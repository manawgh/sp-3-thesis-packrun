import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topdash: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingBottom: 10,
    },
    mapcontainer: {
        height: 640,
        width: '100%',        
    },
    mapview: {
        flex: 1,
    },
    dashtext: {
        marginTop: 7,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Roboto',
    },
    startbtn: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }],
        backgroundColor: 'rgba(236, 97, 35, 0.88)',
        borderRadius: 16,
        marginBottom: 44,
        alignSelf: 'center',
        marginTop: 'auto'
    },
    startbtntext: {
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default styles;