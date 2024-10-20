const { pool } = require("../database/db");

async function createOrderService(user_id, dish_id, state, daily_menu_id) {
    try {
        const result = await pool.query('INSERT INTO orders (user_id,dish_id,state,daily_menu_id) VALUES (?,?,?,?)', [user_id, dish_id, state, daily_menu_id])
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
    o.daily_menu_id,
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
ORDER BY 
    o.created_at DESC; -- Ordena por fecha de creación, de más reciente a más antiguo

`;
    const [rows] = await pool.query(query, [user_id]); // Placeholder "?" para evitar inyección SQL
    return rows
}

//funcion que checkea que ya se haya cargado un menu ese dia en ese usuario en particular
async function checkExistingOrder(user_id, daily_menu_id) {
    const query = `
    SELECT 
    COUNT(*) AS order_count
FROM 
    orders
WHERE 
    user_id = ? 
AND 
    daily_menu_id = ?
`;
    const [result] = await pool.query(query, [user_id, daily_menu_id])
    console.log(result)
    return result[0].order_count > 0;//retornar true si ya existe una orden
}


module.exports = { createOrderService, getOrdersByUser, checkExistingOrder }
