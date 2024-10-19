// controllers/dishController.js
const { getDishesByMenuDateService } = require('../service/dailyMenu.service');

async function getDishesByMenuDate(req, res) {
    try {
        const { date, user_id } = req.query; // Suponiendo que la fecha se recibe como query param
        if (!date || !user_id) {
            return res.status(400).json({ message: "La fecha es requerida" });
        }
        console.log(req.query)
        // Llamada al servicio para obtener los platos por fecha de menú
        const dishes = await getDishesByMenuDateService(date,user_id);
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

module.exports = {
    getDishesByMenuDate,
};