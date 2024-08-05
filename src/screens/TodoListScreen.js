import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback';
import Popup from '../components/Popup';
import ConfirmationPopup from '../components/ConfirmationPopup';
import { fetchTodoList } from '../functions/fetchTodoList';
import { saveTodoList } from '../functions/saveTodoList';
import { handleAddTodo } from '../functions/handleAddTodo';
import { handleToggleFinishTodo } from '../functions/handleToggleFinishTodo';
import { handleEditTodo } from '../functions/handleEditTodo';
import { handleUpdateTodo } from '../functions/handleUpdateTodo';
import { handleDeleteTodo } from '../functions/handleDeleteTodo';
import { handlePress } from '../functions/handlePress';
import { handleCancelEdit } from '../functions/handleCancelEdit';

const TodoListScreen = () => {
    const styles = require('../../assets/css/TodoScreenCSS');
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
    const [description, setDescription] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupDescription, setPopupDescription] = useState("");
    const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);
    const [todoToDeleteTitle, setTodoToDeleteTitle] = useState(""); // State for the title of the todo to delete

    useEffect(() => {
        fetchTodoList(setTodoList);
    }, []);

    useEffect(() => {
        saveTodoList(todoList);
    }, [todoList]);

    const closePopup = () => {
        setPopupVisible(false);
        setPopupDescription("");
    };

    const confirmDeleteTodo = async () => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== todoToDelete);
        setTodoList(updatedTodoList);
        await saveTodoList(updatedTodoList);
        setConfirmPopupVisible(false);
        setTodoToDelete(null);
        setTodoToDeleteTitle(""); // Reset the title
    };

    const cancelDeleteTodo = () => {
        setConfirmPopupVisible(false);
        setTodoToDelete(null);
    };

    const renderTodos = ({ item }) => {
        return (
                <Pressable
                    style={styles.renderTodosView}
                    onPress={() => 
                        handlePress(item.description, setPopupDescription, setPopupVisible)
                    }
                >
                    <Text style={styles.todoText}>{item.title}</Text>
                    <IconButton iconColor={item.finishedColor} size={32} icon="check" onPress={() => handleToggleFinishTodo(item.id, todoList, setTodoList)} />
                    <IconButton iconColor='#fff' icon="pencil" onPress={() => handleEditTodo(item, setEditedTodo, setTodo, setDescription)} />
                    <IconButton iconColor='#fff' icon="trash-can" onPress={() => handleDeleteTodo(item.id, item.title, item.finishedColor, setTodoToDelete, setConfirmPopupVisible, setTodoToDeleteTitle)} />
                </Pressable>   
        );
    };

    return (
        <View style={styles.container}>
            <Text style={{alignSelf: 'center', fontSize: 22,fontWeight: 'bold', color: '#337AB7', paddingBottom: 15}}>Todo List</Text>
            <TextInput
                key={1}
                id='taskID'
                name={'task'}
                style={styles.input}
                placeholder='Add New Task'
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />
            <TextInput 
                key={2}
                id='descID'
                name={'description'}
                style={styles.input}
                placeholder='Add Description'
                multiline={true}
                rows={4}
                value={description}
                onChangeText={(userText) => setDescription(userText)}
            />
            {editedTodo ? 
                <>
                    <Pressable style={styles.button} onPress={() => handleUpdateTodo(todo, editedTodo, todoList, description, setDescription, setTodoList, setEditedTodo, setTodo)}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => handleCancelEdit(setEditedTodo, setTodo, setDescription)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                </>
                :
                <Pressable style={styles.button} onPress={() => handleAddTodo(todo, todoList, description, setTodo, setTodoList, setDescription)}>
                    <Text style={styles.buttonText}>Add</Text>
                </Pressable>
                
            }
            <FlatList 
                data={todoList}
                renderItem={renderTodos}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Fallback />}
                contentContainerStyle={styles.flatListContent}
            />
            <Popup
                visible={popupVisible}
                description={popupDescription}
                onClose={closePopup}
            />
            <ConfirmationPopup 
                todoTitle={todoToDeleteTitle}
                visible={confirmPopupVisible} 
                onConfirm={confirmDeleteTodo} 
                onCancel={cancelDeleteTodo} 
            />
        </View>
    );
}

export default TodoListScreen;
