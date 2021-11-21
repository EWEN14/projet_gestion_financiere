<?php
  require 'functions\utils.php';
  require 'data\DataBase.php';
  
  init_session();
  if (isset($_POST['valid'])) {
    if (isset($_POST['form_username']) && !empty($_POST['form_username']) &&
        isset($_POST['form_password']) && !empty($_POST['form_password']) &&
        isset($_POST['form_verifPassword']) && !empty($_POST['form_verifPassword']) &&
        $_POST['form_verifPassword'] == $_POST['form_password']) {
      $username = $_POST['form_username'];
      $password = password_hash($_POST['form_password'], PASSWORD_DEFAULT);
      $requete = new DataBase();
      echo $password;
      $requete->createUser(htmlspecialchars($username), $password);
      header('Location:index.php');
    }else {
      echo 'Identifiant ou mot de passe manquant...';
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
  <form method="post">
    <input type="text" name="form_username" placeholder="Identifiant..."><br>
    <input type="password" name="form_password" placeholder="Mot de passe..."><br>
    <input type="password" name="form_verifPassword" placeholder="Mot de passe..."><br>
    <input type="submit" name="valid" value="Valider">
  </form>
</body>
</html>
