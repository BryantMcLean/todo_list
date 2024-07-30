export const handleEditTodo = (todo, setEditedTodo, setTodo, setDescription) => {
    setEditedTodo(todo);
    setTodo(todo.title);
    setDescription(todo.description);
};
