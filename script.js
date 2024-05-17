const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValues = document.querySelector("#inputValue");

const getDataFromLocal = () => {
  return JSON.parse(localStorage.getItem("Ashish_Key"));
};

const newLocalTodoArr = () => {
  return localStorage.setItem("Ashish_Key", JSON.stringify(localTodoArr));
};

let localTodoArr = getDataFromLocal() || [];

dynamicAfterRefreshTodo = (currElem) => {
  const divElem = document.createElement("div");
  divElem.classList.add("main_todo_div");
  divElem.innerHTML = `<li>${currElem}</li> <button class="delBtn">Delete</button>`;
  mainTodoElem.append(divElem);
};

const addTodoList = (e) => {
  e.preventDefault();
  const todoListValue = inputValues.value.trim();

  inputValues.value = "";

  if (!localTodoArr.includes(todoListValue) && todoListValue != "") {
    localTodoArr.push(todoListValue);
    localTodoArr = [...new Set(localTodoArr)];
    console.log(localTodoArr);
    localStorage.setItem("Ashish_Key", JSON.stringify(localTodoArr));

    // const divElem = document.createElement("div");
    // divElem.classList.add("main_todo_div");
    // divElem.innerHTML = `<li>${inputValues.value}</li> <button class="delBtn">Delete</button>`;
    // mainTodoElem.append(divElem);

    // above piece of code is same for other purpose also thats why im using function to call it like below //
    dynamicAfterRefreshTodo(todoListValue);
  }
};

const showTodoList = () => {
  console.log(localTodoArr);

  localTodoArr.forEach((currElem) => {
    dynamicAfterRefreshTodo(currElem);
  });
};

showTodoList();

removeTodoElem = (e) => {
  const todoToRemove = e.target;
  // console.log(e.target);
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  // console.log(todoListContent);
  let parentElem = todoToRemove.parentElement;

  localTodoArr = localTodoArr.filter((currTodo) => {
    return currTodo != todoListContent;
  });
  console.log(localTodoArr);

  newLocalTodoArr(localTodoArr);
  parentElem.remove();
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains("delBtn")) {
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
