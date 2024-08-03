export const handleDeleteTodo = (id, title, finishedColor, setTodoToDelete, setConfirmPopupVisible, setTodoToDeleteTitle) => {
    
    if (finishedColor !== 'green') {
        alert('This task is not finished, please mark as finished first.');
        return;
    }
    setTodoToDelete(id);
    setTodoToDeleteTitle(title); // Set the title of the todo to delete
    setConfirmPopupVisible(true);
};
