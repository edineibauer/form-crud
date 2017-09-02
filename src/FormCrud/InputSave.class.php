<?php

/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 26/12/2016
 * Time: 20:08
 */

namespace FormCrud;

class InputSave {

    private $result;
    private $id;
    private $inputs;
    private $table;
    private $structTable;
    private $oneToMany;

    /**
     * @param mixed $inputs
     */
    public function setInputs($inputs) {
        $this->inputs = $inputs;
    }

    /**
     * @return mixed
     */
    public function getResult() {
        return $this->result;
    }

    /**
     * @param mixed $table
     */
    public function setTable($table) {
        $this->table = $table;
    }

    /**
     * @param mixed $structTable
     */
    public function setStructTable($structTable) {
        $this->structTable = $structTable;
    }

    public function save() {
        $this->checkTableInInputs();
        if ($this->table):
            $this->checkStructTable();
            $this->checkIdInInputs();
            $this->applyRegularCommandComment();
            $this->applyExeCommandComment();
            $this->applyAllowValuesComment();
            $this->validaInputValues();
            $this->savePost();
        endif;
    }

    private function applyAllowValuesComment() {
        foreach ($this->structTable as $coluna => $dados):
            if (isset($dados['allow']) && is_array($dados['allow']) && !in_array($this->inputs[$coluna], $dados['allow'])):
                $this->result['error'][$this->createIdInput($coluna, $dados['posicao'])] = "valor '{$this->inputs[$coluna]}' INCORRETO. Valores aceitos: <br>[<b>" . implode(', ', $dados['allow']) . "</b>]";
            endif;
        endforeach;
    }

    private function applyRegularCommandComment() {
        foreach ($this->structTable as $coluna => $dados):
            if (isset($dados['regular']) && !$dados['null']):
                foreach ($dados['regular'] as $reg):
                    $reg = "/{$reg}/i";
                    if (!preg_match($reg, $this->inputs[$coluna])):
                        $this->result['error'][$this->createIdInput($coluna, $dados['posicao'])] = "valor '<b>" . strtoupper($this->inputs[$coluna]) . "</b>' INCORRETO. Expressão Regular não correspondida <br><b>{$reg}</b>";
                    endif;
                endforeach;
            endif;
        endforeach;
    }

    private function applyExeCommandComment() {
        $view = new View();
        $valores = $this->inputs;
        $valores['id'] = $this->id;
        foreach ($this->structTable as $coluna => $dados):
            if (isset($dados['exe'])):
                foreach ($dados['exe'] as $exe):
                    $this->inputs[$coluna] = $view->Retorna($valores, $exe);
                    $listCheck = ["@", "$"];
                    foreach ($listCheck as $act):
                        $this->inputs[$coluna] = $this->changeFunction($act, $this->inputs[$coluna]);
                    endforeach;
                endforeach;
            endif;
        endforeach;
    }

    private function changeFunction($action, $text) {
        if (preg_match('/' . preg_quote($action, '/') . '/i', $text)):
            $ntext = "";
            foreach (explode($action, $text) as $i => $v):
                $ntext .= ($i % 2 === 1 ? $this->checkActionExe($action, $v) : $v);
            endforeach;

            return $ntext;

        endif;

        return $text;
    }

    private function checkActionExe($action, $v) {
        switch ($action):
            case "@":
                return Check::Name($v);
                break;
            case "$":
                return Check::Words($v, 15);
                break;
        endswitch;
    }

    private function savePost() {
        if (!$this->result):

            $post = new Banco($this->table);
            $post->load('id', $this->id);
            $post->setDados($this->inputs);
            $this->result['id'] = $post->save();
            $this->result['success'] = true;

            $this->checkOneToMany();
        else:
            $this->result['success'] = false;
        endif;

        $this->result = json_encode($this->result);
    }

    private function checkOneToMany() {
        if ($this->oneToMany):
            foreach ($this->oneToMany as $table => $ids):
                foreach ($ids as $id):
                    $fk = new ForeignKey();
                    $fk->setTable($table);
                    if ($fk->getManyToOne()):
                        foreach ($fk->getManyToOne() as $fkMany):
                            $this->setOneToManyDados($fkMany, $table, $id);
                        endforeach;
                    endif;
                endforeach;
            endforeach;
        endif;
    }

    private function setOneToManyDados($fkMany, $table, $id) {
        $read = new Read();
        foreach ($fkMany as $column => $tableFka):
            if ($tableFka === $this->table):

                $read->ExeRead($table, "WHERE id = :id", "id={$id}");
                if ($read->getResult() && $read->getResult()[0][$column] !== $this->result):
                    if (empty($read->getResult()[0][$column])):
                        $up = new Update();
                        $up->ExeUpdate($table, array($column => $this->result), "WHERE id = :id", "id={$id}");
                    else:
                        $dados = $read->getResult()[0];
                        unset($dados['id']);
                        $dados[$column] = $this->result;

                        $create = new Create();
                        $create->ExeCreate($table, $dados);
                    endif;
                endif;

            endif;
        endforeach;
    }

    private function checkStructTable() {
        if (!$this->structTable && $this->table):
            $banco = new TableStruct();
            $banco->setTable($this->table);
            $this->structTable = $banco->getResult()[$this->table];
        endif;
    }

    private function validaInputValues() {
        foreach ($this->inputs as $name => $value):
            if (!$this->checkFk($name, $value)):
                $this->checkPermissao($name);
                $this->checkNullInputs($name, $value);
                $this->checkUniqueInputs($name, $value);
                $this->checkTipoInput($name, $value);
                $this->checkTamanhoInput($name, $value);
                $this->checkInformacaoInput($name, $value);
                $this->checkTagsAttr($name, $value);
                $this->checkEspecilInput($name, $value);
            endif;
        endforeach;
    }

    private function checkFk($table, $value) {
        if (preg_match('/^' . PRE . '/i', $table) && preg_match("/,/i", $value)):
            $this->oneToMany[$table] = array_filter(explode(",", $value));
            unset($this->inputs[$table]);
            return true;
        endif;

        return false;
    }

    private function checkNullInputs($name, $value) {
        if (!$this->structTable[$name]['null'] && empty($value) && ($this->structTable[$name]['value'] === "" || $this->structTable[$name]['value'] === null)):
            $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = $this->nomeAmigavel($name) . " não pode ficar vazio.";
        endif;
    }

    private function checkUniqueInputs($name, $value) {
        if ($this->structTable[$name]['chave'] === "unique"):
            $read = new Read();
            $read->ExeRead($this->table, "WHERE {$name} = '{$value}'" . ($this->id ? " && id != {$this->id}" : "") . " LIMIT 1");
            if ($read->getResult()):
                $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = "Este " . $this->nomeAmigavel($name) . " já existe, e precisa ser único.";
            endif;
        endif;
    }

    private function checkPermissao($name) {
        if ($this->id):
            if (!preg_match('/update/i', $this->structTable[$name]['permissao'])):
                $this->result['error']['infor'] = "Opss! Estas informações não podem ser alteradas no banco.";
            endif;
        else:
            if (!preg_match('/insert/i', $this->structTable[$name]['permissao'])):
                $this->result['error']['infor'] = "Opss! Estas informações não podem ser inseridas no banco.";
            endif;
        endif;
    }

    private function checkTagsAttr($name, $value) {
        if (isset($this->structTable[$name]['tags']) && !empty($value)):
            foreach ($this->structTable[$name]['tags'] as $tag):
                if ($tag === "cpf" && !Check::Cpf($value)):
                    $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = "Cpf Inválido";
                elseif ($tag === "cnpj" && !Check::Cnpj($value)):
                    $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = "Cnpj Inválido";
                elseif ($tag === "email" && !Check::Email($value)):
                    $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = "Email Inválido";
                elseif ($tag === "password" || $tag === "senha"):
                    $this->inputs[$name] = (string)Check::Encrypt($value);
                endif;
            endforeach;
        endif;
    }

    private function checkInformacaoInput($name, $value) {
        if ($this->structTable[$name]['comentario'] === "email" || $this->structTable[$name]['comentario'] === "mail"):
            if (!empty($value) && !Check::Email($value)):
                $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = "Email Inválido";
            endif;

        elseif ($this->structTable[$name]['comentario'] === "password" || $this->structTable[$name]['comentario'] === "senha"):
            $this->inputs[$name] = (string)Check::Encrypt($value);
        endif;
    }

    private function checkEspecilInput($name, $value) {
        if ($name === "cover"):
            $control = new ImageControl();
            $control->setTable($this->table);
            $control->setId($this->id);
            $this->inputs[$name] = $control->getImage();
            if ($control->getError()):
                $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = $control->getError();
            endif;
        endif;
    }

    private function checkTipoInput($name, $value) {
        $tipo = $this->structTable[$name]['tipo'];

        if (!$value && $value !== "0"):
            $this->inputs[$name] = $this->structTable[$name]['value'];

        elseif ($this->structTable[$name]['chave'] === "fk"):
            if (!is_numeric($value)):
                $this->caracteresInvalidos($name);
            else:
                $this->inputs[$name] = (int)$value;
            endif;

        elseif ($tipo === "int" || $tipo === "hidden" || $tipo === "select"):
            if (!is_numeric($value)):
                $this->caracteresInvalidos($name);
            else:
                $this->inputs[$name] = (int)$value;
            endif;

        elseif ($tipo === "float"):
            if (!is_numeric($value)):
                $this->caracteresInvalidos($name);
            else:
                $this->inputs[$name] = (float)number_format($value, $this->structTable[$name]['precisao']);
            endif;

        elseif ($tipo === "datetime"):
            if (!preg_match('/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/i', $value)):
                $this->caracteresInvalidos($name);
            endif;

        elseif ($tipo === "date"):
            if (!preg_match('/\d{4}-\d{2}-\d{2}/i', $value)):
                $this->caracteresInvalidos($name);
            endif;

        elseif ($tipo === "time"):
            if (!preg_match('/\d{2}:\d{2}/i', $value)):
                $this->caracteresInvalidos($name);
            endif;

        else:
            $this->inputs[$name] = (string)$value;
        endif;
    }

    private function checkTamanhoInput($name, $value) {
        if (!in_array($this->structTable[$name]['tipo'], array("datetime", "date", "time"))):
            if (strlen($value) > $this->structTable[$name]['tamanho']):
                $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = "O campo " . $this->nomeAmigavel($name) . " Excedeu seu tamanho máximo de <b>{$this->structTable[$name]['tamanho']}</b> caracteres.";
            endif;
        endif;
    }

    private function checkIdInInputs() {
        foreach ($this->structTable as $column => $dados):
            if ($column !== "dados_value" && $dados['chave'] === "pk"):
                if (isset($this->inputs[$column]) && $this->inputs[$column] > 0):
                    $this->id = $this->inputs[$column];
                    unset($this->inputs[$column]);
                    break;
                endif;
            endif;
        endforeach;
    }

    private function checkTableInInputs() {
        if (!$this->table && isset($this->inputs['t'])):
            $table = (preg_match("/^" . PRE . "/i", $this->inputs['t']) ? "" : PRE) . $this->inputs['t'];
            $this->setTable($table);
            unset($this->inputs['t']);
        endif;
    }

    private function nomeAmigavel($valor) {
        $column = ["title", "urlname", "content", "date"];
        $nome = ["titulo", "link", "descrição", "data"];
        return ucwords(str_replace($column, $nome, $valor));
    }

    private function caracteresInvalidos($name) {
        $this->result['error'][$this->createIdInput($name, $this->structTable[$name]['posicao'])] = "O campo " . $this->nomeAmigavel($name) . " possui caracteres inválidos.";
    }

    private function createIdInput($coluna, $posicao) {
        return "i" . md5("f" . $posicao . $coluna . $this->table . "a");
    }
}