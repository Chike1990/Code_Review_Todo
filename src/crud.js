const createTodo = (todos, todo) => {
  const indexes = [];
  for (let i = 0; i < todos.length; i += 1) {
    indexes.push(todos[i].index);
  }
  let maxIndex = Math.max(...indexes);
  if (!indexes.length) {
    maxIndex = 0;
  }
  todos.push({ ...todo, index: maxIndex + 1 });
};

const deleteTodo = (todos, index) => {
  const todoIndex = todos.findIndex((todo) => todo.index === index);
  todos.splice(todoIndex, 1);
};

const updateTodo = (todos, todoText, index) => {
  const todo = todos.find((todo) => todo.index === index);
  todo.description = todoText;
};

const clearCompletedTodos = (todos) => todos.filter((todo) => todo.completed === false);

export {
  createTodo, updateTodo, clearCompletedTodos, deleteTodo,
};