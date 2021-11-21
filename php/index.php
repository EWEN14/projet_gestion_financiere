<?php
  require 'functions\utils.php';
  require 'data\DataBase.php';
  init_session();

  if (isset($_GET['action']) && !empty($_GET['action']) && $_GET['action'] == 'logout') {
    clean_session();
    header('location: index.php');
  }

  if (isset($_POST['valid_connection'])) {
    if (isset($_POST['form_username']) && !empty($_POST['form_username']) &&
        isset($_POST['form_password']) && !empty($_POST['form_password'])) {
      $username = $_POST['form_username'];
      $password = $_POST['form_password'];
      
      $requete = new DataBase();
      $verifUser = $requete->getUserName($username);
      if (password_verify($password, $verifUser->getPassword())) {
        $_SESSION['username'] = $username;
        $_SESSION['rank'] = $verifUser->getAdmin();
        header('Location: content.php');
      }else {
        echo 'Identifiant ou mot de passe incorrect';
      }
    }else {
      echo 'Identifiant ou mot de passe incorrect';
    }
  }
 ?>

<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>Page d'acceuil</h1>
    <p>Bienvenue sur la page d'acceuil</p>
    <hr>
    <h2>Se connecter</h2>
    <?php if (is_logged()): ?>
      <p> Bienvenue <?= htmlspecialchars($_SESSION['username'])?> | <a href="index.php?action=logout">Se déconnecté !!!</a>
      </p>
    <?php else: ?>
      <form method="post">
        <input type="text" name="form_username" placeholder="Identifiant...">
        <input type="password" name="form_password" placeholder="Mot de passe...">
        <input type="submit" name="valid_connection" value="Connection">
      </form>
    <?php endif; ?>
    <?php if (!is_logged()): ?>
      <p>
          <a href="inscription.php">inscription</a>
      </p>
    <?php endif; ?>
    <nav>
      <ul>
        <li>
          <a href="index.php">Acceuil</a>
          <a href="content.php">Page</a>
        </li>
      </ul>
    </nav>

  </body>
</html>
