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

async function insertDayMenuByUser(date, user_id) {
    const query = `
    INSERT INTO daily_menu (menu_date,user_id) VALUES (?,?)
    `;
    try {
        const [result] = await pool.query(query, [date, user_id]); // El resultado es un array
        return { id: result.insertId, message: 'Menú inicializado con éxito' };
    } catch (error) {
        console.error('Error al insertar el menú:', error);
        throw new Error('Error al inicializar el menú');
    }
}

async function getMenuByDateAndUser(menu_date, user_id) {

    // Preparar y ejecutar la consulta con parámetros
    const query = `
        SELECT id, menu_date, user_id, created_at, updated_at
        FROM daily_menu
        WHERE menu_date = ? AND user_id = ?
      `;
    const [rows] = await pool.execute(query, [menu_date, user_id]);
    console.log(rows)
    return rows

}
module.exports = {
    getDishesByMenuDateService, getMenuByDateAndUser, insertDayMenuByUser
};