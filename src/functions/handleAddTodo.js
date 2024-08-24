import { deviceInfo } from "./DeviceInfo";
import { Alert } from "react-native";

export const handleAddTodo = (todo, todoList, description, setTodo, setTodoList, setDescription, reminderDate, setReminderDate )=> {
    //console.log("handleAddTodo :", reminderDate, setReminderDate); // Debugging line
    if (deviceInfo.isDesktop === true) {
        if (todo === "") {
            alert('You must enter a todo first!');
            return;
        }
    }
    
    if (deviceInfo.isPhone || deviceInfo.isTablet || deviceInfo.isIpad) {
        if (todo === "") {
            Alert.alert(
                'IWDTX Error',
                'You must enter a name for your TODO first!',
                [
                    {text: 'Ok', style: 'cancel'},
                ],
                {
                    cancelable: true
                }
            );
            return;
        }
    }

    const newTodo = { id: Date.now().toString(), title: todo, description: description, finishedColor: 'red' };
    const updatedTodoList = [...todoList, newTodo];
    console.log(updatedTodoList);
    setTodoList(updatedTodoList);
    setTodo('');
    setDescription('');
    //setReminderDate(new Date());

    /* // Schedule notification
    scheduleNotification(reminderDate, todo); */
};

const scheduleNotification = async (date, title) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Reminder!',
            body: title,
        },
        trigger: date,
    });
};

