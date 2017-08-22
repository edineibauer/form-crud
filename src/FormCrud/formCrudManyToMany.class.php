<?php

/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 26/12/2016
 * Time: 20:08
 */
class formCrudManyToMany {

    private $tableStruct;
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
        $coluna = $this->tableStruct['dados_value']['columnTarget'];
        $dados = $this->tableStruct[$coluna];

        if ($this->isEditable($dados)):

            $banco = new tableStructBasic();
            $banco->setTable($this->tableStruct['dados_value']['tableTarget']);
            $dadosTitle = $banco->getTitle();

            $dados['id'] = $this->createIdInput($this->tableStruct['dados_value']['tableTarget'], $dados);
            $this->setJsSave($dados);

            $key = str_replace(PRE, "", $this->tableStruct['dados_value']['tableTarget']);
            $this->result = '<br><input type="hidden" id="' . $dados['id'] . '" value="' . ($dados['value'] ? ',' . implode(',', $dados['value']) : "") . '," /><div class="container pd-small mg-bottom"><div class="container pd-small font-light font-size13 mg-bottom"><div class="box box-4 nomargin" id="box' . $key . '"><div class="container border-bottom" style="padding: 21px 10px 5px 5px">' . Check::getNameBanco($this->tableStruct['dados_value']['tableTarget']) . '</div><div class="container pd-medium"></div>' . $this->getValuesMarcadores($dados['value'], $key, $dados['id'], $dadosTitle) . '</div><div class="box box-4b pd-small"><input type="text" placeholder="buscar..." id="' . $key . '_field" class="pd-small marcador-input" rel="' . $key . '" alt="' . $dados['id'] . '" /><div id="div_' . $key . '_field" class="div-marcador-search"></div><br><br>';

            $read = new Read();
            $read->ExeRead($this->tableStruct['dados_value']['tableTarget'], "ORDER BY id DESC LIMIT 10");
            if ($read->getResult()):
                foreach ($read->getResult() as $cc):
                    $bgcolor = (isset($bgcolor) && $bgcolor == 'bg-white' ? 'bg-secondary' : 'bg-white');
                    $this->result .= '<div onclick="choiceTags(' . $cc['id'] . ', \'' . $key . '\', \'' . $dados['id'] . '\')" class="pointer inhover transition-easy container smart pd-small ' . $bgcolor . '"><div class="fl-left nomargin">' . $cc[$dadosTitle] . '</div></div>';
                endforeach;
            endif;

            $this->result .= '</div></div></div><div class="container pd-medium clear"></div>';

        endif;
    }

    private function encode($s) {
        return $s;
        //        return str_replace(array("===", "==", "="), array(md5("==="), md5("=="), md5("=")), base64_encode($s));
    }

    private function createIdInput($coluna, $dado) {
        return "i" . md5(rand(0, 99999) . $dado['posicao'] . rand(0, 99999) . $coluna);
    }

    private function getValuesMarcadores($value, $key, $id, $dadosTitle) {
        $input = "";
        if ($value):
            $input .= "<div class='container pd-small' id='box{$key}_select'>";

            foreach ($value as $tag):
                $tagname = Check::getBanco(PRE . $key, (int)$tag, $dadosTitle);
                $input .= "<div onclick=\"choiceTags({$tag}, '{$key}', '{$id}')\" style='cursor:not-allowed' class='smart container pd-small selected{$key}' rel='{$tag}' id='selected{$key}-{$tag}'><span class='fl-left nomargin'>{$tagname}</span></div>";
            endforeach;

            $input .= "</div>";

        endif;

        return $input;
    }

    private function setJsSave($dado) {
        $this->script = "'acao': 'manyToMany', 'column': '{$this->tableStruct['dados_value']['columnOrigin']}', 'id': id, 'column_target': '" . $this->encode($this->tableStruct['dados_value']['columnTarget']) . "', 'list': $('#{$dado['id']}').val()";
    }

    private function isEditable($dado) {
        if ($dado['comentario'] !== "hidden" && ((isset($dado['permissao']) && preg_match('/select/i', $dado['permissao'])) || !isset($dado['permissao']))):
            return true;
        endif;

        return false;
    }
}