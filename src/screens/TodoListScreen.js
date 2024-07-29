import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback';

const TodoListScreen = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);

    // Function to fetch todo list from AsyncStorage
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

    // Function to save todo list to AsyncStorage
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
            return;
        }
        const newTodo = { id: Date.now().toString(), title: todo };
        const updatedTodoList = [...todoList, newTodo];
        setTodoList(updatedTodoList);
        setTodo('');
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

    const renderTodos = ({item, index}) => {
        return (
            <View style={styles.renderTodosView}>
                <Text style={{
                        color: '#FFF',
                        fontSize: 20,
                        fontWeight: 800,
                        flex: 1
                    }}>{item.title}
                </Text>
                <IconButton iconColor='#fff' icon="pencil" onPress={() => handleEditTodo(item)}/>
                <IconButton iconColor='#fff' icon = "trash-can" onPress={() => handleDeleteTodo(item.id)} />
            </View>
        )
    }

    return (
        <View style={{alignItems: 'stretch'}}>
            <TextInput
                style={{borderWidth: 2,
                    borderRadius: 8,
                    borderColor: "#337ab7",
                    paddingVertical: 8,
                    paddingHorizontal: 16
                }}
                placeholder='Add New Task'
                value = { todo }
                onChangeText={(userText) => setTodo(userText)}
            />
            {
                editedTodo ? 
                    <TouchableOpacity style={{backgroundColor: '#000',
                        paddingVertical: 8,
                        alignItems: 'center',
                        marginVertical: 30,
                        marginBottom: 90,
                        borderRadius: 8
                    }}
                        onPress={() => handleUpdateTodo()}
                    
                    >
                        <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20
                        }}>Save</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{backgroundColor: '#000',
                        paddingVertical: 8,
                        alignItems: 'center',
                        marginVertical: 30,
                        marginBottom: 90,
                        borderRadius: 8
                    }}
                        onPress={() => handleAddTodo()}
                    >
                        <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20
                        }}>Add</Text>
                    </TouchableOpacity>
            }
            <FlatList 
                data={todoList}
                renderItem={renderTodos}
            />
            {
                todoList.length <= 0 && <Fallback/>
            }
        </View>
    )
}

export default TodoListScreen

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    simpleShadow: {
        borderTopWidth: 0.5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderRightColor: 'rgba(0,0,0,0.2)',
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderLeftColor: 'rgba(0,0,0,0.1)',

        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10
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
    }
})