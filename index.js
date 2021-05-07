import Task from "./task.js";
const $addText = document.getElementById("addText");
const $submit = document.getElementById("submit");
const $todoList = document.getElementById("todoList");
const $doneList = document.getElementById("doneList");
let taskList = [];
let counter = 0;
$submit.addEventListener("click", (e) => {
  if ($addText.value !== "") {
    let task = new Task($addText.value, ++counter);
    task.add(task, taskList);
    render();
    $addText.value = "";
  }
});

const render = () => {
  // Text
  console.log(taskList);
  $todoList.innerHTML = "";
  $doneList.innerHTML = "";
  taskList.forEach(function (task) {
    let $taskItem = document.createElement("li");
    if (task.status === 0) {
      $taskItem.innerHTML = `<label id="${task.id}">${task.name}</label><input id="${task.id}" type="button" value="Complete" /><input id="${task.id}" type="button" value="Remove" />`;
      $todoList.appendChild($taskItem);

      // const node = document.createElement("input");
      // node.type = "button";
      // node.id = task.id;
      // node.value = "hai";
      // node.style = "background-color:red;border-width:0px;border-radius:50px";
      // node.onclick = () => {
      //   console.log("hi btn");
      //   hai(task, node.value);
      // };

      // $todoList.appendChild(node);
    } else {
      $taskItem.innerHTML = `<label for="${task.id}">${task.name}</label><input id="${task.id}" type="button" value="Incomplete" /><input id="${task.id}" type="button" value="Remove" />`;
      $doneList.appendChild($taskItem);
    }
  });
};

// const hai = ({ id }, value) => {
//   console.log("id :: " + id);
//   console.log("Value:: " + value);
// };

$todoList.addEventListener("click", (e) => {
  let clickedTask = taskList.find((obj) => obj.id == e.target.id);
  if (e.target.value === "Complete") {
    clickedTask.changeStatus(clickedTask);
  } else if (e.target.value === "Remove") {
    taskList = clickedTask.remove(clickedTask, taskList);
  }
  render();
});

$doneList.addEventListener("click", (e) => {
  let clickedTask = taskList.find((obj) => obj.id == e.target.id);
  if (e.target.value === "Incomplete") {
    clickedTask.changeStatus(clickedTask);
  } else if (e.target.value === "Remove") {
    taskList = clickedTask.remove(clickedTask, taskList);
  }
  render();
});
