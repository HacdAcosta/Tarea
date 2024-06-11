const personajes = [
    {
      nombre: 'Harley Quinn',
      edad: 25,
      ciudad: 'Gotham City',
      getPersona() {
        return { nombre: this.nombre, edad: this.edad };
      },
    },
    {
      nombre: 'Joker',
      edad: 35,
      ciudad: 'Gotham City',
    },
    {
      nombre: 'Batman',
      edad: 40,
      ciudad: 'Gotham City',
    },
  ];
  
  const harley = personajes.find(p => p.nombre === 'Harley Quinn');
  
  const { nombre, edad, ciudad } = harley;
  
  console.log(nombre); // Output: Harley Quinn
  console.log(edad); // Output: 25
  console.log(ciudad); // Output: Gotham City
  
  const harleyPersona = harley.getPersona();
  
  console.log(harleyPersona); // Output: { nombre: "Harley Quinn", edad: 25 }