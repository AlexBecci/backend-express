// controllers/dishController.js
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
        return res.status(400).json({ message: 'El plato ya está en el menú diario.' }); // Puedes ajustar esto según tus necesidades
    }
    const rows = await insertDailyMenuDishesService(daily_menu_id, dish_id);
    console.log(rows);

    return res.status(201).json({ message: 'Plato agregado al menú diario.', rows }); // Respuesta adecuada
}




module.exports = {
    createDishesByMenuDate
};