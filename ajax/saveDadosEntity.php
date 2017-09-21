<?php
/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 20/09/2017
 * Time: 16:10
 */

$dados = $_POST['dados'] ?? null;
$entity = filter_input(INPUT_POST, 'entity', FILTER_DEFAULT);

if($entity && $dados) {
    $ent = new \Entity\Entity($entity);
    $ent->insertDataEntity($dados);
} else {
    echo json_encode(array("response" => 3));
}
