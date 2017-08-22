<?php

/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 26/12/2016
 * Time: 20:08
 */
class formCrudOneToMany {

    private $tableStruct;
    private $table;
    private $result;
    private $script;
    private $pk;

    /**
     * @param mixed $tableStruct
     */
    public function setTableStruct($tableStruct) {
        $this->tableStruct = $tableStruct;
    }

    /**
     * @param mixed $table
     */
    public function setTable($table) {
        $this->table = $table;
    }

    /**
     * @param mixed $pk
     */
    public function setPk($pk) {
        $this->pk = $pk;
    }

    /**
     * @return mixed
     */
    public function getResult() {
        $this->start();
        return $this->result;
    }

    /**
     * @return mixed
     */
    public function getScript() {
        return $this->script;
    }

    private function start() {
        $coluna = $this->tableStruct['dados_value']['column_link'];
        $dados = $this->tableStruct[$coluna];

        if ($this->isEditable($dados)):
            $dados['id'] = $this->createIdInput($coluna, $dados);

            $this->script .= "'acao': 'oneToMany', 'column': '{$this->pk['name']}', 'id': id, 'list': $('#{$dados['id']}').val()";

            $this->result = "<div class='container pd-small'>"
                . $this->getAddButton(str_replace(PRE, "", $this->table), $dados)
                . $this->getList($this->tableStruct['dados_value']['value'], $dados)
                . "</div><div class='container pd-medium'></div>";

        endif;
    }

    private function encode($s) {
        return $s;
        //        return str_replace(array("===", "==", "="), array(md5("==="), md5("=="), md5("=")), base64_encode($s));
    }

    private function createIdInput($coluna, $dado) {
        return "i" . md5(rand(0, 99999) . $dado['posicao'] . rand(0, 99999) . $coluna);
    }

    private function isEditable($dado) {
        if ($dado['comentario'] !== "hidden" && ((isset($dado['permissao']) && preg_match('/select/i', $dado['permissao'])) || !isset($dado['permissao']))):
            return true;
        endif;

        return false;
    }

    /**
     * adiciona mais um conteudo desta tabela
     */
    private function getAddButton($titulo, $dados) {
        return "<div class='container pd-small'><div class='fl-left pd-small font-size15 font-bold upper color-blackgray'>" . ucwords(str_replace('-', ' ', Check::getNameBanco($titulo))) . "</div><button style='margin-left:40px' class='fl-left btn btn-staticwhite upper boxshadow hovershadow-heavy transition-easy font-bold pd-smallb radius' onclick=\"getPage('{$this->table}', 0, '{$dados['id']}');setEditingId(0, '{$this->table}', '{$this->tableStruct['dados_value']['column_link']}');\">+</button></div>";
    }

    /**
     * Obtem a lista de conteúdos deste one to many
     */
    private function getList($values, $dados) {
        $ids = ($values ? ",{$values}," : ",");

        return "<div class='container pd-small'></div><input type='hidden' value='{$ids}' class='choiceOneToMany' id='{$dados['id']}' /><div class='container pd-small choiceOneToManyDiv' rel='{$this->table}'>"
            . $this->getValores($values, $dados)
            . "</div>";
    }

    private function getValores($values, $dado) {
        if ($values):

            foreach ($this->tableStruct as $col => $dadoTag):
                if (isset($dadoTag['tags'])):
                    if (in_array("title", $dadoTag['tags'])):
                        $titleName = $col;
                    elseif (in_array("image", $dadoTag['tags'])):
                        $titleCover = $col;
                    endif;
                endif;
            endforeach;


            $dados = "";
            $ids = array_filter(explode(",", $values));
            $read = new Read();
            foreach ($ids as $id):
                if (isset($titleCover)):
                    $read->ExeRead($this->table, "WHERE id = :id", "id={$id}");
                    $image = ($read->getResult() && isset($read->getResult()[0][$titleCover]) ? "<div class='fl-left'><img src='" . HOME . "/tim.php?src=" . HOME . "/uploads/{$read->getResult()[0][$titleCover]}&w=40&h=40' width='40' height='40' style='width:40px' class='fl-left' title='{$read->getResult()[0][$titleName]}' alt='{$read->getResult()[0][$titleName]}' /></div>" : "");
                else:
                    $image = "";
                endif;

                $class = ($image !== "" ? "pd-medium" : "pd-small");

                $buttons = "<button onclick=\"deleteOneToMany('{$this->table}', '{$this->tableStruct['dados_value']['column_link']}', '{$dado['id']}', {$id});\" title='excluir' class='fl-right btn btn-transparent {$class} color-terceary transition-easy'>x</button><button onclick=\"getPage('{$this->table}', {$id}, '{$dado['id']}');setEditingId({$id}, '{$this->table}', '{$this->tableStruct['dados_value']['column_link']}');\" class='edtButtonTable btn btn-transparent fl-right font-light {$class} transition-easy'><i class='shoticon shoticon-lapis font-size07' style='padding-left: 15px;'></i></button>";
                $dados .= "<div class='container controlOneToMany-{$id}' style='border-bottom:solid 1px #DDD'>{$image}<div class='fl-left {$class} oneToManyTitle'>" . Check::getBanco($this->table, (int)$id, $titleName) . "</div><div class='fl-right'>{$buttons}</div></div>";

            endforeach;

            return $dados;
        endif;

        return "";
    }
}