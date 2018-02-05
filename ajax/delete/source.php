<?php
$entity = trim(strip_tags(filter_input(INPUT_POST, 'entity', FILTER_DEFAULT)));
$column = trim(strip_tags(filter_input(INPUT_POST, 'column', FILTER_DEFAULT)));
$file = trim(strip_tags(filter_input(INPUT_POST, 'source', FILTER_DEFAULT)));
$name = trim(strip_tags(filter_input(INPUT_POST, 'name', FILTER_DEFAULT)));

if(!$file) {
    $read = new \ConnCrud\Read();
    $read->exeRead(PRE . $entity, "WHERE {$column} LIKE '%{$name}' ORDER BY id DESC LIMIT 1");
    if ($read->getResult())
        $file = $read->getResult()[0][$column];
}

if($file){
    $up = new \ConnCrud\Update();
    $up->exeUpdate(PRE . $entity, [$column => null], "WHERE {$column} = :c", "c={$file}");
    unlink(PATH_HOME . $file);
}