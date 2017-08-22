<?php

/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 03/07/2017
 * Time: 20:51
 */
class tableStructBasic {

    private $table;
    private $result;

    /**
     * @param mixed $table
     */
    public function setTable($table) {
        $this->table = $table;
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
    public function getTitle() {
        if ($this->result):
            return $this->checkTitle();
        else:
            $this->start();
            if ($this->result):
                return $this->checkTitle();
            endif;
        endif;

        return null;
    }

    private function checkTitle() {
        foreach ($this->result as $col => $d):
            if(isset($d['tags']) && in_array("title", $d['tags'])):
                return $col;
            endif;
        endforeach;

        return null;
    }

    private function start() {
        if ($this->table && !$this->result):
            $db = DBSA;
            $keys = array();
            $readI = new ReadInfo();
            $readI->ExeRead("COLUMNS", "WHERE TABLE_SCHEMA = :nb && TABLE_NAME = :nt", "nb={$db}&nt={$this->table}");
            if ($readI->getResult()):
                foreach ($readI->getResult() as $g):
                    $keys = array_merge($keys, $this->setKeys($g));
                endforeach;

                $this->result = $keys;
            endif;
        endif;
    }

    private function setKeys($g) {
        $key[$g['COLUMN_NAME']]['null'] = ($g['IS_NULLABLE'] === "YES" ? true : false);
        $key[$g['COLUMN_NAME']]['tipo'] = $this->getTipo($g['DATA_TYPE']);
        $key[$g['COLUMN_NAME']]['chave'] = $this->getChave($g['COLUMN_KEY']);
        $key[$g['COLUMN_NAME']]['increase'] = ($g['EXTRA'] === "auto_increment" ? true : false);
        $this->checkIdName($key[$g['COLUMN_NAME']]['chave'], $key[$g['COLUMN_NAME']]['increase'], $g['COLUMN_NAME']);
        $key[$g['COLUMN_NAME']]['posicao'] = $g['ORDINAL_POSITION'];
        $key[$g['COLUMN_NAME']]['permissao'] = $g['PRIVILEGES'];
        $key[$g['COLUMN_NAME']]['comentario'] = $g['COLUMN_COMMENT'];
        $key = $this->checkComment($key, $g['COLUMN_NAME']);
        $key[$g['COLUMN_NAME']]['tamanho'] = (int)($key[$g['COLUMN_NAME']]['tipo'] === "int" ? explode(")", explode("(", $g['COLUMN_TYPE'])[1])[0] : ($key[$g['COLUMN_NAME']]['tipo'] === "float" ? 11 : $g['CHARACTER_MAXIMUM_LENGTH']));
        $key[$g['COLUMN_NAME']]['codificação'] = $g['CHARACTER_SET_NAME'];
        $key[$g['COLUMN_NAME']]['precisao'] = (int)$g['NUMERIC_PRECISION'];

        return $key;
    }

    private function checkIdName($key, $auto, $col) {
        if ($auto && $key === "pk"):
            $this->idName = $col;
        endif;
    }

    private function checkComment($key, $column) {
        $comment = $key[$column]['comentario'];
        if ($comment):
            $new['comentario'] = $comment;

            $new = $this->extractTag('exe', $new, $comment, "<?", "?>");
            $new = $this->extractTag('allow', $new, $comment, "[[", "]]");
            $new = $this->extractTag('style', $new, $comment, "{{", "}}");
            $new = $this->extractTag('tags', $new, $comment, "<<", ">>");
            $new = $this->extractTag('regular', $new, $comment, "//", "\\\\");

            unset($key[$column]['comentario']);
            $key[$column] = array_merge($key[$column], $new);
        endif;

        return $key;
    }

    private function extractTag($tag, $new, $comment, $patternBegin, $patternEnd) {
        if (preg_match('/' . preg_quote($patternBegin, "/") . '/i', $comment)):
            foreach (explode($patternBegin, $comment) as $i => $dado):
                if ($i > 0 && preg_match('/' . preg_quote($patternEnd, "/") . '/i', $dado)):
                    $value = explode($patternEnd, $dado)[0];
                    $new[$tag] = (isset($new[$tag]) ? array_merge($new[$tag], explode(',', $value)) : explode(',', $value));
                    $new['comentario'] = trim(str_replace($patternBegin . $value . $patternEnd, '', $new['comentario']));
                endif;
            endforeach;
        endif;

        return $new;
    }

    private function getChave($chave) {
        switch ($chave):
            case "PRI":
                return "pk";
            case "MUL":
                return "indice";
            case "UNI":
                return 'unique';
        endswitch;

        return "";
    }

    private function getTipo($tipo) {
        if (in_array($tipo, array("tinyint", "int", "bigint", "smallint", "mediumint", "bit", "serial"))):
            return "int";
        elseif (in_array($tipo, array("decimal", "double", "real", "float"))):
            return "float";
        elseif (in_array($tipo, array("char", "varchar", "tinytext", "mediumtext", "text", "longtext"))):
            return "text";
        endif;

        return $tipo;
    }
}