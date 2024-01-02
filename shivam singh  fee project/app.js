const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const filter = document.querySelector("#filter");
const sort = document.querySelector("#sort");
const search = document.querySelector("#search");
let tasks = [];

function loadTasks() {
  if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    displayTasks();
  }
}

function displayTasks() {
  taskList.innerHTML = "";
  let filteredTasks = [];
  if (filter.value === "all") {
    filteredTasks = tasks;
  } else if (filter.value === "complete") {
    filteredTasks = tasks.filter((task) => task.isComplete === true);
  } else if (filter.value === "incomplete") {
    filteredTasks = tasks.filter((task) => task.isComplete === false);
  }
  if (sort.value === "asc") {
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sort.value === "desc") {
    filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }
  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="task-${index}" ${
      task.isComplete ? "checked" : ""
    }>
      <span>${task.title}</span>
      <span>${task.description}</span>
      <span>${task.dueDate}</span>
      <button class="complete" data-index="${index}">${
      task.isComplete ? "Incomplete" : "Complete"
    }</button>
      <button class="delete" data-index="${index}">Delete</button>
    `;
    if (task.isComplete) {
      li.classList.add("complete");
    }
    taskList.appendChild(li);
    if (!task.isComplete && isTaskDue(task.dueDate)) {
      showNotification(task.title);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function isTaskDue(dueDate) {
  const taskDueDate = new Date(dueDate);
  const currentDate = new Date();
  return currentDate > taskDueDate;
}

function addTask(e) {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#due-date").value;
  if (title === "" || description === "" || dueDate === "") {
    alert("Please fill in all fields");
    return;
  }
  const task = {
    title,
    description,
    dueDate,
    isComplete: false,
  };
  tasks.push(task);
  displayTasks();
  taskForm.reset();
}

function editTask(index) {
  const title = prompt("Enter task title", tasks[index].title);
  const description = prompt(
    "Enter task description",
    tasks[index].description
  );
  const dueDate = prompt("Enter task due date", tasks[index].dueDate);
  if (title === null || description === null || dueDate === null) {
    return;
  }
  tasks[index].title = title;
  tasks[index].description = description;
  tasks[index].dueDate = dueDate;
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function toggleComplete(index) {
  tasks[index].isComplete = !tasks[index].isComplete;
  displayTasks();
  if (tasks[index].isComplete) {
    const taskTitle = tasks[index].title;
    showCompletionNotification(taskTitle);
  }
}

function showNotification(taskTitle) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Task Due", {
      body: `The task "${taskTitle}" is due.`,
    });
  }
}

function showCompletionNotification(taskTitle) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Task Completed", {
      body: `The task "${taskTitle}" has been completed.`,
    });
  }
}

filter.addEventListener("change", displayTasks);
sort.addEventListener("change", displayTasks);
search.addEventListener("input", () => {
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.value.toLowerCase())
  );
  displayTasks(filteredTasks);
});
taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("complete")) {
    toggleComplete(e.target.dataset.index);
  } else if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(e.target.dataset.index);
    }
  } else if (e.target.tagName === "SPAN") {
    editTask(e.target.parentNode.querySelector(".complete").dataset.index);
  }
});

// Load tasks on page load
loadTasks();
function changeBackground() {
  var images = [
    "https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1585811759562-a30733b277f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1572273869941-45732d6f581c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    "https://images.unsplash.com/photo-1562217180-021f74991332?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1528938102132-4a9276b8e320?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1598791318878-10e76d178023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1598802522613-872fd6bfd45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
  ];
  var randomIndex = Math.floor(Math.random() * images.length);
  var selectedImage = images[randomIndex];
  document.getElementById("main").style.backgroundImage =
    "url('" + selectedImage + "')";
}
window.onload = changeBackground();
