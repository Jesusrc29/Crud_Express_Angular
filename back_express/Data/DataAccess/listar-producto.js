import  conectarDB  from '../conexion.js';
/**
 * Lista todos los productos de la base de datos.
 * 
 * @returns {Promise<Array<Object>>} - Promesa que se resuelve con una lista de productos.
 */
export async function listarProductos() {
    const db = await conectarDB();
    try {
        const productos = await db.all(`
            SELECT * FROM productos
        `);

        return productos;
    } catch (err) {
        console.error('Error al obtener los productos:', err.message);
        throw err;  
    }
}