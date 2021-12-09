<?php

//fonction qui initialise une session PHP
function init_session(): bool {
  if (!session_id())
  {
    session_start();
    session_regenerate_id();
    return true;
  }
  return false;
}

//fonction qui arrête un session php.
function clean_session(): void {
  session_unset();
  session_destroy();
}

//fonction qui vérifie si l'utilisateur est un admin.
function is_admin() : bool{
  $logged = true;
  if (isset($_SESSION['rank']) && isset($_SESSION['username']) && !empty($_SESSION['username'] && $_SESSION['rank'] == '1')) {
    $logged = true;
  }else {
    $logged = false;
  }
  return $logged;
}

//fonction qui vérifie si l'utilisateur est connecté à l'application.
function is_logged(): bool {
  $logged = true;
  if (isset($_SESSION['username']) && !empty($_SESSION['username'])) {
    $logged = true;
  }else {
    $logged = false;
  }
  return $logged;
}

//fonction qui calcule la date du jour.
function dateDuJour():String {
  $date = getdate();
  if ($date['mday'] < 10) {
    $date = $date['year'].'-'.$date['mon'].'-0'.$date['mday'];
  }else {
    $date = $date['year'].'-'.$date['mon'].'-'.$date['mday'];
  }
  return $date;
}

//Fonction de conversion de type.
function intToFloat($entier): float
{
    $doubleString = number_format((double)$entier, 2, '.', '');
    return floatval($doubleString);
}
