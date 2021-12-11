CREATE DATABASE mejk_php DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE mejk_php;

CREATE TABLE users (
	id int primary key auto_increment,
    user_name varchar(50),
    user_password varchar(255),
    user_registerDate datetime,
    user_admin tinyint DEFAULT 0
);

CREATE TABLE seuil_renta_php (
	id int primary key auto_increment,
    chiffre_affaire double,
    cout_fixe double,
    cout_variable double,
    prix_vente_hors_taxe double,
    seuil_resultat double,
    taux_marge double,
    seuil_valeur double,
    seuil_volume double,
	user_id int,
    CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE USER 'agent1'@'localhost' IDENTIFIED BY 'miage';

-- Accord de tous les droits sur la base de données. --
GRANT ALL PRIVILEGES ON mejk_php.* TO 'agent1'@'localhost';
FLUSH PRIVILEGES;