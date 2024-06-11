const nombre = 'Harley Quinn';
const identidad = 'Dr. Harleen Quinzel';
const poderes = ['arte de lucha', 'estrategia', 'manipulación'];
const ciudad = 'Gotham City';

const mensaje = `
  ${nombre} (${identidad}) es una villana famosa por su traje de bufón rojo y negro.
  Sus poderes incluyen:
  ${poderes.map(p => `- ${p}`).join('\n')}
  Protege a la ciudad de ${ciudad} de los héroes y villanos.
`;

console.log(mensaje);