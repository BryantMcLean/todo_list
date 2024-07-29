export const handleAddTodo = (todo, todoList, setTodo, setTodoList) => {
    if (todo === "") {
        alert('You must enter a todo first!');
        return;
    }
    const newTodo = { id: Date.now().toString(), title: todo, finishedColor: 'red' };
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    setTodo('');
};
