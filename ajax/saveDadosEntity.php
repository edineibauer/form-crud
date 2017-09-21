<?php
/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 20/09/2017
 * Time: 16:10
 */

$dados = $_POST['dados'];
$entity = filter_input(INPUT_POST, 'entity', FILTER_DEFAULT);

$ent = new \Entity\Entity($entity);
$ent->insertDataEntity($dados);
