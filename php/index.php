<?php
/*Projet MEJK/UNC MIAGE/Méthode agile/index*/
require 'functions\utils.php';
require 'data\DataBase.php';
init_session();

if (isset($_GET['action']) && !empty($_GET['action']) && $_GET['action'] == 'logout') {
	clean_session();
	header('location: index.php');
}

if (isset($_POST['valid_connection'])) {
	if (
		isset($_POST['form_username']) && !empty($_POST['form_username']) &&
		isset($_POST['form_password']) && !empty($_POST['form_password'])
	) {
		$username = $_POST['form_username'];
		$password = $_POST['form_password'];

		$requete = new DataBase();
		$verifUser = $requete->getUserName($username);

		if (password_verify($password, $verifUser->getPassword())) {
			$_SESSION['username'] = $username;
			$_SESSION['rank'] = $verifUser->getAdmin();
			$_SESSION['rank2'] = $verifUser->getAdmin();
			$_SESSION['idUser'] = $verifUser->getId();
			header('Location: ./index.php');
		} else {
			$erreurMDP = 'Identifiant ou mot de passe incorrect';
		}
	} else {
		$erreurMDP = 'Identifiant ou mot de passe incorrect';
	}
}
?>

<!DOCTYPE html>

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Accueil de l'application MEJK.">
	<title>Accueil</title>

	<!-- Favicon -->
	<link rel="icon" type="image/x-icon" href="../img/miage-icon.png">

	<!-- Bootstrap core CSS -->
	<link href="../css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">

	<link href="../css/main.css" rel="stylesheet">

	<!-- Bootstrap core JS -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous">
	</script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
	</script>
	<script src="../js/jquery-3.6.0.min.js"></script>

</head>

<body>
	<!-- menu de navigation -->
	<div class="container">
		<div class="row">
			<nav class="navbar navbar-expand-sm bg-light navbar-light" style="background-color: #e3f2fd;">
				<div class="container-fluid">
					<a class="navbar-brand" href="./index.php">Accueil</a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="collapsibleNavbar">
						<ul class="navbar-nav">
							<?php if (is_logged()) : ?>
								<li class="nav-item">
									<a class="nav-link" href="../seuilrentabilite.html">Seuil de rentabilité</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="../cump.html">CUMP</a>
								</li>
							<?php endif; ?>

							<?php if (!is_logged()) : ?>
								<li class="nav-item">
									<a class="navbar-link" href="inscription.php">Inscription</a>
								</li>
							<?php endif; ?>
						</ul>
					</div>
				</div>
				<?php if (is_logged()) : ?>
					<div class="options">
						<a class="px-3" href="changementMDP.php">Mot de passe oublié ?</a>
						<a href="index.php?action=logout"><i class="bi bi-door-open-fill" style="font-size: 2rem; color: #eb984e;"></i></a>
					</div>
		</div>
	<?php endif; ?>
	</nav>
	</div>
	</div>


	<div class="container">
		<div class="row">
			<h2 class="text-center text-secondary">Bienvenue sur l'application MEJK</h2>
			<?php if (is_logged()) : ?>
				<h3 class="text-center text-primary">Comment allez-vous <?= htmlspecialchars($_SESSION['username']) ?> ?</h3>

				<div class="row row-features">
					<div class="col-lg-6 col-md-12 feature">
						<a href="../seuilrentabilite.html">
							<div class="feature-element">
								<div><img class="icone" src="../img/sustainable.png"></div>
								<div>Calcul de Seuil de Rentabilité</div>
							</div>
						</a>
					</div>

					<div class="col-lg-6 col-md-12 feature">
						<a href="../cump.html">
							<div class="feature-element">
								<div><img class="icone" src="../img/stock.png"></div>
								<div>Calcul du Coût Unitaire Moyen Pondéré</div>
							</div>
						</a>
					</div>
				</div>

				<h4>Vos derniers calculs</h4>

				<table class="table table-hover table-sm align-middle table-responsive-sm text-secondary`">
					<thead>
						<tr class="text-secondary text-center align-middle">
							<th scope="row">Prix de Vente HT du produit (PV)</th>
							<th scope="row">Chiffre d'Affaires (CA)</th>
							<th scope="row">Charges Variables (CV)</th>
							<th scope="row">Marges Sur Coût Variable (MSCV)</th>
							<th scope="row">Taux de Marge Sur Coût Variable (TMSCV)</th>
							<th scope="row">Charges Fixes (CF)</th>
							<th scope="row">Résultat</th>
							<th scope="row">Seuil de Rentabilité en valeur (SR val)</th>
							<th scope="row">Seuil de Rentabilité en volume (SR vol)</th>
						</tr>
					</thead>
					<tbody id="table-body" class="text-secondary display-11">

					</tbody>
					<tfoot>
						<tr>
						</tr>
					</tfoot>
				</table>

				<div class="saved-calculs"></div>
			<?php endif; ?>
		</div>
	</div>

	<?php if (!is_logged()) : ?>
		<div class="container">
			<div class="row">
				<div class="col align-self-start"></div>
				<div class="col-4 align-self-center">
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
							<input type="submit" class="btn btn-primary" name="valid_connection" value="Connexion">
						</div>
						<?php
						if (isset($erreurMDP)) {
							echo "<div class='erreurMDP'>" . $erreurMDP . "</div>";
							$erreurMDP = null;
						}
						?>
				</div>
				<div class="col align-self-end"></div>
			</div>
		</div>
	<?php endif; ?>

	<!--appel du script de récupération des dernières sauvegardes uniquement si on est connecté-->
	<?php if (is_logged()) : ?>
		<script src="../js/accueilLastSaves.js"></script>
	<?php endif; ?>
</body>

</html>