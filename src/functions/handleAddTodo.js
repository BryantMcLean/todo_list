import { deviceInfo } from "./DeviceInfo";
import { Alert } from "react-native";

export const handleAddTodo = (todo, todoList, description, setTodo, setTodoList, setDescription) => {
    if ( deviceInfo.isDesktop === true) {
        if (todo === "") {
            alert('You must enter a todo first!');
            return;
        }
    } else {
        Alert.alert(
            'IWDTX Error',
            'You must enter a name for your task first!',
            [
                {text: 'Ok',  style: 'cancel'},
            ],
            {
                cancelable: true
            }
        );
        return;
    }
    
    const newTodo = { id: Date.now().toString(), title: todo, description: description, finishedColor: 'red' };
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    setTodo('');
    setDescription('');
};
