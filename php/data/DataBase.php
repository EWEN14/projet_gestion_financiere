<?PHP
require 'class\utilisateur\user.php';
require_once 'functions\utils.php';

class Database{
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


  public function __construct(){
      try{
        $this->_PDO = new PDO($this->DB_DSN, $this->DB_USER ,$this->DB_PASS, $this->OPTIONS);
      }catch (PDOException $pe) {
        echo 'ERREUR : '.$pe->getMessage();
      }
  }

  public function getUser($name,$password):Users{
    try {
      $users = new ArrayObject();
      $req = $this->_PDO->prepare('SELECT * FROM users WHERE user_name=:name AND user_password=:pwd');
      $req->bindParam(1, $name);
      $req->bindParam(2, $password);
      $req->execute();
      $value = $req->fetch(PDO::FETCH_OBJ);
      $utilisateur = new Users();
      $utilisateur->setName($value->user_name);
      $utilisateur->setPassword($value->user_password);
      $utilisateur->setAdmin($value->user_admin);
      return $utilisateur;
    } catch (PDOException $pe) {
      echo 'ERREUR : '.$pe->getMessage();
    }
  }

  public function getUserName($name):Users{
    try {
      $req = $this->_PDO->prepare('SELECT * FROM users WHERE user_name=:name');
      $req->bindParam('name', $name);
      $req->execute();
      $value = $req->fetch(PDO::FETCH_OBJ);
      $utilisateur = new Users();
      $utilisateur->setName($value->user_name);
      $utilisateur->setPassword($value->user_password);
      $utilisateur->setAdmin($value->user_admin);
      return $utilisateur;
    } catch (PDOException $pe) {
      echo 'ERREUR : '.$pe->getMessage();
    }
  }

  public function createUser($username, $password){
    try {
      $users = new ArrayObject();
      $requeteSQL = 'INSERT INTO users (user_name,user_password,user_registerDate,user_admin) VALUES("'.$username.'","'.$password.'",now(),0)';
      $req = $this->_PDO->prepare($requeteSQL);
      $req->execute();
    } catch (PDOException $pe) {
      echo 'ERREUR : '.$pe->getMessage();
    }
  }

}
