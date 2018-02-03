<?php
$search = trim(strip_tags(filter_input(INPUT_POST, 'search', FILTER_DEFAULT)));
$entity = trim(strip_tags(filter_input(INPUT_POST, 'entity', FILTER_DEFAULT)));

$dicionario = \EntityForm\Metadados::getDicionario($entity);
$info = \EntityForm\Metadados::getInfo($entity);
$column = $dicionario[$info['title']]['column'];

$template = new \Helpers\Template("form-crud");
$read = new \ConnCrud\Read();
$read->exeRead(PRE . $entity, "WHERE {$column} LIKE '%{$search}%' ORDER BY {$column} LIMIT 7");
if ($read->getResult())
    $data['data'] = $template->getShow("list-result", ["data" => $read->getResult(), "column" => $column]);
