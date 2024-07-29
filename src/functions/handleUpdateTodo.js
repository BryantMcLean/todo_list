export const handleUpdateTodo = (todo, editedTodo, todoList, setTodoList, setEditedTodo, setTodo) => {
    const updatedTodoList = todoList.map((item) =>
        item.id === editedTodo.id ? { ...item, title: todo } : item
    );
    setTodoList(updatedTodoList);
    setEditedTodo(null);
    setTodo("");
};
