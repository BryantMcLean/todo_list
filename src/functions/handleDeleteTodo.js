export const handleDeleteTodo = (id, todoList, setTodoList) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
};
