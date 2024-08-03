import { saveTodoList } from "./saveTodoList";

export const handleToggleFinishTodo = async (id, todoList, setTodoList) => {
    const updatedTodoList = todoList.map((item) => {
        if (item.id === id) {
            const newColor = item.finishedColor === 'red' ? 'green' : 'red';
            return { ...item, finishedColor: newColor };
        }
        return item;
    });
    setTodoList(updatedTodoList);
    await saveTodoList(updatedTodoList); // Save the updated list to AsyncStorage
};
