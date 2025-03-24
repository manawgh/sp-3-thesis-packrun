import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mapcontainer: {
        height: 675,
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
        backgroundColor: 'rgba(11, 175, 74, 0.88)',
        borderRadius: 16,
        marginBottom: 44,
        alignSelf: 'center',
        marginTop: 'auto'
    },
    stopbtn: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }],
        backgroundColor: 'rgba(238, 118, 62, 0.88)',
        borderRadius: 16,
        marginBottom: 44,
        alignSelf: 'center',
        marginTop: 'auto'
    },
    btntext: {
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default styles;