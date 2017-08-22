<?php
ob_start();
require('../../../_app/Config.inc.php');

if (ISHELPER):
    $id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);
    $table = filter_input(INPUT_POST, "table", FILTER_DEFAULT);
    $column = filter_input(INPUT_POST, "column", FILTER_DEFAULT);

    if ($column || !empty($column)):
        $up = new Update();
        $up->ExeUpdate($table, array($column => null), "WHERE id = :id", "id={$id}");
    endif;
endif;

ob_end_flush();