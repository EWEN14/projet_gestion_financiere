<?PHP
require_once 'class\utilisateur\user.php';
require_once 'functions\utils.php';
require_once 'class\gestion\seuil.php';

class Database
{
  private $_PDO;
  private $DB_DSN = 'mysql:host=localhost;dbname=mejk_php';
  private $DB_USER = 'agent1';
  private $DB_PASS = 'miage';
  private $OPTIONS = [
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    /*PDO::ATTR_PERSISTENT => true,*/
    PDO::ATTR_EMULATE_PREPARES => false
  ];


  public function __construct()
  {
    try {
      $this->_PDO = new PDO($this->DB_DSN, $this->DB_USER, $this->DB_PASS, $this->OPTIONS);
    } catch (PDOException $pe) {
      echo 'ERREUR : ' . $pe->getMessage();
    }
  }

  public function getUserName($name): Users
  {
    try {
      $req = $this->_PDO->prepare('SELECT * FROM users WHERE user_name=:name');
      $req->bindParam('name', $name);
      $req->execute();
      $value = $req->fetch(PDO::FETCH_OBJ);
      $utilisateur = new Users();
      $utilisateur->setName($value->user_name);
      $utilisateur->setPassword($value->user_password);
      $utilisateur->setAdmin($value->user_admin);
      $utilisateur->setId($value->id);
      return $utilisateur;
    } catch (PDOException $pe) {
      echo 'ERREUR : ' . $pe->getMessage();
    }
    return new Users(); // jamais atteint normalement
  }

  public function createUser($username, $password)
  {
    try {
      $users = new ArrayObject();
      $requeteSQL = 'INSERT INTO users (user_name,user_password,user_registerDate,user_admin) VALUES("' . $username . '","' . $password . '",now(),0)';
      $req = $this->_PDO->prepare($requeteSQL);
      $req->execute();
    } catch (PDOException $pe) {
      echo 'ERREUR : ' . $pe->getMessage();
    }
  }

  public function sauvegardeCalcul(SeuilDeRentatibilite $seuil, $userID)
  {
    if (!empty($seuil) && isset($seuil) && !empty($userID) && isset($userID)) {
      try {
        $req = $this->_PDO->prepare('INSERT INTO seuil_renta_php (chiffre_affaire, cout_fixe, cout_variable, prix_vente_hors_taxe, seuil_resultat, taux_marge,seuil_valeur, seuil_volume, user_id) 
            VALUES("' . $seuil->getChiffreAffaire() . '","' . $seuil->getCoutFixe() . '","' . $seuil->getCoutVariable() . '","' . $seuil->getPrixVenteHorsTaxe() . '","' . $seuil->getResultat() . '","' . $seuil->getTauxMarge() . '","' . $seuil->getSeuilValeur() . '","' . $seuil->getSeuilVolume() . '","' . $userID . '")');
        $req->execute();
      } catch (PDOException $pe) {
        echo 'ERREUR : ' . $pe->getMessage();
      }
    }
  }

  public function recupereCalcul($userID)
  {
    if (!empty($userID) && isset($userID)) {
      try {
        $req = $this->_PDO->prepare('
                    SELECT * FROM seuil_renta_php WHERE user_id = ' . $userID . ' ORDER BY id ASC');
        $req->execute();
        $value = $req->fetchAll(PDO::FETCH_OBJ);
        if ($value) {
          return $value;
        } else {
          return "nothing";
        }
      } catch (PDOException $pe) {
        echo 'ERREUR : ' . $pe->getMessage();
      }
    }
  }

  public function modifMDP($newMDP, $userID)
  {
    try {
      $req = $this->_PDO->prepare('UPDATE users SET user_password = "' . $newMDP . '" WHERE id = ' . $userID . '');
      $req->execute();
    } catch (PDOException $pe) {
      echo 'ERREUR : ' . $pe->getMessage();
    }
  }

}
