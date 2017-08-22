<?php

ob_start();
require('../../../_app/Config.inc.php');

$banco = filter_input(INPUT_POST, 'banco', FILTER_DEFAULT);
$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$idValue = filter_input(INPUT_POST, 'idValue', FILTER_DEFAULT);
$column = filter_input(INPUT_POST, 'column', FILTER_DEFAULT);

$read = new Read();
$read->ExeRead($banco, "WHERE id = :id", "id={$id}");
if ($read->getResult()):

    if (isset($column)):
        $dados['title'] = (isset($read->getResult()[0]['title']) ? $read->getResult()[0]['title'] : "");

        $image = ($read->getResult() && isset($read->getResult()[0]['cover']) ? "<div class='fl-left'><img src='" . HOME . "/tim.php?src=" . HOME . "/uploads/{$read->getResult()[0]['cover']}&w=40&h=40' width='40' height='40' style='width:40px' class='fl-left' title='{$read->getResult()[0]['title']}' alt='{$read->getResult()[0]['title']}' /></div>" : "");

        $class = ($image !== "" ? "pd-medium" : "pd-small");

        $buttons = "<button onclick=\"deleteOneToMany('{$banco}', '{$column}', '{$idValue}', {$id});\" title='excluir' class='fl-right btn btn-transparent {$class} color-terceary transition-easy'>x</button>" . "<button onclick=\"getPage('{$banco}', {$id}, '{$idValue}');setEditingId({$id}, '{$banco}', '{$column}');\" class='edtButtonTable btn btn-transparent fl-right font-light {$class} transition-easy'><i class='shoticon shoticon-lapis font-size07' style='padding-left: 15px;'></i></button>";

        $dados['list'] = "<div class='container space controlOneToMany-{$id}'>{$image}<div class='fl-left {$class} oneToManyTitle'>" . $dados['title'] . "</div><div class='fl-right'>{$buttons}</div></div>";

        if (isset($dados)):
            echo json_encode($dados);
        endif;
    endif;
endif;
ob_end_flush();