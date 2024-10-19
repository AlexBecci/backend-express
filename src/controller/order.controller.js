const { createOrderService, getOrdersByUser } = require('../service/order.service')

async function createOrder(req, res) {
    const { user_id, dish_id, state } = req.body
    if (!user_id || !dish_id || !state) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS ( user_id,dish_id,state) SON REQUERIDOS"
        })
    }
    console.log(req.body)
    try {
        const result = await createOrderService(user_id, dish_id, state);
        return res.status(201).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error en la creacion de la orden en la base de datos" })
    }
}

//get orders by user
async function getOrders(req, res) {
    try {
        const { user_id } = req.query; // Suponiendo que la fecha se recibe como query param
        if (!user_id) {
            return res.status(400).json({ message: "El user_id es requerido" });
        }
        console.log(req.query)
        // Llamada al servicio para obtener los platos por fecha de menú
        const orders = await getOrdersByUser(user_id);
        console.log(orders.length)
        // Comprobar si hay platos para esa fecha
        if (orders.length === 0) {
            return res.status(204).json({ message: "No se encontraron Ordenes para este usuario" });
        }
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en la consulta a la base de datos" });
    }
}



module.exports = {
    createOrder, getOrders
}