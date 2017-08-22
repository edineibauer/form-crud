<?php
ob_start();
require('../../../_app/Config.inc.php');

if (ISHELPER):

    $dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);
    $table = (preg_match("/^" . PRE . "/i", $dados['t']) ? "" : PRE) . $dados['t'];
    unset($dados['t']);

    function oneToMany($dados, $table) {
        if (isset($dados['id']) && !empty($dados['id']) && is_numeric($dados['id']) && $dados['id'] > 0):
            $valores = array_filter(explode(",", $dados['list']));

            $up = new Update();
            if (isset($valores)):
                foreach ($valores as $id):
                    $id = trim($id);
                    $novoDados[$dados['column']] = (int) $dados['id'];
                    $up->ExeUpdate($table, $novoDados, "WHERE id = :cl", "cl={$id}");
                    $result['id'][] = $id;
                endforeach;
            endif;
        endif;

        $result['success'] = true;
        echo json_encode($result);
    }

    function manyToMany($dados, $table) {
        if (isset($dados['id']) && !empty($dados['id']) && is_numeric($dados['id']) && $dados['id'] > 0):
            $valores = array_filter(explode(",", $dados['list']));

            //Exclui relações já existentes
            $del = new Delete();
            $del->ExeDelete($table, "WHERE {$dados['column']} = :m", "m={$dados['id']}");

            //Adiciona as novas relações encontradas
            $create = new Create();
            if (isset($valores)):

                foreach ($valores as $id):

                    $novoDados[$dados['column']] = (int) $dados['id'];
                    $novoDados[$dados['column_target']] = (int)trim($id);
                    $create->ExeCreate($table, $novoDados);
                    $result['id'][] = $create->getResult();

                endforeach;
            endif;

            $result['success'] = true;
            echo json_encode($result);
        endif;
    }

    function normal($dados, $table) {
        unset($dados['acao']);

        $save = new InputSave();
        $save->setTable($table);
        $save->setInputs($dados);
        $save->save();
        echo $save->getResult();
    }

    switch ($dados['acao']):
        case 'oneToMany':
            oneToMany($dados, $table);
            break;

        case 'manyToMany':
            manyToMany($dados, $table);
            break;

        default:
            normal($dados, $table);

    endswitch;
endif;

ob_end_flush();
?>