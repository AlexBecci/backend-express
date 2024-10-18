const { pool } = require("../database/db");

async function createOrderService(user_id, dish_id, state) {
    try {
        const result = await pool.query('INSERT INTO orders (user_id,dish_id,state) VALUES (?,?,?)', [user_id, dish_id, state])
        return { id: result.insertId, message: 'orden  creada con exito' }

    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

module.exports = { createOrderService, }
