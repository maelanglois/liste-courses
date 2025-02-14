<?php
class ListController
{

  public function Add(...$List)
  {
    $title = $List["title"] ?? null;
    $elements = $List["elements"] ?? null;

    if(
      !$pseudo
      || !$elements
    ){
      http_response_code(400);
      echo json_encode([
        "message" => "Une ou plusieurs valeurs ne sont pas définies.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $ListManager = new Liste(BDD::getInstance($config->getConfig()));

    $ListManager->initList(
      [
        "title" => $title,
        "elements" => [
          "oeufs" => $elements["oeufs"],
          "lait" => $elements["lait"],
          "eau" => $elements["eau"],
          "farine" => $elements["farine"],
          "beurre" => $elements["beurre"]
        ]
      ]
    );

    $newList = $ListManager->getAllProperties();

    if ($ListManager->add(
      $newList["title"],
      $newList["elements"]
    )) {
      http_response_code(200);
      $response = json_encode([
        "message" => "Ajout de la liste en base de données.",
        "status" => 200
      ]);
      echo $response;
      exit;
    }

    http_response_code(400);
    $response = json_encode([
      "message" => "Erreur lors de l'ajout de la liste en BDD.",
      "status" => 400
    ]);
    echo $response;
    exit;
  }

  public function ShowList(){
    $configManager = new Config();
    $ListManager = new Liste(BDD::getInstance($configManager->getConfig()));
    $Lists = $ListManager->getList();
    if(!$Lists){
      http_response_code(400);
      echo json_encode([
        "message" => "Aucune liste trouvée.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Liste des listes.",
      "status" => 200,
      "Lists" => $Lists
    ]);
    exit;
  }

  public function Show(...$params){
   $id = $params["id"];
  }

  public function Delete(...$params){
    $id = $params["id"];
    
    $config = new Config();
    $ListManager = new Liste(BDD::getInstance($config->getConfig()));

    if(!$ListManager->deleteById($id)){
      http_response_code(400);
      echo json_encode([
        "message" => "La suppression de la liste a échoué.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "La liste n°{$id} a été supprimé.",
      "status" => 200
    ]);
    exit;
  }
}