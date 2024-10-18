const { pool } = require("../database/db");

async function createDishService(name, description, category, image_url) {
    try {
        const result = await pool.query('INSERT INTO dishes (name,description,category,image_url) VALUES (?,?,?,?)', [name, description, category, image_url])
        return { id: result.insertId, message: 'plato  creado con exito' }

    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function getDishByNameService(name) {
    try {
        const [row] = await pool.query('SELECT * FROM dishes WHERE name =?', [name])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

module.exports = { getDishByNameService, createDishService }
