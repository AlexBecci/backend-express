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

//get ordenes por usuario
async function getOrdersByUser(user_id) {
    const query = `
    SELECT
    o.id AS order_id,
    o.user_id,
    o.dish_id,
    o.state,
    o.created_at,
    o.updated_at,
    d.name AS dish_name,
    d.description AS dish_description,
    d.category AS dish_category,
    d.image_url AS dish_image_url
FROM 
    orders o
JOIN 
    dishes d ON o.dish_id = d.id
WHERE 
    o.user_id = ?
`;
    const [rows] = await pool.query(query, [user_id]); // Placeholder "?" para evitar inyección SQL
    return rows
}

module.exports = { createOrderService,getOrdersByUser }
