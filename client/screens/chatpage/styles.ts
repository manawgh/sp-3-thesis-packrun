import { StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         height: 776,
//         backgroundColor: 'lightgrey',
//     },
//     topdash: {
//         width: '100%',
//         height: 116,
//         backgroundColor: '#f8f8f8',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         paddingBottom: 10
//     },
//     dashtext: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         fontFamily: 'Roboto',
//     }
// });

// export default styles;

export default StyleSheet.create({
container: {
    width: '100%',
    height: 776,
    backgroundColor: 'lightgrey',
},
  messageBubble: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  topdash: {
    width: '100%',
    height: 116,
    backgroundColor: '#f8f8f8',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10
},
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
    dashtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto',
}
});

