// ===== Parte 2: Interfaces y Types =====
// Ejercicio 1
interface Usuario {
  id: number;
  nombre: string;
  edad: number;
  email: string;
  activo: boolean;
}

type UsuarioType = {
  id: number;
  nombre: string;
  edad: number;
  email: string;
  activo: boolean;
};

/* 
  Diferencias entre interface y type:
  - Las interfaces pueden extenderse con 'extends'
  - Los types permiten uniones y tipos condicionales
  - Las interfaces son más adecuadas para formas de objetos
*/

// Ejercicio 2
const usuarios: Usuario[] = [
  { id: 1, nombre: 'Ana', edad: 25, email: 'ana@mail.com', activo: true },
  { id: 2, nombre: 'Luis', edad: 30, email: 'luis@mail.com', activo: false },
  { id: 3, nombre: 'Marta', edad: 28, email: 'marta@mail.com', activo: true }
];

const usuariosActivos = usuarios.filter(usuario => usuario.activo);
console.log('Usuarios activos:', usuariosActivos);

// ===== Parte 3: Clases y Objetos =====
// Ejercicio 3
class UsuarioClass implements Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public edad: number,
    public email: string,
    public activo: boolean
  ) {}

  toggleActivo(): void {
    this.activo = !this.activo;
  }
}

const usuario1 = new UsuarioClass(4, 'Carlos', 35, 'carlos@mail.com', true);
const usuario2 = new UsuarioClass(5, 'Sofía', 22, 'sofia@mail.com', false);
console.log('Usuario 1:', usuario1);
console.log('Usuario 2:', usuario2);

// Ejercicio 4
class AdminUsuario extends UsuarioClass {
  constructor(
    id: number,
    nombre: string,
    edad: number,
    email: string,
    activo: boolean,
    public permisos: string[]
  ) {
    super(id, nombre, edad, email, activo);
  }
}

const admin = new AdminUsuario(6, 'Admin', 40, 'admin@mail.com', true, ['crear', 'eliminar']);
console.log('Administrador:', admin);

// ===== Parte 4: Arrays y métodos =====
// Ejercicio 5
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

const productos: Producto[] = [
  { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
  { id: 2, nombre: 'Mouse', precio: 20, stock: 0 },
  { id: 3, nombre: 'Teclado', precio: 50, stock: 10 }
];

const nombresProductos = productos.map(p => p.nombre);
console.log('Nombres de productos:', nombresProductos);

const productosEnStock = productos.filter(p => p.stock > 0);
console.log('Productos en stock:', productosEnStock);

// Ejercicio 6
productos.sort((a, b) => a.precio - b.precio);
console.log('Productos ordenados:', productos);

productos.push({ id: 4, nombre: 'Monitor', precio: 300, stock: 3 });
console.log('Producto agregado:', productos);

productos.pop();
console.log('Producto eliminado:', productos);

// ===== Parte 5: Tipos Genéricos =====
// Ejercicio 7
function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

console.log('Número aleatorio:', getRandomItem([1, 2, 3, 4]));
console.log('String aleatorio:', getRandomItem(['a', 'b', 'c']));
console.log('Usuario aleatorio:', getRandomItem(usuarios));

// Ejercicio 8
interface Caja<T> {
  contenido: T;
}

class CajaClass<T> implements Caja<T> {
  constructor(public contenido: T) {}
}

const cajaNumero = new CajaClass<number>(100);
const cajaString = new CajaClass<string>('Hola');
console.log('Cajas:', cajaNumero, cajaString);

// ===== Parte 6: Promesas y Asincronía =====
// Ejercicio 9
async function obtenerDatos(): Promise<Usuario[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 7, nombre: 'Juan', edad: 30, email: 'juan@mail.com', activo: true },
        { id: 8, nombre: 'Pedro', edad: 22, email: 'pedro@mail.com', activo: true },
        { id: 9, nombre: 'Laura', edad: 28, email: 'laura@mail.com', activo: false }
      ]);
    }, 3000);
  });
}

(async () => {
  const datos = await obtenerDatos();
  console.log('Datos obtenidos:', datos);
})();

// Ejercicio 10
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log('Datos API:', data))
  .catch(error => console.error('Error:', error));

// ===== Parte 7: Manipulación del DOM =====
// Ejercicio 11
function renderizarUsuarios(usuarios: Usuario[]) {
  const lista = document.getElementById('lista-usuarios')!;
  lista.innerHTML = usuarios
    .map(user => `
      <li>
        <strong>${user.nombre}</strong> - ${user.email}
      </li>
    `)
    .join('');
}

// Ejercicio 12
document.getElementById('btn-cargar')?.addEventListener('click', () => {
  renderizarUsuarios(usuarios);
});