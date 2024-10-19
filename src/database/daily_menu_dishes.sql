CREATE TABLE daily_menu_dishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    daily_menu_id INT, -- Relacionando con el menú del día
    dish_id INT, -- Relacionando con los platos
    FOREIGN KEY (daily_menu_id) REFERENCES daily_menu (id),
    FOREIGN KEY (dish_id) REFERENCES dishes (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
/* 
id
name
description
category
image_url
created_at
updated_at

 */

 SELECT * FROM menu_system.daily_menu_dishes;



-- Insertar los platos asociados al menú del día (asumiendo que el menú con id=1 es para el 28 de octubre)
INSERT INTO daily_menu_dishes (daily_menu_id, dish_id) VALUES (1, 1); -- Relaciona el plato con id=1
INSERT INTO daily_menu_dishes (daily_menu_id, dish_id) VALUES (1, 2); -- Relaciona el plato con id=2
INSERT INTO daily_menu_dishes (daily_menu_id, dish_id) VALUES (1, 3); -- Relaciona el plato con id=3daily_menu
