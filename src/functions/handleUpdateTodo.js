export const handleUpdateTodo = (todo, editedTodo, todoList, description, setDescription, setTodoList, setEditedTodo, setTodo) => {
    const updatedTodoList = todoList.map((item) =>
        item.id === editedTodo.id ? { ...item, title: todo, description: description } : item
    );
    setTodoList(updatedTodoList);
    setEditedTodo(null);
    setTodo("");
    setDescription('');
};
