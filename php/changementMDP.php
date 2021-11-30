<?php
  /*Projet MEJK/UNC MIAGE/Méthode agile/changement MDP*/ 
  require 'functions\utils.php';
  require 'data\DataBase.php';
  
  init_session();
  if (isset($_POST['valid'])) {
    if (isset($_POST['form_password']) && !empty($_POST['form_password']) &&
        isset($_POST['form_verifPassword']) && !empty($_POST['form_verifPassword']) &&
        $_POST['form_verifPassword'] == $_POST['form_password']) {
      $password = password_hash($_POST['form_password'], PASSWORD_DEFAULT);
      $requete = new DataBase();
      $userID = $_SESSION['idUser'];
      $requete->modifMDP($password,$userID);

      header('Location:index.php');
    }else {
      echo 'Erreur de mot de passe...';
    }
  }
  ?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inscription</title>
</head>
<body>
  <form method="post" >
    <input type="password" name="form_password" placeholder="Mot de passe..."><br>
    <input type="password" name="form_verifPassword" placeholder="Mot de passe..."><br>
    <input type="submit" name="valid" value="Valider">
  </form>
</body>
</html>
