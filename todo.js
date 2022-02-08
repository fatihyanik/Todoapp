//Selectors
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  // Tum event listenerlar
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}
function clearAllTodos(e){
  if(confirm("Are you sure you want to delete all tasks?")){
    // Arayuzden todolari temizleme
    //todoList.innerHTML = ""; // Yavas kaldigi icin kullanmiyoruz

    while(todoList.firstElementChild != null){
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      // kelimeyi bulamamis demektir
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "block");
    }
  });
}
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

    showAlert("success", "Task has been deleted successfully");
  }
}
function deleteTodoFromStorage(todo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (deletetodo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); // Arrayden degeri silebiliriz
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function addTodo(e) {
  const newTodo = todo.value.trim();

  if (newTodo === "") {
    showAlert("danger", "please enter a task");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "your task has been successfully added");
  }

  e.preventDefault();
}
function getTodosFromStorage() {
  // Storagedab Todolari almis olacak
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);
  console.log(todos);

  localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type, message) {
  /*   <div class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
      </div> */

  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  // setTimeout
  setTimeout(function () {
    alert.remove();
  }, 1000);
  console.log(alert);
}
function addTodoToUI(newTodo) {
  // string degerini list item olarak UI'ya ekleyecek

  //list item olusturma
  const listItem = document.createElement("li");
  // link olusturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";

  // Text Node olarak Ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // Todo list'e List Item'i ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";
  // console.log(link);
  // console.log(listItem);
}
