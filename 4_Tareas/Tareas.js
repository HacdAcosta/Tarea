const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = [];
let currentSortOrder = 'title';
const taskFilePath = 'tasks.txt';

function displayMenu() {
  console.log("\nMenú de Tareas:");
  console.log("1. Crear tarea");
  console.log("2. Listar tareas");
  console.log("3. Listar tareas completadas");
  console.log("4. Listar tareas pendientes");
  console.log("5. Completar una tarea");
  console.log("6. Borrar tarea");
  console.log("7. Ordenar tareas");
  console.log("8. Guardar y Salir");
  rl.question("Selecciona una opción: ", (choice) => {
    handleChoice(choice);
  });
}

function handleChoice(choice) {
  switch (choice) {
    case "1":
      createTask();
      break;
    case "2":
      listTasks();
      break;
    case "3":
      listCompletedTasks();
      break;
    case "4":
      listPendingTasks();
      break;
    case "5":
      completeTask();
      break;
    case "6":
      deleteTask();
      break;
    case "7":
      sortTasks();
      break;
    case "8":
      saveTasksToFile();
      console.log("¡Adiós!");
      rl.close();
      break;
    default:
      console.log("Opción inválida. Intenta de nuevo.");
      displayMenu();
  }
}

function createTask() {
  rl.question("Ingresa el título de la tarea: ", (title) => {
    tasks.push({ title, completed: false });
    console.log("Tarea creada exitosamente.");
    displayMenu();
  });
}

function listTasks() {
  if (tasks.length === 0) {
    console.log("No hay tareas en la lista.");
  } else {
    console.log("\nLista de Tareas:");
    tasks.sort((a, b) => a[currentSortOrder].localeCompare(b[currentSortOrder])).forEach((task, index) => {
      console.log(`${index + 1}. [${task.completed ? "X" : " "}] ${task.title}`);
    });
  }
  displayMenu();
}

function listCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  if (completedTasks.length === 0) {
    console.log("No hay tareas completadas.");
  } else {
    console.log("\nTareas Completadas:");
    completedTasks.forEach((task, index) => {
      console.log(`${index + 1}. [X] ${task.title}`);
    });
  }
  displayMenu();
}

function listPendingTasks() {
  const pendingTasks = tasks.filter(task => !task.completed);
  if (pendingTasks.length === 0) {
    console.log("No hay tareas pendientes.");
  } else {
    console.log("\nTareas Pendientes:");
    pendingTasks.forEach((task, index) => {
      console.log(`${index + 1}. [ ] ${task.title}`);
    });
  }
  displayMenu();
}

function completeTask() {
  if (tasks.length === 0) {
    console.log("No hay tareas para completar.");
    displayMenu();
    return;
  }

  console.log("\nSelecciona la tarea a completar:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? "X" : " "}] ${task.title}`);
  });

  rl.question("Ingresa el número de la tarea: ", (index) => {
    const taskIndex = parseInt(index) - 1;
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
      console.log("Número de tarea inválido.");
    } else {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      console.log(`Tarea ${tasks[taskIndex].completed ? "completada" : "marcada como pendiente"} exitosamente.`);
    }
    displayMenu();
  });
}

function deleteTask() {
  listTasks();
  rl.question("Ingresa el número de la tarea a borrar: ", (index) => {
    const taskIndex = parseInt(index) - 1;
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
      console.log("Número de tarea inválido.");
    } else {
      tasks.splice(taskIndex, 1);
      console.log("Tarea borrada exitosamente.");
    }
    displayMenu();
  });
}

function sortTasks() {
  rl.question("¿Cómo quieres ordenar las tareas? (título/estado) ", (sortOrder) => {
    if (sortOrder === 'título' || sortOrder === 'title') {
      currentSortOrder = 'title';
    } else if (sortOrder === 'estado' || sortOrder === 'completed') {
      currentSortOrder = 'completed';
    } else {
      console.log("Opción de ordenamiento inválida.");
    }
    displayMenu();
  });
}

function saveTasksToFile() {
  fs.writeFileSync(taskFilePath, JSON.stringify(tasks));
  console.log("Tareas guardadas exitosamente.");
}

function loadTasksFromFile() {
  if (fs.existsSync(taskFilePath)) {
    tasks = JSON.parse(fs.readFileSync(taskFilePath, 'utf-8'));
    console.log("Tareas cargadas exitosamente.");
  } else {
    console.log("No se encontró el archivo de tareas.");
  }
}

loadTasksFromFile();
displayMenu();
