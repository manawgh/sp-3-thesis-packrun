import { StyleSheet } from 'react-native';

const styles = {
  homePage: StyleSheet.create({
    
    mainContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center'
    },

    mapMessage: {
      marginTop: 40,
      width: "100%",
      flex: 1,
      backgroundColor: 'lightgreen',
      alignItems: "center",
      justifyContent: "center"
    },

    message: {
      fontSize: 20,
      fontWeight: "bold"
    },

    map: {
      width: '100%',
      flex: 10,
      backgroundColor: 'green',
      position: "relative"
    },

    vertButtonsContainer: {
      position: "absolute",
      bottom: 10,
      right: 15,
      height: '40%',
      justifyContent: 'space-evenly'
    },

    horButtonsContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly"
    },

    lowerButtonsView: {
      width: '100%',
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },

    buttonView: {
      borderRadius: '100%',
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'orange',
      minHeight: 100,
      minWidth: 100,
    },

    textButton: {
      fontWeight: "bold",
      color: 'white'
    },

  }),

  otherPage: StyleSheet.create({
  }),
}
export default styles;