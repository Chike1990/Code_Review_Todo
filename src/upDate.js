function toggleCompleted(todos, index) {
  const todo = todos.find((todo) => todo.index === index);
  todo.completed = !todo.completed;
}

export default toggleCompleted;