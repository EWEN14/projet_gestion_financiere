<?php
/*Projet MEJK/UNC MIAGE/Méthode agile/getSavedSeuil*/ 
require_once './data/DataBase.php';
require_once './class/gestion/seuil.php';
require_once './functions/utils.php';

init_session();

$base = new Database();

$calculs = json_encode($base->recupereCalcul($_SESSION['idUser']), JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);

echo $calculs;





