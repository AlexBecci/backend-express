CREATE TABLE daily_menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_date DATE NOT NULL, -- Fecha específica del menú
    user_id INT NOT NULL, -- ID del usuario que crea o gestiona el menú
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) -- Relación con la tabla de usuarios
);
/* 
id
menu_date
created_at
updated_at

 */
-- Insertar el menú del día
INSERT INTO daily_menu (menu_date) VALUES ('2024-10-28');

SELECT d.*
FROM daily_menu dm
JOIN daily_menu_dishes dmd ON dm.id = dmd.daily_menu_id
JOIN dishes d ON dmd.dish_id = d.id
WHERE dm.menu_date = '2024-10-28'; -- Suponiendo que el usuario seleccionó el 28 de octubre