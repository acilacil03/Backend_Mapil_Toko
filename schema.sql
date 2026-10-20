-- Skema Database MySQL
CREATE DATABASE IF NOT EXISTS project_mapil_crud;
USE project_mapil_crud;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contoh Data Awal
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@gmail.com', 'admin123', 'admin');

INSERT INTO products (name, price, description) VALUES
('Baju Cloth Blue', 150000.00, 'Kemeja Cloth berkualitas tinggi.'),
('Kaos Premium Black', 95000.00, 'Kaos bahan katun combed 30s.');
