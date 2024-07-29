import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTodoList = async (list) => {
    try {
        await AsyncStorage.setItem('@MyTodoList', JSON.stringify(list));
    } catch (error) {
        console.error('Error saving todo list:', error);
    }
};
