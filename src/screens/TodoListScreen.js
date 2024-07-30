import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback';
import { fetchTodoList } from '../functions/fetchTodoList';
import { saveTodoList } from '../functions/saveTodoList';
import { handleAddTodo } from '../functions/handleAddTodo';
import { handleToggleFinishTodo } from '../functions/handleToggleFinishTodo';
import { handleEditTodo } from '../functions/handleEditTodo';
import { handleUpdateTodo } from '../functions/handleUpdateTodo';
import { handleDeleteTodo } from '../functions/handleDeleteTodo';
import { handlePress } from '../functions/handlePress';

const TodoListScreen = () => {
    const styles = require('../../assets/css/TodoScreenCSS');
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTodoList(setTodoList);
    }, []);

    useEffect(() => {
        saveTodoList(todoList);
    }, [todoList]);

    const renderTodos = ({ item }) => {
        return (
                <TouchableOpacity
                    style={styles.renderTodosView}
                    onPress={() => 
                        handlePress(item.description)
                    }
                >
                    <Text style={styles.todoText}>{item.title}</Text>
                    <IconButton iconColor={item.finishedColor} size={32} icon="check" onPress={() => handleToggleFinishTodo(item.id, todoList, setTodoList)} />
                    <IconButton iconColor='#fff' icon="pencil" onPress={() => handleEditTodo(item, setEditedTodo, setTodo, setDescription)} />
                    <IconButton iconColor='#fff' icon="trash-can" onPress={() => handleDeleteTodo(item.id, todoList, setTodoList)} />
                </TouchableOpacity>   
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Add New Task'
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />
            <TextInput 
                style={styles.input}
                placeholder='Add Description'
                value={description}
                onChangeText={(userText) => setDescription(userText)}
            />
            {editedTodo ? 
                <TouchableOpacity style={styles.button} onPress={() => handleUpdateTodo(todo, editedTodo, todoList, description, setDescription, setTodoList, setEditedTodo, setTodo)}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={() => handleAddTodo(todo, todoList, description, setTodo, setTodoList, setDescription)}>
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
    );
}

export default TodoListScreen;

