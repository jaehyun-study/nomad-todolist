const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let lastId = 0;

function paintToDo(toDo) {
  const li = document.createElement("li");
  li.id = toDo.id;
  const span = document.createElement("div");
  span.innerText = toDo.text;
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function getNewId() {
  lastId++;
  return lastId;
}

function insertTodo(toDoText) {
  const newToDo = {
    id: getNewId(),
    text: toDoText
  };
  toDos.push(newToDo);
  saveToDos();
  paintToDo(newToDo);
}

function deleteToDo(event) {
  const button = event.target;
  const li = button.parentElement;
  toDoList.removeChild(li);
  const newToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = newToDos;
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  insertTodo(toDoInput.value);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(toDo => {
      insertTodo(toDo.text);
    });
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
