CREATE TABLE
    orders_histories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT, -- ID del pedido relacionado
        user_id INT, -- ID del usuario que realizó la acción
        event VARCHAR(100), -- Descripción del evento (Ej: 'Pedido creado', 'Estado actualizado', etc.)
        old_state VARCHAR(50), -- Estado anterior del pedido
        new_state VARCHAR(50), -- Nuevo estado del pedido
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora del evento
        comments VARCHAR(255), -- Cualquier comentario adicional o detalle
        FOREIGN KEY (order_id) REFERENCES orders (id), -- Relacionando con la tabla de pedidos
        FOREIGN KEY (user_id) REFERENCES users (id) -- Relacionando con la tabla de usuarios
    );

/* 
id
order_id
user_id
event
old_state
new_state
timestamp
comments
 */