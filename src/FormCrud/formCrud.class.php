<?php

/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 26/12/2016
 * Time: 20:08
 */

namespace FormCrud;

class FormCrud extends FormScript {

    private $tableStruct;
    private $id;
    private $entity;

    private $pk;
    private $input;

    public function __construct($entity = null)
    {
        if($entity) {
            $this->setEntity($entity);
        }
    }

    /**
     * @param mixed $entity
     */
    public function setEntity($entity)
    {
        $this->entity = $entity;
        $this->startEntity();
    }

    /**
     * @param mixed $id
     */
    public function setId($id) {
        $this->id = $this->checkId($id);
    }

    private function checkId($id) {
        if (is_numeric($id) && $id > 0):
            return $id;
        endif;

        return false;
    }

    /**
     * @return mixed
     */
    public function getInputs() {
        $this->checkStart();

        return implode('', $this->input) . parent::getResult();
    }

    /**
     * @return mixed
     */
    public function getFormCrud() {
        $this->checkStart();

        return $this->getInputs() . $this->getActionButtons();
    }

    public function getActionButtons() {
        $this->checkStart();

        $dado = ["funcao" => parent::getFunction(), "title" => (isset($this->tableStruct[parent::getTable()]['id']) && $this->tableStruct[parent::getTable()]['id']['value'] === 0 ? 'Salvar' : 'Atualizar')];

        $input = new View();
        $input->setBase("_app/formCrud/tpl");
        return $input->Retorna($dado, $input->Load("saveButton"));
    }

    private function checkStart() {
        if (parent::getTable() && !$this->tableStruct):
            parent::setTable(parent::getTable());

            $bancoInfo = new TableStruct();
            $bancoInfo->setTable(parent::getTable());
            $bancoInfo->setId($this->id);
            $this->tableStruct = $bancoInfo->getResult();
            $this->start($this->tableStruct[parent::getTable()]);
        endif;
    }

    private function start($tableDados) {
        foreach ($tableDados as $coluna => $dados):
            if ($coluna === "dados_value"):
                $this->checkDadosValue($dados);
            else:
                if ($this->isEditable($dados)):
                    $this->getRelationalInput($coluna, $dados, $tableDados);
                endif;
            endif;
        endforeach;
    }

    private function getRelationalInput($coluna, $dados, $tableDados) {
        $dados['id'] = $this->createIdInput($coluna, $dados);

        $this->pk = ($dados['chave'] === "pk" ? array('name' => $coluna, 'id' => $dados['id']) : $this->pk);
        parent::setJsSave($coluna, $dados);

        if (!$this->checkInputKey($dados, $coluna)):
            if (!$this->checkComentarioColumToInputType($dados, $coluna, $tableDados)):
                $this->checkTypeColumToInputType($coluna, $dados);
            endif;
        endif;
    }

    private function checkDadosValue($dados) {
        if (isset($dados['oneToMany'])):
            foreach ($dados['oneToMany'] as $table => $dado):
                $many = new FormCrudOneToMany();
                $many->setPk(array("name" => $dados['oneToMany'][$table]['dados_value']['column_link'], "id" => $this->pk['id']));
                $many->setTableStruct($dado);
                $many->setTable($table);
                $this->input[] = $many->getResult();
                parent::setScript(2, $table, $many->getScript(), "");
            endforeach;
        endif;

        if (isset($dados['manyToMany'])):
            foreach ($dados['manyToMany'] as $table => $dado):
                $many = new FormCrudManyToMany();
                $many->setPk($this->pk);
                $many->setTableStruct($dado);
                $this->input[] = $many->getResult();
                parent::setScript(3, $dados['manyToMany'][$table]['dados_value']['tableMiddle'], $many->getScript(), "");
            endforeach;
        endif;
    }

    private function createIdInput($coluna, $dado) {
        return "i" . md5("f" . $dado['posicao'] . $coluna . parent::getTable() . "a");
    }

    private function checkInputKey($dados, $coluna) {
        switch ($dados['chave']):
            case "pk":
                $this->setIdTable($coluna, $dados);
                return true;
                break;

            case "indice":
                return true;
                break;

            case "fk":
                $this->setOneToOne($dados, $coluna);
                return true;
                break;
        endswitch;

        return false;
    }

    private function setIdTable($column, $dados) {
        $dadosString = $dados;
        unset($dadosString['tags'], $dadosString['style'], $dadosString['exe'], $dadosString['allow'], $dadosString['regular']);
        $input = new View();
        $input->setBase("_app/formCrud/tpl");
        $this->input[] = $input->Retorna($dadosString, $input->Load("hidden"));
        $this->pk = array('name' => $column, 'id' => $dados['id']);
    }

    private function setOneToOne($dados, $coluna) {
        $dados = $this->checkDadosOneToOne($dados);
        $dados['titulo'] = ucwords(str_replace(array('-', "_"), array(" ", " "), $coluna));
        $dados['input'] = (isset($dados['tags']['title']) ? "<input type='text' class='font-size12 container pd-small choiceOneToOne' value='{$dados[$dados['tags']['title']]}' alt='{$dados['tags']['title']}' rel='{$dados['table']}' />" : '');
        $dados['id'] = $dados['id'] ?? 0;
        $dados['idValue'] = ($dados['id'] === 0 ? '' : $dados['id']);
        $dados['image_display'] = (isset($dados['cover']) ? "" : "ds-none");
        $dados['button_display'] = ($dados['table'] === parent::getTable() ? "ds-none" : "");
        $dados['button_title'] = ($dados['id'] > 0 ? "<i class='shoticon shoticon-lapis shoticon-button'></i>" : "+");

        unset($dados['tags']);

        $input = new View();
        $input->setBase("_app/formCrud/tpl");
        $this->input[] = $input->Retorna($dados, $input->Load("oneToOne"));
    }

    private function checkDadosOneToOne($dados) {
        foreach ($dados[$dados['table']] as $column => $dado):
            if (isset($dado['value'])):
                $n[$column] = $dado['value'];
            endif;
            if (isset($dado['tags'])):
                foreach ($dado['tags'] as $value):
                    $n['tags'][$value] = $column;
                endforeach;
            endif;
        endforeach;

        if (isset($dados['style'])):
            $n['class'] = (is_array($dados['style']) ? implode(' ', $dados['style']) : $dados['style']);
        endif;

        $n['idName'] = $dados['id'];
        $n['table'] = $dados['table'];

        return $n;
    }

    private function checkComentarioColumToInputType($dado, $coluna, $tableDados) {
        $key = new InputCommentKeys();
        $key->setColuna($coluna);
        $key->setRetorno(parent::getRetorno());
        $key->setTable(parent::getTable());
        $key->setDado($dado);
        $key->setData($tableDados);
        if ($key->getResult()):
            $this->input[] = $key->getResult();
            return true;
        endif;

        return false;
    }

    private function checkTypeColumToInputType($coluna, $dado) {
        $dado['comentario'] = (!empty($dado['comentario']) ? "<i class='fl-left color-blackgray font-light' style='margin-left: 7px;'>(" . Check::Words($dado['comentario'], 5) . ")</i>" : "");
        $dado['nome'] = "<div class='fl-left'>{$this->changeNameColum($coluna)}</div>" . $dado['comentario'];
        $dado['rel'] = (isset($dado['tags']) && in_array("title", $dado['tags']) ? "rel='title' " : "");
        $dado['class'] = isset($dado['style']) ? (is_array($dado['style']) ? implode(' ', $dado['style']) : $dado['style']) : "";
        $dado['max'] = ($dado['tipo'] === "int" ? (pow(10, $dado['tamanho']) - 1) : "");
        $dado['tipo'] = ($dado['tipo'] === "text" && $dado['tamanho'] > 255 ? 'ckeditor' : $dado['tipo']);
        $dado['value'] = $this->checkValue($dado);
        $dado['coluna'] = $coluna;
        unset($dado['tags'], $dado['style'], $dado['exe'], $dado['allow'], $dado['regular']);

        $input = new View();
        $input->setBase("_app/formCrud/tpl");
        $this->input[] = $input->Retorna($dado, $input->Load($dado['tipo']));
    }

    private function checkValue($dado) {
        if ($dado['tipo'] === "datetime"):
            return str_replace(' ', 'T', (!$dado['value'] ? date("Y-m-d H:i:s") : $dado['value']));
        elseif ($dado['tipo'] === "ckeditor"):
            return htmlentities($dado['value']);
        endif;

        return $dado['value'];
    }

    private function changeNameColum($name) {
        $arr = ['_', '-', PRE, 'price', 'title', ' app', 'title', 'content', 'cover', 'views', 'urlname'];
        $narr = [' ', ' ', '', 'preço', 'titulo', '', 'titulo', 'descricão', 'imagem', 'visualizações', 'link'];
        return ucfirst(str_replace($arr, $narr, $name));
    }

    private function isEditable($dado) {
        if ((isset($dado['comentario']) && $dado['comentario'] !== "hidden") && ((isset($dado['permissao']) && preg_match('/select/i', $dado['permissao'])) || !isset($dado['permissao']))):
            return true;
        endif;

        return false;
    }
}