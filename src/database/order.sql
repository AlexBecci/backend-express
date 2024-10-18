CREATE TABLE
    orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(50),
        state VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    );

/*     id
user_id
state
created_at
updated_at */