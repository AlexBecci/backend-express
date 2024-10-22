const { createUserService, getUserByEmail, getUserById, getUsersService, getUserForPerfil } = require('../service/user.service')


async function getUsers(req, res) {
    const result = getUsersService(req, res)
    return result
}

async function getUser(req, res) {

    const { user_id } = req.query
    if (!user_id) {
        return res.status(400).json({ message: "El id del usuario es requerido" });
    }
    try {
        const result = await getUserForPerfil(user_id);

        if (result.length === 0) {
            return res.status(204).json({ message: "No se encontraron usuarios con ese ID" });
        }

        console.log(result);
        return res.json(result);  // No need to call .json() on result, just return it directly

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error en la consulta a la base de datos" });

    }
}




module.exports = {
    getUsers,
    getUser
}