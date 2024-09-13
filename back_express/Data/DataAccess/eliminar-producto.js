import conectarDB from '../conexion.js';
/**
 * Elimina un producto de la base de datos según su ID.
 * 
 * @param {number} id - El ID del producto a eliminar.
 * @returns {Promise<void>} - Promesa que se resuelve cuando el producto es eliminado.
 * @throws {Error} - Lanza un error si la eliminación falla.
 */
export async function deleteProducto(id) {
    const db = await conectarDB();
    try {
        await db.run(`
            DELETE FROM productos
            WHERE id = ?
        `, [id]);

        console.log('Producto eliminado con éxito');
    } catch (err) {
        console.error('Error al eliminar el producto:', err.message);
        throw err;  
    }
}