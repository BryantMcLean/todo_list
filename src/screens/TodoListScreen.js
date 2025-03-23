import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, FlatList, Pressable, Platform, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';  // Correct import for FileSystem
import { useSortFilter } from '../../src/functions/SortFilterContext';
import { htmlContentForAndroid, htmlContentForiOS } from '../components/htmlTemplates';
import { IconButton } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
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
    const [displayedTodoList, setDisplayedTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
    const [description, setDescription] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupDescription, setPopupDescription] = useState("");
    const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);
    const [todoToDeleteTitle, setTodoToDeleteTitle] = useState(""); // State for the title of the todo to delete
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [reminderDate, setReminderDate] = useState(new Date());
    const [selectedTodo, setSelectedTodo] = useState(null); // State to hold the selected todo for setting reminder
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState(false);
    const [showReminder, setShowReminder] = useState(false);


    const navigation = useNavigation();
    const { sortOption, setSortOption, filterOption, setFilterOption } = useSortFilter();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const storedTodos = await AsyncStorage.getItem('todos');
                if (storedTodos) {
                const parsedTodos = JSON.parse(storedTodos);
                setTodoList(parsedTodos);
                setDisplayedTodoList(parsedTodos); // Initialize displayed list
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        loadTodos();
    }, []);

    useEffect(() => {
        let sortedFilteredTodos = [...todoList];
    
        if (filterOption === 'finished') {
          sortedFilteredTodos = sortedFilteredTodos.filter(todo => todo.finishedDate);
        } else if (filterOption === 'unfinished') {
          sortedFilteredTodos = sortedFilteredTodos.filter(todo => !todo.finishedDate);
        }
    
        if (sortOption === 'finishedDate') {
          sortedFilteredTodos.sort((a, b) => new Date(b.finishedDate) - new Date(a.finishedDate));
        } else {
          sortedFilteredTodos.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        }
    
        setDisplayedTodoList(sortedFilteredTodos);
    }, [sortOption, filterOption, todoList]);

    // Clear sort and filter after 10 seconds if the displayed list is empty due to sorting/filtering
    useEffect(() => {
        if (displayedTodoList.length === 0 && (filterOption !== 'all' || sortOption !== 'creationDate')) {
        const timeoutId = setTimeout(() => {
            setSortOption('creationDate');
            setFilterOption('all');
        }, 10000); // 10 seconds

        return () => clearTimeout(timeoutId); // Cleanup the timeout if the effect runs again
        }
    }, [displayedTodoList, filterOption, sortOption]);

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

     const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(Platform.OS === 'ios');
        setShow(false);
        setReminderDate(currentDate);
        console.log("Date Change: ", currentDate)
    };

    const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow);
    }
    
    const handleAddTodoWithReminder = () => {
        handleAddTodo(todo, todoList, description, setTodo, setTodoList, setDescription, reminderDate, setReminderDate);
        setShowDatePicker(false);
    };
    
    const scheduleNotification = async (date, title, body) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: description,
          },
          trigger: date,
        });
    };

    const renderTodos = ({ item }) => {
        const todoDate = new Date(parseInt(item.id)); // Convert the timestamp to a Date object
        const formattedDate = `${todoDate.toLocaleDateString()} ${todoDate.toLocaleTimeString()}`; // Format the date and time
        const finishedDate = item.finishedDate ? new Date(item.finishedDate) : null;
        const formattedFinishedDate = finishedDate ? `${finishedDate.toLocaleDateString()} ${finishedDate.toLocaleTimeString()}` : '';
        const reminderDate = item.reminderDate ? new Date(item.reminderDate) : null;
        const formattedReminderDate = reminderDate ? `${reminderDate.toLocaleDateString()} ${reminderDate.toLocaleTimeString()}` : '';
        /* if (item.reminderDate) {
            scheduleNotification(new Date(item.reminderDate), item.title);
        } */
        return (
            <Pressable
                style={styles.renderTodosView}
                onPress={() => 
                    handlePress(item.description, setPopupDescription, setPopupVisible)
                }
            >
                <Text style={styles.todoText}>{item.title}{"\n"}<Text style={styles.todoDate}>Created: {formattedDate}</Text>
                {formattedFinishedDate ? (
                    <Text style={styles.todoDate}>{'\n'}Finished: {formattedFinishedDate}</Text>
                ) : null}
                {formattedReminderDate ? (
                    <Text style={styles.todoDate}>{'\n'}Reminder: {formattedReminderDate}</Text>
                ) : null}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <IconButton on style={{backgroundColor: '#FFF', width: 32, height: 32,}} iconColor={item.finishedColor} size={32} icon="check" onPress={() => handleToggleFinishTodo(item.id, todoList, setTodoList)} />
                    <IconButton iconColor='#fff' icon="pencil" onPress={() => {handleEditTodo(item, setEditedTodo, setTodo, setDescription, setShowDatePicker), setShowReminder(true)}} />
                    <IconButton iconColor='#fff' icon="trash-can" onPress={() => handleDeleteTodo(item.id, item.title, item.finishedColor, setTodoToDelete, setConfirmPopupVisible, setTodoToDeleteTitle)} />
                    <IconButton
                        iconColor='#fff'
                        icon= { item.reminderDate ? "bell-ring" : "bell"}
                        onPress={() => {}}
                    />
                </View>
            </Pressable>   
        );
    };

    const handlePrint = async () => {
        // Generate HTML content based on the platform
        const htmlContent = Platform.OS === 'ios' 
        ? htmlContentForiOS(todoList) 
        : htmlContentForAndroid(todoList);
        try {
            // Send the POST request to generate the PDF
            const response = await fetch('https://frozen-dusk-02308-d6781e7d6bae.herokuapp.com/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ htmlContent }),  // Send the todo list as the body
            });
    
            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }
    
            // Get the PDF file as a blob
            const pdfBlob = await response.blob();
    
            // Convert blob to base64
            const base64data = await blobToBase64(pdfBlob);
    
            // Get the local file system path to save the PDF
            const fileUri = FileSystem.documentDirectory + 'generated-todo-list.pdf';
    
            // Write the PDF file to the file system in base64
            await FileSystem.writeAsStringAsync(fileUri, base64data, {
                encoding: FileSystem.EncodingType.Base64
            });
    
            // Open or share the PDF
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert('Sharing not available');
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Error', 'Could not generate PDF');
        }
    };
    
    // Helper function to convert Blob to Base64
    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result.split(',')[1]; // Removing the "data:application/pdf;base64," part
                resolve(base64data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    


    return (
        <View style={styles.container}>
            {/* <Text style={{alignSelf: 'center', fontSize: 22,fontWeight: 'bold', color: '#337AB7', paddingBottom: 15}}>Todo List</Text> */}
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
                scrollEnabled={true}
                persistentScrollbar={true}
                rows={3}
                value={description}
                onChangeText={(userText) => setDescription(userText)}
            />
            { showReminder && 
                <View style = {{borderWidth: 2, borderColor: '#337AB7', borderRadius: 8, marginBottom: 20}}>
                    <Text style = {{alignSelf: 'center', justifyContent: 'center', fontSize: 20, color: '#1e90ff'}}>Set Reminder</Text>
                    <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16}}>
                        <Pressable
                            style={{paddingHorizontal: 12,}}
                            onPress = {() => showMode('date')}
                        ><Text style = {{fontSize: 18, color: '#1e90ff'}}>Select Date{'\n'}{reminderDate.toLocaleDateString()}</Text>
                        </Pressable>
                        <Pressable
                            style={{paddingHorizontal: 12, }}
                            onPress = {() => showMode('time')}
                        ><Text style = {{fontSize: 18, color: '#1e90ff'}}>Select Time{'\n'}{reminderDate.toLocaleTimeString()}</Text>
                        </Pressable>
                    </View>
                </View>
            }
            {editedTodo ? 
                <>
                    <Pressable style={styles.button} onPress={() => {
                        console.log('Calling handleUpdateTodo with:', { todoList });
                        handleUpdateTodo(todo, editedTodo, todoList, description, reminderDate, setReminderDate, setDescription, setTodoList, setEditedTodo, setTodo, setShowDatePicker, scheduleNotification ),
                        setShowReminder(false);}}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => {handleCancelEdit(setEditedTodo, setTodo, setDescription, setShowDatePicker),
                        setShowReminder(false);
                    }}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                </>
                :
                <Pressable style={styles.button} onPress={() => {handleAddTodo(todo, todoList, description, setTodo, setTodoList, setDescription, reminderDate, setReminderDate),
                    setShowDatePicker(false);
                }}>
                    <Text style={styles.buttonText}>Add New Todo</Text>
                </Pressable>
            }
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Pressable style={{alignSelf: "center"}} onPress={() => navigation.navigate('SortFilterScreen')}>
                    <Text style={{fontSize: 16, color: '#337ab7' }}>Sort & Filter</Text>
                </Pressable>
                 <Pressable style={{alignSelf: "center" }} onPress={handlePrint}>
                    <Text style={{fontSize: 16, color: '#337ab7' }}>Print List</Text>
                </Pressable>
            </View>
            
            { show && 
            <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12}}>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={reminderDate}
                    mode={mode}
                    is24Hour={false}
                    onChange={handleDateChange}
                    onConfirm={handleAddTodoWithReminder}
                    onCancel={() => setShowDatePicker(false)}
                />
            </View>
            }

           
            
            <FlatList 
                data={displayedTodoList}
                renderItem={renderTodos}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Fallback isFiltered={filterOption !== 'all' || sortOption !== 'creationDate'} />}
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
