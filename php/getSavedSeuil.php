<?php

require_once './data/DataBase.php';
require_once './class/gestion/seuil.php';

$base = new Database();

$calculs = json_encode($base->recupereCalcul(1), JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);

echo $calculs;






