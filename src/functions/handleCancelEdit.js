export const handleCancelEdit = (setEditedTodo, setTodo, setDescription, setShowDatePicker) => {
    setEditedTodo(null);
    setTodo("");
    setDescription("");
    setShowDatePicker(false)
};