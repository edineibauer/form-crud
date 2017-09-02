<?php

/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 16/07/2017
 * Time: 18:34
 */

namespace FormCrud;

class CreateFromStructTable {

    private $result = false;

    /**
     * @return mixed
     */
    public function getResult() {
        return $this->result;
    }

    public function ExeCreate($table, $dados) {
        $dados = (isset($dados[$table]) ? $dados[$table] : $dados);

        $dado = $this->getInfo($dados);

        var_dump($dados['dados_value']);die;

        foreach ($dados as $coluna => $dado):
            if ($coluna === "dados_value"):

            else:

            endif;
        endforeach;
    }

    private function getInfo($dados) {
        return Crud::convertStructTableToTableValue($dados);
    }
}