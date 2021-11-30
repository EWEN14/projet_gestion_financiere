<?php
/*Projet MEJK/UNC MIAGE/Méthode agile/memoire*/ 
/*
  Hash : A -> B.
  password_get_info($hash) -> array.
  password_needs_reghash($pass, $hash) -> ressort le Hash.
*/
  /*$pass = 'coucou';
  echo password_hash($pass, PASSWORD_BCRYPT);
  $hash = password_hash($pass, PASSWORD_BCRYPT);
  //echo password_verify($pass, $hash);
  */
  /*require 'DataBase.php';
  $toto = new DataBase();
  $test = $toto->getUserName('Mathilde');
  echo '<pre>';
  echo $test->getName();
  echo '</pre>';
  /*$utilisateur = new Users();
  $utilisateur->setName($test->name);
  $utilisateur->setPassword($test->password);
  $myJSON = json_encode($utilisateur);
  echo $myJSON;
  echo $utilisateur->getName();
  /*$myObj = json_decode($myJSON, false);
  print_r($myObj);*/
  //exit;