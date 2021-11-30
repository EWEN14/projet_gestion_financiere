<?php
/*Projet MEJK/UNC MIAGE/Méthode agile/saveSeuil*/ 
require_once './functions/utils.php';
require_once './data/DataBase.php';
require_once './class/gestion/seuil.php';

init_session();

if (isset($_POST['code'])) {
  $data = json_decode(stripslashes($_POST['code']), true);

  $base = new Database();

  $seuil = new SeuilDeRentatibilite();
  $seuil->setChiffreAffaire(intToFloat($data["ca"]));
  $seuil->setCoutFixe(intToFloat($data["cf"]));
  $seuil->setCoutVariable(intToFloat($data["cv"]));
  $seuil->setPrixVenteHorsTaxe(intToFloat($data["pvht"]));
  $seuil->setResultat(intToFloat($data["resultat"]));
  $seuil->setTauxMarge(intToFloat($data["taux_marge"]));
  $seuil->setSeuilValeur(intToFloat($data["seuil_valeur"]));
  $seuil->setSeuilVolume(intToFloat($data["seuil_volume"]));

  $base->sauvegardeCalcul($seuil, $_SESSION['idUser']);
}

