import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback';

const TodoListScreen = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);

    const fetchTodoList = async () => {
        try {
            const storedTodoList = await AsyncStorage.getItem('@MyTodoList');
            if (storedTodoList !== null) {
                setTodoList(JSON.parse(storedTodoList));
            }
        } catch (error) {
            console.error('Error fetching todo list:', error);
        }
    };

    const saveTodoList = async (list) => {
        try {
            await AsyncStorage.setItem('@MyTodoList', JSON.stringify(list));
        } catch (error) {
            console.error('Error saving todo list:', error);
        }
    };

    useEffect(() => {
        fetchTodoList();
    }, []);

    useEffect(() => {
        saveTodoList(todoList);
    }, [todoList]);

    const handleAddTodo = () => {
        if (todo === "") {
            alert('You must enter a todo first!');
            return;
        }
        const newTodo = { id: Date.now().toString(), title: todo, finishedColor: 'red' };
        const updatedTodoList = [...todoList, newTodo];
        setTodoList(updatedTodoList);
        setTodo('');
    };

    const handleToggleFinishTodo = (id) => {
        const updatedTodoList = todoList.map((item) => {
            if (item.id === id) {
                const newColor = item.finishedColor === 'red' ? '#fff' : 'red';
                return { ...item, finishedColor: newColor };
            }
            return item;
        });
        setTodoList(updatedTodoList);
    };

    const handleEditTodo = (todo) => {
        setEditedTodo(todo);
        setTodo(todo.title);
    };

    const handleUpdateTodo = () => {
        const updatedTodoList = todoList.map((item) =>
            item.id === editedTodo.id ? { ...item, title: todo } : item
        );
        setTodoList(updatedTodoList);
        setEditedTodo(null);
        setTodo("");
    };

    const handleDeleteTodo = (id) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    };

    const renderTodos = ({ item }) => {
        return (
            <View style={styles.renderTodosView}>
                <Text style={styles.todoText}>{item.title}</Text>
                <IconButton iconColor={item.finishedColor} size={32} icon="check" onPress={() => handleToggleFinishTodo(item.id)} />
                <IconButton iconColor='#fff' icon="pencil" onPress={() => handleEditTodo(item)} />
                <IconButton iconColor='#fff' icon="trash-can" onPress={() => handleDeleteTodo(item.id)} />
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Add New Task'
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />
            {editedTodo ? 
                <TouchableOpacity style={styles.button} onPress={handleUpdateTodo}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            }
            <FlatList 
                data={todoList}
                renderItem={renderTodos}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Fallback />}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    )
}

export default TodoListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#337ab7",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    flatListContent: {
        flexGrow: 1,
    },
    renderTodosView: {
        backgroundColor: '#1e90ff',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 16,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1,
        borderTopWidth: 0.5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderRightColor: 'rgba(0,0,0,0.2)',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderLeftColor: 'rgba(0,0,0,0.1)',
    },
    todoText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
        flex: 1,
    },
});



