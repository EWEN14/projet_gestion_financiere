CREATE DATABASE mejk_php DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE mejk_php;

CREATE TABLE users (
	id int primary key auto_increment,
    user_name varchar(50),
    user_password varchar(255),
    user_registerDate datetime,
    user_admin tinyint default(0)
);

CREATE USER 'agent1'@'localhost' IDENTIFIED BY 'miage';

-- Accord de tous les droits sur la base de données.
GRANT ALL PRIVILEGES ON mejk_php.* TO 'agent1'@'localhost';
FLUSH PRIVILEGES;

INSERT INTO users (user_name,user_password,user_registerDate,user_admin) VALUES('Mathilde','$2y$10$y/GNmcpEldQdQO9BX1Pp3.ZwKr39HL72c99rgVBOzG91eUqrd/trq',now(),1);

-- INSERT INTO users (user_name,user_password,user_registerDate,user_admin) VALUES('Kevin','$2y$10$xQl.BhHBJrrDNDPYJMDg4.z/yjLPHP.FyytoDSFnBMB/aUuk5z05O',now(),0);


SELECT *
FROM users;