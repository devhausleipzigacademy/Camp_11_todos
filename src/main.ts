import "./style.css";
//import { getTodos } from "./services/todo";
type Todo = {
  completed: boolean;
  id: number;

  title: string;
  userId?: number;
};
const submitForm = document.querySelector("form")!;
const todoList = document.querySelector("#todo-list")! as HTMLUListElement;

async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = (await response.json()) as Todo[];
  return todos;
}

function renderTodo(todo: Todo, todoContainer: HTMLUListElement) {
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");

  todoLi.innerHTML = `
    <h3>${todo.title}</h3>
    <p>${todo.completed ? "Todo completed" : "Todo not completed"}</p>
  `;

  todoContainer.prepend(todoLi);
}

async function init() {
  const todos = await getTodos();
  todos.slice(0, 10).forEach((todo) => {
    renderTodo(todo, todoList);
  });
}

async function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const formData = new FormData(submitForm);
  const title = formData.get("title");

  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      title,
      completed: false,
    }),
  });
  const data = await response.json();
  const newTodo: Todo = {
    ...data,
    title,
    completed: false,
  };
  renderTodo(newTodo, todoList);
}

submitForm.addEventListener("submit", onSubmit);

init();
