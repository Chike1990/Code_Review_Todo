import './style.css';
import toggleCompleted from './upDate.js';
import {
  createTodo, updateTodo, clearCompletedTodos, deleteTodo,
} from './crud.js';

// Array of todos object
let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoItems = document.querySelector('.todo__items');

// Populate the DOM with todos
function displayTodosOnUI() {
  todoItems.innerHTML = '';
  todos.forEach((todo) => {
    const checked = todo.completed ? 'checked' : '';
    todoItems.innerHTML += `
      <div class="todo__placeholder">
        <div>
          <input ${checked} type="checkbox" id="${todo.index}" class="todo__checkbox" />
          <input class="todo__text ${checked}" value="${todo.description}" id="${todo.index}" />
        </div>
        <i class="todo__delete-icon fas fa-trash" id="${todo.index}"></i>
      </div>
    `;
  });
}

displayTodosOnUI();

const todoInput = document.querySelector('.todo__input');

function addTodo() {
  if (!todoInput.value) return;
  const newTodo = {
    description: todoInput.value,
    completed: false,
  };
  createTodo(todos, newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  todoInput.value = '';
  displayTodosOnUI();
}

document.addEventListener('change', (e) => {
  const { classList, value, id } = e.target;
  if (classList.contains('todo__text')) {
    updateTodo(todos, value, parseInt(id, 10));
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodosOnUI();
  } else {
    const index = parseInt(e.target.id, 10);
    toggleCompleted(todos, index);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodosOnUI();
  }
});

document.addEventListener(
  'focus',
  (e) => {
    if (e.target.classList.contains('todo__text')
    && e.target.classList.contains('checked')) {
      e.target.classList.remove('checked');
    }
  },
  true,
);

document.addEventListener(
  'blur',
  (e) => {
    const todo = todos.find((todo) => todo.index === parseInt(e.target.id, 10));
    if (e.target.classList.contains('todo__text') && todo.completed === true) {
      e.target.classList.add('checked');
    }
  },
  true,
);

document.addEventListener('keyup', (e) => {
  if (e.code === 'Enter' && e.target.classList.contains('todo__input')) {
    addTodo();
  }
});

document.querySelector('.todo__input-icon').addEventListener('click', () => {
  addTodo();
});

document.querySelector('.todo__clear-btn').addEventListener('click', () => {
  todos = clearCompletedTodos(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodosOnUI();
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('todo__delete-icon')) {
    const index = parseInt(e.target.id, 10);
    deleteTodo(todos, index);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodosOnUI();
  }
});
