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
        header('Location: ../seuilrentabilite.html');
      }else {
        echo 'Identifiant ou mot de passe incorrect';
      }
    }else {
      echo 'Identifiant ou mot de passe incorrect';
    }
  }
 ?>

<!DOCTYPE html>
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Calcul du seuil de rentabilité en valeur et en volume."> 
  <title>Accueil</title>

    <!-- Bootstrap core CSS -->
		<!-- <link href="css/bootstrap.min.css" rel="stylesheet" > -->
		<link href="../css/bootstrap.min.css" rel="stylesheet">
		<link href="../css/icons/font/bootstrap-icons.css" rel="stylesheet">
				
	<!-- Bootstrap core JS -->
		<script src="../js/bootstrap.min.js"></script>
		<script src="../js/bootstrap.bundle.min.js"></script>
		<script src="../js/jquery-3.6.0.min.js"></script>

</head>
<body>
    <!-- menu de navigation -->
	<div class="container">	
		<div class="row">
			<nav class="navbar navbar-expand-sm bg-light navbar-light" style="background-color: #e3f2fd;">
			  <div class="container-fluid">
				<a class="navbar-brand" href="php/index.php">Accueil</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
				  <span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="collapsibleNavbar">
				  <ul class="navbar-nav">
				    <?php if (is_logged()): ?>
					<li class="nav-item">
					  <a class="nav-link" href="../seuilrentabilite">Seuil de rentabilité</a>
					</li>
					<?php endif; ?>
					
				    <?php if (!is_logged()): ?>
					<li class="nav-item">
					  <a class="navbar-link" href="inscription.php">inscription</a>  
					</li>
					<?php endif; ?>
					
				    <?php if (is_logged()): ?>
					<li class="nav-item">
					  
					</li>
					<?php endif; ?>
					
					<li class="nav-item">
					  <a class="nav-link" href="#"></a>
					</li> 
					<li class="nav-item">
					  <a class="nav-link" href="cump-moyen-pondere"></a>
					</li> 
				  </ul>
				</div>
			  </div>
			  <?php if (is_logged()): ?>
			  <a href="index.php?action=logout"><i class="bi bi-door-open-fill" style="font-size: 2rem; color: #eb984e;" ></i></a></div>
			  <?php endif; ?>
			</nav>
		</div>
	</div>
	
	
	<div class="container">
	  <div class="row">
		<h2 class="text-center text-secondary">Bienvenue sur l'application MEJK</h2>
		<?php if (is_logged()): ?>
			<h3 class="text-center text-primary">Bienvenue <?= htmlspecialchars($_SESSION['username'])?></h3> 			  
		<?php endif; ?>
	  </div>		
	</div>	  	
	
	<?php if (!is_logged()): ?>
	<div class="container">
	  <div class="row">
		<div class="col align-self-start"></div>  
		<div class="col-3 align-self-center">
		  <h4 class="text-center text-secondary">Se connecter</h4>
		  <form method="post">
			<div>
			  <label for="exampleInputEmail1" class="form-label">Identifiant</label>
				<input type="text" class="form-control" name="form_username" placeholder="Identifiant..." aria-describedby="emailHelp">
			</div>
			<div>
			  <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
			  <input type="password" class="form-control" name="form_password" placeholder="Mot de passe...">
			</div>
			<div class="mt-3">
			  <input type="submit" class="btn btn-primary" name="valid_connection" value="Connection">
			</div>
		</div>
		<div class="col align-self-end"></div>
	  </div>
	</div>
	<?php endif; ?>

  </body>
</html>
