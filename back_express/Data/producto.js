import conectarDB from './conexion.js';

/**
 * Crea la tabla de productos si no existe.
 * 
 * @returns {Promise<void>} - Promesa que se resuelve cuando la tabla es creada.
 */
export async function crearTablaProductos(){
    //contectarDB.then(db => {})
    
    const db = await conectarDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            precio INTEGER NOT NULL,
            stock INTEGER NOT NULL,
            estado INTEGER NOT NULL DEFAULT 1,
            fecha_creacion DATE NOT NULL,
            fecha_modificacion DATE
        )`);
    console.log('Tabla productos creada con éxito');
}
