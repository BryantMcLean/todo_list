export const handleCancelEdit = (setEditedTodo, setTodo, setDescription) => {
    setEditedTodo(null);
    setTodo("");
    setDescription("");
};