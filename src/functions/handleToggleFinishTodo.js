export const handleToggleFinishTodo = (id, todoList, setTodoList) => {
    const updatedTodoList = todoList.map((item) => {
        if (item.id === id) {
            const newColor = item.finishedColor === 'red' ? '#fff' : 'red';
            return { ...item, finishedColor: newColor };
        }
        return item;
    });
    setTodoList(updatedTodoList);
};
