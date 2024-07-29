export const handleEditTodo = (todo, setEditedTodo, setTodo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
};
