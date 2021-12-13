-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 13 déc. 2021 à 07:28
-- Version du serveur :  5.7.21
-- Version de PHP :  7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `mejk_php`
--
CREATE DATABASE IF NOT EXISTS `mejk_php` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `mejk_php`;

-- --------------------------------------------------------

--
-- Structure de la table `seuil_renta_php`
--

DROP TABLE IF EXISTS `seuil_renta_php`;
CREATE TABLE IF NOT EXISTS `seuil_renta_php` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chiffre_affaire` double DEFAULT NULL,
  `cout_fixe` double DEFAULT NULL,
  `cout_variable` double DEFAULT NULL,
  `prix_vente_hors_taxe` double DEFAULT NULL,
  `seuil_resultat` double DEFAULT NULL,
  `taux_marge` double DEFAULT NULL,
  `seuil_valeur` double DEFAULT NULL,
  `seuil_volume` double DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `seuil_renta_php`
--

INSERT INTO `seuil_renta_php` (`id`, `chiffre_affaire`, `cout_fixe`, `cout_variable`, `prix_vente_hors_taxe`, `seuil_resultat`, `taux_marge`, `seuil_valeur`, `seuil_volume`, `user_id`) VALUES
(1, 250000, 30000, 30000, 4000, 120000, 0.6, 50000, 13, 1),
(2, 250000, 30000, 100000, 3500, 120000, 0.6, 50000, 14, 1),
(3, 250000, 30000, 100000, 4000, 120000, 0.6, 50000, 13, 1),
(4, 550000, 30000, 100000, 4000, 420000, 0.82, 36585.37, 9, 1),
(5, 700000, 30000, 100000, 4000, 570000, 0.86, 34883.72, 9, 1),
(6, 600000, 30000, 100000, 4000, 470000, 0.83, 36144.58, 9, 1),
(7, 400000, 30000, 100000, 4000, 270000, 0.75, 40000, 10, 1),
(8, 800000, 30000, 100000, 4000, 670000, 0.88, 34090.91, 9, 1),
(9, 10000000, 30000, 100000, 4000, 9870000, 0.99, 30303.03, 8, 1),
(10, 5000, 200, 1000, 50, 3800, 0.8, 250, 5, 1),
(11, 250000, 30000, 100000, 4000, 120000, 0.6, 50000, 13, 1),
(12, 450000, 30000, 100000, 4000, 320000, 0.78, 38461.54, 10, 1),
(13, 120000, 30000, 70000, 7000, 20000, 0.42, 71428.57, 10, 1),
(14, 250000, 30000, 100000, 4000, 120000, 0.6, 50000, 13, 1),
(15, 250000, 30000, 100000, 4000, 120000, 0.6, 50000, 13, 1),
(19, 250000, 30000, 100000, 4000, 120000, 0.6, 50000, 13, 5),
(18, 250000, 30000, 100000, 4000, 120000, 0.6, 50000, 13, 2),
(20, 250000, 3000, 10000, 5000, 237000, 0.96, 3125, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_registerDate` datetime DEFAULT NULL,
  `user_admin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `user_name`, `user_password`, `user_registerDate`, `user_admin`) VALUES
(1, 'admin', '$2y$10$W566SQS5aO0Ag2O4paYxWOwN3lcpiTudCsTstG3lqd7P7sFWVZgCm', '2021-11-21 00:00:00', 1),
(2, 'toto', '$2y$10$jvBBZnFqu3W6XB14IIrOXON7GuClxTBJudx72hdGSHOYBIN8ZMB92', '2021-11-22 10:03:20', 0),
(3, 'machin', '$2y$10$H71Whd8jm3oFdyLTjBukoO3MPC4WcY1BKR7dB62rzTSrZVTc3bTgG', '2021-11-24 14:39:37', 0),
(4, 'kevin', '$2y$10$BNJIOi.R0nFkCVAa3u/HveicQTfqeH8xL0.tf5tlbfUhKjlzTbAFy', '2021-11-24 17:58:25', 0),
(5, 'nicolas', '$2y$10$YWTUtExXrLqVS0q.xB8/n.aq4lhdQ4oD.cqo4OR0uGhO/M.YlIKeO', '2021-11-24 19:01:58', 0),
(6, 'JF', '$2y$10$Z72KgtPCv3698aqlfAnkNOvwhEuuiX5eVri2.Q3ADi.sy8UhVf1RC', '2021-11-30 18:49:01', 0),
(7, 'blob', '$2y$10$SgMGUPlfLpnBwXdkB1nAuOotKcyU5eY4bSIvOpvoK56zqKJEZ0RX.', '2021-12-01 15:20:15', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
