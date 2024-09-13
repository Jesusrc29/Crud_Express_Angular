import conectarDB from '../conexion.js';

/**
 * Actualiza un producto en la base de datos.
 * 
 * @param {number} id - El ID del producto a actualizar.
 * @param {object} producto - Objeto con los datos a actualizar del producto.
 * @returns {Promise<void>} - Promesa que se resuelve cuando el producto es actualizado.
 */
export async function updateProducto(id, producto) {
    const { nombre, descripcion, precio, stock } = producto;
    const db = await conectarDB();
    try {
        await db.run(`
            UPDATE productos
            SET nombre = ?, descripcion = ?, precio = ?, stock = ?, fecha_modificacion = DATE('now')
            WHERE id = ?
        `, [nombre, descripcion, precio, stock, id]);
        
        console.log('Producto actualizado con éxito');
    } catch (err) {
        console.error('Error al actualizar el producto:', err.message);
        throw err;
    }
}
