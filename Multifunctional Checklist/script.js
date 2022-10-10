  const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");
  todos = JSON.parse(localStorage.getItem("todo-list")) || [];

let editCheck = false;

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

showTodo("all");

function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo) => {
     const {id, title, status} = todo;

      let completed = (status == "completed" ? "checked" : "");

      if (filter == status || filter == "all") {

        liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this, '${id}')" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${title}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick="editTask('${id}', '${title} ')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteTask('${id}')"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
      }
    });
  }

  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  // !checkTask.length
  //   ? clearAll.classList.remove("active")
  //   : clearAll.classList.add("active");
  // taskBox.offsetHeight >= 300
  //   ? taskBox.classList.add("overflow")
  //   : taskBox.classList.remove("overflow");
}

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask , delId) {
  let taskName = selectedTask.parentElement.lastElementChild;

  todos = JSON.parse(localStorage.getItem("todo-list")) || [];
  let cstatus = todos.find(todo => todo.id == delId);
  // cstatus.status = "completed";
 
 
  if (selectedTask.checked ) {
    taskName.classList.add("checked");
    cstatus.status = "completed";
   
  } else {
    taskName.classList.remove("checked");
    cstatus.status = "pending";
    
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}



// Function to delete Todo
function deleteTask(deleteId) {

const update = todos.filter(({id}) => {
  return id !== deleteId;
});

  localStorage.setItem("todo-list", JSON.stringify(update));
  location.reload();
}

// Function to Clear all todo
clearAll.addEventListener("click", () => {

  localStorage.setItem("todo-list", JSON.stringify([]));
  showTodo();
});


// Function to generate unique ID
const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '');


  //Function to Add todo
  function addTodo(){

    const newTodo ={
      id: uid(),
      title: taskInput.value.trim(),
      status: "pending"
    }
    todos = JSON.parse(localStorage.getItem("todo-list")) || [];
    const joinTodo = [...todos, newTodo];
    localStorage.setItem("todo-list", JSON.stringify(joinTodo));
  }

  function editTask(taskId, textName) {
    editCheck = true;
    editId = taskId;
    taskInput.value = textName;
    taskInput.focus();
  
    taskInput.classList.add("active");

    taskInput.addEventListener("keyup", (keypressed) => {
      

      if (keypressed.key == "Enter" && editCheck == true) {
        todos = JSON.parse(localStorage.getItem("todo-list")) || [];
        let clickedTodo = todos.find(todo => todo.id == taskId);
        let taskInputValue = taskInput.value.trim();
      
         clickedTodo.title = taskInputValue;
         location.reload();

         localStorage.setItem("todo-list", JSON.stringify(todos));
      }
    });   
  }
     
  
  taskInput.addEventListener("keyup", (keypressed) => {
      let userTask = taskInput.value.trim();

      if (keypressed.key == "Enter" && editCheck == false) {
         addTodo();
         location.reload();

      }
    });
      
   
 
