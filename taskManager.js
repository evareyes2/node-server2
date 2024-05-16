import chalk from 'chalk';
import readline from 'readline';


// Inicializamos la interfaz de lectura de la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array para almacenar las tareas
let tasks = [];

// Función para añadir una tarea
function addTask(indicator, description) {
  tasks.push({ indicator, description, completed: false });
}

// Función para eliminar una tarea
function deleteTask(index) {
  tasks.splice(index, 1);
}

// Función para marcar una tarea como completada
function completeTask(index) {
  tasks[index].completed = true;
}

// Función para mostrar las tareas
function displayTasks() {
  console.log(chalk.bold.underline('Lista de tareas:\n'));
  tasks.forEach((task, index) => {
    const status = task.completed ? chalk.green('Completada') : chalk.red('Pendiente');
    console.log(`${index + 1}. [${status}] ${task.indicator}: ${task.description}`);
  });
  console.log('\n');
}

// Función para manejar la entrada del usuario
function handleInput(input) {
  const [command, ...args] = input.split(' ');
  switch (command.toLowerCase()) {
    case 'add':
      addTask(...args);
      break;
    case 'delete':
      deleteTask(parseInt(args[0]) - 1);
      break;
    case 'complete':
      completeTask(parseInt(args[0]) - 1);
      break;
    case 'display':
      displayTasks();
      break;
    case 'exit':
      rl.close();
      break;
    default:
      console.log(chalk.yellow('Comando no reconocido. Los comandos válidos son: add, delete, complete, display, exit'));
  }
}

// Mostramos un mensaje de bienvenida
console.log(chalk.bold('Bienvenido a la lista de tareas!'));
console.log('Puedes añadir, eliminar, completar y mostrar tareas. Escribe "exit" para salir.\n');

// Escuchamos la entrada del usuario
rl.on('line', handleInput);
