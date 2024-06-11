// Simulamos una base de datos de empleados
const employees = [
    { id: 1, name: "Juan", salary: 3000, department: "IT", hireDate: "2020-01-01", manager: 3 },
    { id: 2, name: "María", salary: 4000, department: "RH", hireDate: "2018-06-15", manager: 3 },
    { id: 3, name: "Pedro", salary: 5000, department: "Gerencia", hireDate: "2015-09-01", manager: null },
    { id: 4, name: "Ana", salary: 3500, department: "Ventas", hireDate: "2023-04-15", manager: 2 }
  ];
  
  // Función asincrónica para obtener un empleado por ID
  async function getEmployeeById(id) {
    return new Promise((resolve, reject) => {
      const employee = employees.find(e => e.id === id);
      if (employee) {
        resolve(employee);
      } else {
        reject(`No se encontró el empleado con ID ${id}`);
      }
    });
  }
  
  // Función asincrónica para obtener todos los empleados
  async function getAllEmployees() {
    return new Promise((resolve) => {
      resolve(employees);
    });
  }
  
  // Función asincrónica para crear un nuevo empleado
  async function createEmployee(employee) {
    return new Promise((resolve, reject) => {
      const newEmployee = { id: employees.length + 1, ...employee };
      employees.push(newEmployee);
      resolve(newEmployee);
    });
  }
  
  // Función asincrónica para actualizar el salario de un empleado
  async function updateEmployeeSalary(id, newSalary) {
    return new Promise((resolve, reject) => {
      const employee = employees.find(e => e.id === id);
      if (employee) {
        employee.salary = newSalary;
        resolve(`El salario del empleado ${employee.name} ha sido actualizado a ${newSalary}`);
      } else {
        reject(`No se encontró el empleado con ID ${id}`);
      }
    });
  }
  
  // Función asincrónica para calcular el salario anual de un empleado
  async function getAnnualSalary(id) {
    const employee = await getEmployeeById(id);
    return employee.salary * 12;
  }
  
  // Función asincrónica para obtener el gerente de un empleado
  async function getManagerForEmployee(id) {
    const employee = await getEmployeeById(id);
    if (employee.manager === null) {
      return null;
    } else {
      const manager = await getEmployeeById(employee.manager);
      return manager;
    }
  }
  
  // Función asincrónica para obtener los subordinados de un empleado
  async function getSubordinatesForEmployee(id) {
    const allEmployees = await getAllEmployees();
    return allEmployees.filter(e => e.manager === id);
  }
  
  async function main() {
    try {
      // Obtener un empleado por ID
      const employee = await getEmployeeById(2);
      console.log(`Empleado encontrado: ${employee.name} - Salario: ${employee.salary} - Departamento: ${employee.department} - Fecha de contratación: ${employee.hireDate}`);
  
      // Obtener todos los empleados
      const allEmployees = await getAllEmployees();
      console.log("Todos los empleados:");
      allEmployees.forEach(e => console.log(`- ${e.name} (ID: ${e.id})`));
  
      // Crear un nuevo empleado
      const newEmployee = await createEmployee({ name: "Luis", salary: 3800, department: "Ventas", hireDate: "2022-11-01", manager: 2 });
      console.log("Nuevo empleado creado:", newEmployee);
  
      // Actualizar el salario de un empleado
      const message = await updateEmployeeSalary(2, 4500);
      console.log(message);
  
      // Calcular el salario anual de un empleado
      const annualSalary = await getAnnualSalary(1);
      console.log(`El salario anual de ${employee.name} es: ${annualSalary}`);
  
      // Obtener el gerente de un empleado
      const manager = await getManagerForEmployee(2);
      if (manager) {
        console.log(`El gerente de ${employee.name} es ${manager.name}`);
      } else {
        console.log(`${employee.name} no tiene gerente (es el gerente)`);
      }
  
      // Obtener los subordinados de un empleado
      const subordinates = await getSubordinatesForEmployee(3);
      console.log(`Los subordinados de ${employees.find(e => e.id === 3).name} son:`);
      subordinates.forEach(s => console.log(`- ${s.name} (ID: ${s.id})`));
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  main();
  