import  conectarDB  from '../conexion.js';
/**
 * Obtiene un producto de la base de datos según su ID.
 * 
 * @param {number} id - El ID del producto a buscar.
 * @returns {Promise<Object|null>} - El producto encontrado o null si no existe.
 */
export async function verProducto(id) {
    const db = await conectarDB();
    try {
        const producto = await db.get(`
            SELECT * FROM productos
            WHERE id = ?
        `, [id]);

        if (!producto) {
            console.log(`Producto con id ${id} no encontrado`);
            return null;
        }

        return producto;
    } catch (err) {
        console.error('Error al obtener el producto:', err.message);
        throw err;  
    }
}