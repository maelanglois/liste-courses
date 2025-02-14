<?php
class Liste{
  private int $id;
  private string $title;
  private string $oeufs;
  private string $lait;
  private string $eau;
  private string $farine;
  private string $beurre;
  private string $creation_date;

  private $bdd;

  public function __construct($bdd = null){
    if(!is_null($bdd)){
      $this->setBdd($bdd);
    }
  }

  public function getId(): int{
    return $this->id;
  }

  public function setId(int $id){
    $this->id = $id;
  }

  public function getTitle(): string{
    return $this->title;
  }

  public function setTitle(string $title){
    $this->title = $title;
  }

  public function getStatStrength(): string{
    return $this->oeufs;
  }

  public function setStatStrength(string $oeufs){
    $this->oeufs = $oeufs;
  }

  public function getStatDexterity(): string{
    return $this->lait;
  }

  public function setStatDexterity(string $lait){
    $this->lait = $lait;
  }

  public function getStatLuck(): string{
    return $this->eau;
  }

  public function setStatLuck(string $eau){
    $this->eau = $eau;
  }

  public function getStatIntelligence(): string{
    return $this->farine;
  }

  public function setStatIntelligence(string $farine){
    $this->farine = $farine;
  }

  public function getStatWisdom(): string{
    return $this->beurre;
  }

  public function setStatWisdom(string $beurre){
    $this->beurre = $beurre;
  }

  public function getCreationDate(): string{
    return $this->creation_date;
  }

  public function setCreationDate(string $creation_date){
    $this->creation_date = $creation_date;
  }

  public function initList(array $list){
    $title = $list["title"];
    $stats = $list["stats"];
    $this->setTitle($title);
    $this->setStatStrength($stats["oeufs"]);
    $this->setStatDexterity($stats["lait"]);
    $this->setStatLuck($stats["eau"]);
    $this->setStatIntelligence($stats["farine"]);
    $this->setStatWisdom($stats["beurre"]);
  }

  public function getAllProperties(){
    return [
      "pseudo" => $this->getPseudo(),
      "title" => $this->getTitle(),
      "job" => $this->getJob(),
      "stats" => [
        "oeufs" => $this->getStatStrength(),
        "lait" => $this->getStatDexterity(),
        "eau" => $this->getStatLuck(),
        "farine" => $this->getStatIntelligence(),
        "beurre" => $this->getStatWisdom(),
      ],
    ];
  }

  public function add(
    string $pseudo,
    string $title,
    string $job,
    array $stats
  ){
    $req = $this->bdd->prepare("INSERT INTO courses(title, oeufs, lait, eau, farine, beurre) VALUES(:title, :oeufs, :lait, :eau, :farine, :beurre)");
    $req->bindValue(":title", $title, PDO::PARAM_STR);
    $req->bindValue(":oeufs", $stats["oeufs"], PDO::PARAM_INT);
    $req->bindValue(":lait", $stats["lait"], PDO::PARAM_INT);
    $req->bindValue(":eau", $stats["eau"], PDO::PARAM_INT);
    $req->bindValue(":farine", $stats["farine"], PDO::PARAM_INT);
    $req->bindValue(":beurre", $stats["beurre"], PDO::PARAM_INT);
    if(!$req->execute()){
      return false;
    }
    $req->closeCursor();
    return true;
  }

  public function getList(){
    $req = $this->bdd->prepare("SELECT * FROM courses ORDER BY creation_date DESC");
    $req->execute();
    $courses = $req->fetchAll(PDO::FETCH_OBJ);
    if(!$courses){
      return null;
    }
    $req->closeCursor();
    return $courses;
  }

  public function getById(int $id){
    $req = $this->bdd->prepare("SELECT * FROM courses WHERE id=:id");
    $req->bindValue(":id", $id, PDO::PARAM_INT);
    $req->execute();
    $list = $req->fetch(PDO::FETCH_OBJ);
    if(!$list){
      return null;
    }
    return $list;
  }

  public function update(array $list){
    $req = $this->bdd->prepare("UPDATE courses SET 
    pseudo=:pseudo,
    title=:title,
    job=:job,
    oeufs=:oeufs,
    lait=:lait,
    eau=:eau,
    farine=:farine,
    beurre=:beurre
    WHERE id=:id
    ");
    $req->bindValue(":id", $list["id"], PDO::PARAM_INT);
    $req->bindValue(":pseudo", $list["pseudo"], PDO::PARAM_STR);
    $req->bindValue(":title", $list["title"], PDO::PARAM_STR);
    $req->bindValue(":job", $list["job"], PDO::PARAM_STR);
    $req->bindValue(":oeufs", $list["stats"]["oeufs"], PDO::PARAM_STR);
    $req->bindValue(":lait", $list["stats"]["lait"], PDO::PARAM_STR);
    $req->bindValue(":eau", $list["stats"]["eau"], PDO::PARAM_STR);
    $req->bindValue(":farine", $list["stats"]["farine"], PDO::PARAM_STR);
    $req->bindValue(":beurre", $list["stats"]["beurre"], PDO::PARAM_STR);
    if(!$req->execute()){
      return false;
    }
    return true;
  }

  public function deleteById(int $id){
    return $this->bdd->exec("DELETE FROM courses WHERE id={$id}");
  }

  private function setBdd($bdd){
    $this->bdd = $bdd;
  }
}