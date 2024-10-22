const { pool } = require("../database/db");

async function getUsersService(req, res) {
    /* res.send('Obteniendo todos los clientes') */
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en la consulta a la base de datos" })
    }
}

async function getUserById(id) {
    try {
        const [row] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function getUserForPerfil(id) {
    try {
        const [row] = await pool.query('SELECT id,name,email,phone_number,created_at,updated_at,rol FROM users WHERE id = ?', [id])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function getUserByEmail(email) {
    try {
        const [row] = await pool.query('SELECT * FROM users WHERE email =?', [email])
        return row
    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

async function createUserService(email, password, name, phone_number, rol) {
    try {
        const result = await pool.query('INSERT INTO users (email,password,name,phone_number,rol) VALUES (?,?,?,?,?)', [email, password, name, phone_number, rol])
        return { id: result.insertId, message: 'Usuario  creado con exito' }

    } catch (error) {
        console.error("Error en la consulta a la base de datos: ", error);
        throw new Error("Error en la consulta a la base de datos");
    }
}

module.exports = { createUserService, getUserByEmail, getUserById, getUsersService, getUserForPerfil }



