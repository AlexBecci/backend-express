CREATE TABLE
    orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT, -- ID del usuario que realizó la acción
        dish_id INT, -- ID del plato seleccionado
        state VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (dish_id) REFERENCES dishes (id), -- Relacionando con la tabla de platos
        FOREIGN KEY (user_id) REFERENCES users (id) -- Relacionando con la tabla de usuarios
    );

/*  
id
user_id
dish_id
state
created_at
updated_at

   */