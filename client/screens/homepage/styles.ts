import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mapcontainer: {
        height: 640,
        width: '100%',        
    },
    mapview: {
        flex: 1,
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