export const handleEditTodo = (todo, setEditedTodo, setTodo, setDescription, setShowDatePicker) => {
    setEditedTodo(todo);
    setTodo(todo.title);
    setDescription(todo.description);
    setShowDatePicker(true);
};
