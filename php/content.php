<?php
  /*Projet MEJK/UNC MIAGE/Méthode agile/content*/ 
  require 'functions\utils.php';
  init_session();
 ?>

<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Autre page</title>
  </head>
  <body>
    <h1>Autre page</h1>

    <p>Bonjour <?= $_SESSION['username'] ?>.</p>

    <?php if (is_admin()): ?>
      <p>Vous êtes administrateur.</p>
    <?php endif; ?>
    <a href="index.php?action=logout">Se déconnecter</a>
    <nav>
      <ul>
        <li>
          <a href="index.php">Accueil</a>
        </li>
        <li>
          <a href="content.php">Page</a>
        </li>
      </ul>
    </nav>
  </body>
</html>
