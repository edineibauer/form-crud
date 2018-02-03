<?php

$entity = trim(strip_tags(filter_input(INPUT_POST, "entity", FILTER_DEFAULT)));
$column = trim(strip_tags(filter_input(INPUT_POST, "column", FILTER_DEFAULT)));

$dicionario = \EntityForm\Metadados::getDicionario($entity);
$info = \EntityForm\Metadados::getInfo($entity);

if (!empty($_FILES) && !empty($info["source"]) && $_FILES['file'] && $_FILES['file']['error'] == 0) {
    $valor = $_FILES['file']['name'];
    $extensao = pathinfo($valor, PATHINFO_EXTENSION);

    \Helpers\Helper::createFolderIfNoExist(PATH_HOME . "uploads");

    foreach ($info["source"] as $type => $i) {
        if(!empty($i) && $dicionario[$i]['column'] === $column) {
            \Helpers\Helper::createFolderIfNoExist(PATH_HOME . "uploads" . DIRECTORY_SEPARATOR . $type);
            \Helpers\Helper::createFolderIfNoExist(PATH_HOME . "uploads" . DIRECTORY_SEPARATOR . $type . DIRECTORY_SEPARATOR . date("Y"));
            \Helpers\Helper::createFolderIfNoExist(PATH_HOME . "uploads" . DIRECTORY_SEPARATOR . $type . DIRECTORY_SEPARATOR . date("Y") . DIRECTORY_SEPARATOR . date("m"));

            $name = "uploads" . DIRECTORY_SEPARATOR . $type . DIRECTORY_SEPARATOR . date("Y") . DIRECTORY_SEPARATOR . date("m") . DIRECTORY_SEPARATOR . \Helpers\Check::name(str_replace(".{$extensao}", "", $valor)) . ".{$extensao}";

            $data['id'] = "#" . $entity . "-" . $column;
            if (move_uploaded_file($_FILES['file']['tmp_name'], $name))
                $data['data'] = $name;
        }
    }
}