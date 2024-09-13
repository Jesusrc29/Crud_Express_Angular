import conectarDB from '../conexion.js';

/**
 * Inserta un nuevo producto en la base de datos.
 * 
 * @param {object} productos - Objeto con los datos del producto a insertar.
 * @returns {Promise<void>} - Promesa que se resuelve cuando el producto es insertado.
 */
export async function insertarProducto(productos) {
    const {nombre, descripcion, precio, stock} = productos;
    const db = await conectarDB();
    try {

        await db.run(`
            INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion)
            VALUES (?, ?, ?, ?, DATE('now'))
        `, [productos.nombre, productos.descripcion, productos.precio, productos.stock]);

        console.log('Producto insertado con éxito');
    } catch (err) {
        console.error('Error al insertar el producto:', err.message);
        throw err;  
    }
}
