const { createOrderService } = require('../service/order.service')

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



module.exports = {
    createOrder
}