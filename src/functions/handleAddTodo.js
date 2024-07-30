export const handleAddTodo = (todo, todoList, description, setTodo, setTodoList, setDescription) => {
    if (todo === "") {
        alert('You must enter a todo first!');
        return;
    }
    const newTodo = { id: Date.now().toString(), title: todo, description: description, finishedColor: 'red' };
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    setTodo('');
    setDescription('');
};
