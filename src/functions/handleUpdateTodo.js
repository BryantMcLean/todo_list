export const handleUpdateTodo = (todo, editedTodo, todoList, description, reminderDate, setReminderDate, setDescription, setTodoList, setEditedTodo, setTodo, setShowDatePicker, scheduleNotification) => {
    const updatedTodoList = todoList.map((item) =>
        item.id === editedTodo.id ? { ...item, title: todo, description: description, reminderDate: reminderDate  } : item
    );
    setTodoList(updatedTodoList);
    setEditedTodo(null);
    setTodo("");
    setDescription('');
    setReminderDate(new Date());
    setShowDatePicker(false);

    // Schedule notification
    scheduleNotification(reminderDate, todo); 

};
