import { StyleSheet } from "react-native";

export default StyleSheet.create({
  messageBubble: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '80%',
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
    position: 'absolute',
    bottom: -34
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
    backgroundColor: '#3B98FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flex: 1,
    width: '100%',
    height: 1,
    position: 'relative'
  },
  topdash: {
      width: '100%',
      height: 50,
      backgroundColor: '#f8f8f8',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10
  },
  dashtext: {
      marginTop: 7,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      fontFamily: 'Roboto',
  }
});

