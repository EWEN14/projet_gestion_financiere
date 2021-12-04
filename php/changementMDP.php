<?php
/*Projet MEJK/UNC MIAGE/Méthode agile/changement MDP*/
require 'functions\utils.php';
require 'data\DataBase.php';

init_session();
if (isset($_POST['valid'])) {
  if (
    isset($_POST['form_password']) && !empty($_POST['form_password']) &&
    isset($_POST['form_verifPassword']) && !empty($_POST['form_verifPassword']) &&
    $_POST['form_verifPassword'] == $_POST['form_password']
  ) {
    $password = password_hash($_POST['form_password'], PASSWORD_DEFAULT);
    $requete = new DataBase();
    $userID = $_SESSION['idUser'];
    $requete->modifMDP($password, $userID);

    header('Location:index.php');
  } else {
    echo 'Erreur de mot de passe...';
  }
}
?>

<!--Projet MEJK/UNC MIAGE/Méthode agile/Sauvegarde du Seuil de rentabilité-->
<!DOCTYPE html>
<html lang="fr">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Calcul du seuil de rentabilité en valeur et en volume.">

  <title>Seuil de Rentabilité</title>

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="img/miage-icon.png">

  <!-- Bootstrap core CSS -->
  <link href="../css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">

  <!-- Bootstrap core JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
    integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous">
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
  </script>
	
	<!-- menu -->
	<link href="../css/navbar.css" rel="stylesheet">
	<script src="../js/jquery-3.6.0.min.js" rel="stylesheet"></script>
	
    <script> 
		$(function(){
		  $("#menu").load("../menu-php.html"); 
		});
    </script> 

</head>

<body>
	<div id="menu" class="container"></div>
	
	<div class="container align-items-center">
		<div class="row align-self-center">
			<!-- div de pour centrer en début et fin -->
			<div class="col align-self-start"></div>
			
			<!-- formulaire -->
			<div class="col-5 align-self-center">
				<br>
				<h5 class="text-center text-secondary">Remplir les champs ci-dessous.</h5>
				<br><br><br>
				<form method="post">
					<div class="row align-items-center">
						<label for="exampleInputEmail1" class="col-sm-6 col-form-label">Saisir le nouveau mot de passe :</label>
						<div class="col-sm-6"><input type="password" name="form_password" placeholder="Mot de passe..."></div>
					</div>
					<div class="row align-items-center">
						<label for="exampleInputPassword1" class="col-sm-6 col-form-label">Pour confirmation :</label>						
						<div class="col-sm-6"><input type="password" name="form_verifPassword" placeholder="Mot de passe..."></div>
					</div>
					<br>
					<div  class="row align-items-center">
						<div class="col align-self-start"></div>
						<div class="col-sm-3"><input type="submit" class="btn btn-primary" name="valid" value="Valider"></div>
						<div class="col align-self-end"></div>
					</div>
				</form>
			</div>
			
			<!-- div de pour centrer en début et fin -->
			<div class="col align-self-end"></div>	
		</div>
	</div>
</body>

</html>