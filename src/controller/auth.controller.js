const { createUserService, getUserByEmail } = require('../service/user.service')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { SECRET_KEY, NODE_ENV } = require('../config');

async function register(req, res) {
    const { email, password, name, phone_number, rol } = req.body

    if (!email || !password || !name || !phone_number || !rol) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS (name, phone_number, email,password,rol) SON REQUERIDOS"
        })
    }
    const valid = await emailIsValid(email)
    if (!valid) {
        console.log('retornar mensaje de usuario repetido')
        return res.status(409).json({
            message: "El usuario ingresado ya esta en uso"
        })
    }
    console.log(req.body)
    try {
        // Encriptar la contraseña
        const hash = await bcrypt.hash(password, 10);
        console.log(hash);
        const result = await createUserService(email, hash, name, phone_number, rol);
        return res.status(201).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error en la creacion del user en la base de datos" })

    }
}
//LOGOUT
function logout(req, res) {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'Strict'
    })
    res.status(200).json({ message: 'Logout successful' });
}


async function login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "TODOS LOS CAMPOS email,password) SON REQUERIDOS"
        })
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        console.log('hash', hash)
        //llamando al service de auth para pasarle username y password(hash)
        const userFound = await getUserByEmail(email);
        if (userFound.length <= 0) {
            console.log('No encontro user:', userFound)
            return res.status(404).json({ message: "No se encontro usuario con esas credenciales" })
        }
        console.log('econtro', userFound[0], 'contra', userFound[0].password)
        //implementacion con cookies
        const isMatch = await comparePasswords(password, userFound[0].password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Nombre de usuario o Contraseña invalida ' });
        }
        //generamos el token
        const token = jwt.sign({ id: userFound[0].id, email: userFound[0].email }, SECRET_KEY, { expiresIn: '4h' })
        //variable de tiempo
        const fourHoursInMs = 4 * 3600000; // 4 horas en milisegundos
        //configurar opciones de la cookie
        const cookieOptions = {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: fourHoursInMs
        }
        //enviar la cookie con el token
        res.cookie('authToken', token, cookieOptions)

        res.status(200).json({ message: 'Login successful', token: token, cookie: cookieOptions, userId: userFound[0].id });
        // Comparar la contraseña proporcionada con el hash almacenado
        /*   bcrypt.compare(password, userFound[0].password, (err, isMatch) => {
              if (err) {
                  return res.status(500).json({ error: 'Error comparing passwords' });
              }
              if (isMatch) {
                  // Aquí podrías generar un token de sesión o JWT
                  const token = jwt.sign({ id: userFound.id, username: userFound.username }, SECRET_KEY, { expiresIn: '1h' })
                  res.status(200).json({ message: 'Login successful', token });
              } else {
                  res.status(401).json({ error: 'Invalid username or password' });
              }
          }); */
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//comparar la contrasena con el hash almacenado
async function comparePasswords(password, nativePassword) {
    const boolean = await bcrypt.compare(password, nativePassword)
    return boolean
}
async function emailIsValid(email) {
    try {
        const result = await getUserByEmail(email);
        console.log(result)
        if (result.length > 0) {
            console.log('encontro user:', result)
            return false
        }
        console.log('email valido', result)
        return true
    } catch (error) {
        console.log(error)
    }
}



function authenticateToken(req, res, next) {
    const token = req.cookies.authToken;
    console.log("Token recibido:", token); // Log para verificar el token

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log("Error de verificación de token:", err);
            return res.status(403).json({ message: 'Invalid token' });
        }

        console.log("Usuario autenticado:", user); // Log para verificar el usuario autenticado
        req.user = user;
        next();
    });
}

//funcion vieja
/* function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token: ', token, 'header', authHeader)
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, 'your_secret_key', (err, user) => {
        console.log(err, user)
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next()
    })
} */
module.exports = {
    register,
    login,
    authenticateToken,
    logout
}