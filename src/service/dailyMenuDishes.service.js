

const { pool } = require("../database/db");

async function insertDailyMenuDishesService(daily_menu_id, dish_id) {
    /* res.send('Obteniendo todos los clientes') */
    const query = `INSERT INTO daily_menu_dishes (daily_menu_id, dish_id) VALUES (?, ?)`;

    const [rows] = await pool.query(query, [daily_menu_id, dish_id]); // Placeholder "?" para evitar inyección SQL
    console.log(rows)
    return rows
}

async function checkDishExistsInMenuService(daily_menu_id, dish_id) {
    const query = `SELECT * FROM daily_menu_dishes WHERE daily_menu_id = ? AND dish_id = ?`;
    const [rows] = await pool.query(query, [daily_menu_id, dish_id]);
    return rows.length > 0; // Retorna true si existe, false si no
}

module.exports = { insertDailyMenuDishesService, checkDishExistsInMenuService }