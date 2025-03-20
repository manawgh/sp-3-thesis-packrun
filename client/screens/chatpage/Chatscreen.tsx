import { Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './styles';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io } from 'socket.io-client';
// import {v4 as uuidv4} from 'uuid';

const socket = io();

export default function Chatscreen() {
    const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
    const [input, setInput] = useState('');

    
    useEffect(() => {
        socket.on('chat message', (message: { id: string; text: string }) => {
            setMessages(prev => [...prev, message]);
        });
        
        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = () => {
    if (input.trim() !== '') {
            const message = {date: Date.now().toString(), text: input};
            socket.emit('send message', message);
            setMessages([...messages, { id: Date.now().toString(), text: input }]);
            setInput('');
        }
    };
    return (
        <>
        <SafeAreaView>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.topdash}>
                            <Text style={styles.dashtext}>Arrange a group run!</Text>
                        </View>
                        <FlatList
                            data={messages}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.messageBubble}>
                                    <Text style={styles.messageText}>{item.text}</Text>
                                </View>
                            )}
                            contentContainerStyle={{ flexGrow: 1 }} 
                        />
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Type a message..."
                                value={input}
                                onChangeText={setInput}
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </>
    )
}