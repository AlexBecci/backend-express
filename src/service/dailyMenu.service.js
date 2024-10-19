const { pool } = require("../database/db");

async function getDishesByMenuDateService(date, user_id) {
    /* res.send('Obteniendo todos los clientes') */
    const query = `
    SELECT d.*
    FROM daily_menu dm
    JOIN daily_menu_dishes dmd ON dm.id = dmd.daily_menu_id
    JOIN dishes d ON dmd.dish_id = d.id
    WHERE dm.menu_date = ? AND dm.user_id = ?
    `;
    const [rows] = await pool.query(query, [date, user_id]); // Placeholder "?" para evitar inyección SQL
    console.log(rows)
    return rows
}

module.exports = {
    getDishesByMenuDateService,
};