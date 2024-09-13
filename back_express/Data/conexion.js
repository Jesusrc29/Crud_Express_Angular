import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function conectarDB(){
    return open({
        filename: 'db.productos',
        driver: sqlite3.Database
    })
}

export default conectarDB;