const { createDishService, getDishByNameService, getDishesService } = require('../service/dish.service')



async function getDishes(req, res) {
    const result = getDishesService(req, res)
    return result
}

async function createDish(req, res) {
    const { name, description, category, image_url } = req.body
    if (!name || !description || !category || !image_url) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS ( name,description,category, image_url) SON REQUERIDOS"
        })
    }

    const valid = await nameIsValid(name)
    if (!valid) {
        return res.status(409).json({
            message: "El nombre del ingresado ya esta en uso"
        })
    }
    console.log(req.body)
    try {
        const result = await createDishService(name, description, category, image_url);
        return res.status(201).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error en la creacion del plato en la base de datos" })
    }
}

async function nameIsValid(name) {
    try {
        const result = await getDishByNameService(name);
        console.log(result)
        if (result.length > 0) {
            console.log('encontro plato:', result)
            return false
        }
        console.log('nombre valido', result)
        return true
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createDish, getDishes
}