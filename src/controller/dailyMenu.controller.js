// controllers/dishController.js
const { getDishesByMenuDateService, getMenuByDateAndUser, insertDayMenuByUser } = require('../service/dailyMenu.service');

async function getDishesByMenuDate(req, res) {
    try {
        const { date, user_id } = req.query; // Suponiendo que la fecha se recibe como query param
        if (!date || !user_id) {
            return res.status(400).json({ message: "La fecha es requerida" });
        }
        console.log(req.query)
        // Llamada al servicio para obtener los platos por fecha de menú
        const dishes = await getDishesByMenuDateService(date, user_id);
        // Comprobar si hay platos para esa fecha
        if (dishes.length === 0) {
            return res.status(204).json({ message: "No se encontraron platos para esa fecha" });
        }
        console.log(dishes)
        res.json(dishes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en la consulta a la base de datos" });
    }
}

async function createtDayMenu(req, res) {
    const { menu_date, user_id } = req.body

    if (!menu_date || !user_id) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (menu_date,user_id) SON REQUERIDOS"
        })
    }
    try {
        const result = await insertDayMenuByUser(menu_date, user_id)
        console.log(result)
        return res.status(201).json(result)
    } catch (error) {
        console.error('Error al crear el menú:', error);
        res.status(500).json({ message: 'Error del servidor al crear el menú' });
    }
}
async function getMenuByDate(req, res) {

    const { menu_date, user_id } = req.query;

    // Validación básica de los parámetros
    if (!menu_date || !user_id) {
        return res.status(400).json({ message: 'menu_date y user_id son requeridos' });
    }

    try {

        const [rows] = await getMenuByDateAndUser(menu_date, user_id);
        // Enviar los resultados como respuesta
        res.status(200).json(rows);

    } catch (error) {
        console.error('Error al obtener el menú:', error);
        res.status(500).json({ message: 'Error del servidor al obtener el menú' });
    }
}

module.exports = {
    getDishesByMenuDate, getMenuByDate, createtDayMenu
};