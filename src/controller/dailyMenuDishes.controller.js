// controllers/dishController.js
const { pool } = require('../database/db');
const { insertDailyMenuDishesService, checkDishExistsInMenuService } = require('../service/dailyMenuDishes.service');

async function createDishesByMenuDate(req, res) {

    const { daily_menu_id, dish_id } = req.body

    if (!daily_menu_id || !dish_id) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (daily_menu_id,dish_id) SON REQUERIDOS"
        })
    }

    const exists = await checkDishExistsInMenuService(daily_menu_id, dish_id);

    if (exists) {
        console.log('El plato ya está en el menú diario.');
        return { message: 'El plato ya está en el menú diario.' }; // Puedes ajustar esto según tus necesidades
    }
    const [rows] = await insertDailyMenuDishesService();
    console.log(rows);
    return rows;

}




module.exports = {
    createDishesByMenuDate
};