import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTodoList = async (setTodoList) => {
    try {
        const storedTodoList = await AsyncStorage.getItem('@MyTodoList');
        if (storedTodoList !== null) {
            setTodoList(JSON.parse(storedTodoList));
        }
    } catch (error) {
        console.error('Error fetching todo list:', error);
    }
};
