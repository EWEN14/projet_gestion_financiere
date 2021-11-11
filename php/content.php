<?php
  require 'utils.php';
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

    <p>Bonjour, je sais toujours qui vous êtes : <?= $_SESSION['username'] ?> !!!</p>

    <?php if (is_admin()): ?>
      <p>Bonjour, vous êtes un administrateur !!!</p>
    <?php endif; ?>
    <a href="index.php?action=logout">Se déconnecté !!!</a>
    <nav>
      <ul>
        <li>
          <a href="index.php">Acceuil</a>
        </li>
        <li>
          <a href="content.php">Page</a>
        </li>
      </ul>
    </nav>
  </body>
</html>
