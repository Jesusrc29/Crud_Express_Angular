import conectarDB from './Data/conexion.js';
import {crearTablaProductos} from './Data/producto.js';
import {insertarProducto, updateProducto,deleteProducto,listarProductos,verProducto} from './Data/DataAccess/index.js';
import express from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';

const app = express();

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());

// crearTablaProductos();

const PUERTO = 3000;

(async () => {
    try {
        await conectarDB();  // Conectamos a la base de datos
        console.log('Conexión a la base de datos exitosa');
    } catch (err) {
        console.log('Error al conectar a la base de datos', err);
    }
})();

app.get('/', (req, res) => {
    res.send('API');
});

app.get('/productos', (req, res) => {
    let productos = listarProductos();
    productos.then((data) => {
        res.json(data);
    }).catch((err) => {
        console.error('Error en /productos:', err.message);  
        res.status(400).json({error: err.message});
    });
});

app.get('/productos/:id', (req, res) => {
    let id = req.params.id;
    let producto = verProducto(id);
    producto.then((data) => {
        res.json(data);
    }).catch((err) => {
        console.error('Error en /productos:', err.message);  
        res.status(400).json({error: err.message});
    });
});

app.post('/productos', async (req, res) => {
    try {
        console.log('Datos a recibir en el POST/ producto',req.body);

        await insertarProducto(req.body);
        
        res.json({
            "statusCode": 200, 
            "message": "InsertarProducto fue llamado con éxito"
        });
    } catch (err) {
        console.error('Error en /productos:', err.message); 
        res.status(400).json({error: err.message});
    }
});

app.put('/productos/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const { nombre, descripcion, precio, stock } = req.body;
        if (!id) {
            return res.status(400).json({
                error: 'El id es requerido para actualizar un producto'
            });
        }else{
            console.log('Datos a recibir en el PUT/ producto',req.body);

            await updateProducto(id,{ nombre, descripcion, precio, stock });
            
            res.json({
                "statusCode": 200, 
                "message": "UpdateProducto fue llamado con éxito",
                "data":req.body
            });
        }
    } catch (err) {
        console.error('Error en /productos:', err.message); 
        res.status(400).json({error: err.message});
    }
});

app.delete('/productos/:id', async (req, res) => {
    try {
        let id = req.params.id;
        console.log('Datos a recibir en el DELETE/ producto',id);

        await deleteProducto(id);
        
        res.json({
            "statusCode": 200, 
            "message": "DeleteProducto fue llamado con éxito"
        });
    } catch (err) {
        console.error('Error en /productos:', err.message);  
        res.status(400).json({error: err.message});
    }
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});