<?php

/**
 * Created by PhpStorm.
 * User: nenab
 * Date: 26/12/2016
 * Time: 17:37
 *
 * Retorna o modelo da tabela de um banco mysql.
 * exemplo: retorna quais os campos uma tabela possui, o nome, o tipo e os limites
 */

namespace FormCrud;

use ConnCrud\ForeignKey;
use ConnCrud\InfoTable;

class TableStruct {

    private $table;
    private $id;
    private $idName;
    private $valores;

    /**
     * @param mixed $table
     */
    public function setTable($table) {
        $this->table = (preg_match("/^" . PRE . "/i", $table) ? "" : PRE) . $table;
    }

    /**
     * @param mixed $id
     */
    public function setId($id) {
        $this->id = $this->checkId($id);
    }

    /**
     * @return mixed
     */
    public function getResult() {
        $bancoInfo[$this->table] = $this->getTableInfo($this->table, $this->id);
        return $this->getForeignKeys($this->table, $bancoInfo);
    }

    private function checkId($id) {
        if (is_numeric($id) && $id > 0):
            return $id;
        endif;

        return false;
    }

    private function getTableInfo($table, $id = 0) {
        $db = DATABASE;
        $keys = array();
        $readI = new InfoTable();
        $readI->ExeRead("COLUMNS", "WHERE TABLE_SCHEMA = :nb && TABLE_NAME = :nt", "nb={$db}&nt={$table}");
        if ($readI->getResult()):
            foreach ($readI->getResult() as $g):
                $keys = array_merge($keys, $this->setKeys($id, $table, $g, $keys));
            endforeach;
        endif;

        return $keys;
    }

    private function getForeignKeys($table, $bancoInfo) {
        $fk = new ForeignKey();
        $fk->setTable($table);
        $bancoInfo = $this->setOneToOneForeignKey($table, $bancoInfo, $fk->getOneToOne());
        $bancoInfo = $this->setOneToManyForeignKey($table, $bancoInfo, $fk->getOneToMany(), $fk);
        $bancoInfo = $this->setManyToManyForeignKey($table, $bancoInfo, $fk->getManyToMany(), $fk);

        return $bancoInfo;
    }

    private function setOneToOneForeignKey($table, $bancoInfo, $listColumnsOneToOne = null) {
        if ($listColumnsOneToOne):
            foreach ($listColumnsOneToOne as $tables):
                foreach ($tables as $column => $tableName):
                    $bancoInfo[$table][$column]['tipo'] = "hidden";
                    $bancoInfo[$table][$column]['table'] = $tableName;
                    $bancoInfo[$table][$column]['chave'] = "fk";
                    $bancoInfo[$table][$column]['comentario'] = (isset($bancoInfo[$table][$column]['comentario']) ? $bancoInfo[$table][$column]['comentario'] : "");
                    $bancoInfo[$table][$column]['value'] = (!isset($bancoInfo[$table][$column]['value']) || $bancoInfo[$table][$column]['value'] === 0 ? null : $bancoInfo[$table][$column]['value']);
                    $bancoInfo = $this->checkComment($bancoInfo, $column, $table);
                    unset($bancoOneToOneInfo);
                    $bancoOneToOneInfo[$tableName] = $this->getTableInfo($tableName, $bancoInfo[$table][$column]['value']);
                    $bancoInfo[$table][$column] = array_merge($bancoInfo[$table][$column], $this->getForeignKeys($tableName, $bancoOneToOneInfo));
                endforeach;
            endforeach;
        endif;

        return $bancoInfo;
    }

    private function setOneToManyForeignKey($table, $bancoInfo, $listColumnsOneToMany = null, $middle = null) {
        if ($listColumnsOneToMany):
            foreach ($listColumnsOneToMany as $tables):
                foreach ($tables as $column => $tableName):
                    unset($bancoOneToOneInfo);
                    $bancoOneToOneInfo[$tableName] = $this->getTableInfo($tableName, $bancoInfo[$table][$column]['value']);
                    $bancoInfo[$table]['dados_value']['oneToMany'] = (isset($bancoInfo[$table]['dados_value']['oneToMany']) ? array_merge($bancoInfo[$table]['dados_value']['oneToMany'], $this->getForeignKeys($tableName, $bancoOneToOneInfo)) : $this->getForeignKeys($tableName, $bancoOneToOneInfo));
                    $bancoInfo[$table]['dados_value']['oneToMany'][$tableName]['dados_value']['column_link'] = $middle->getColumnTable($table, $tableName);
                    $bancoInfo[$table]['dados_value']['oneToMany'][$tableName]['dados_value']['value'] = $this->getValueOneToMany($middle, $table, $tableName);
                endforeach;
            endforeach;
        endif;

        return $bancoInfo;
    }

    private function getValueOneToMany($middle, $table, $tableName) {
        if ($this->id && $middle):
            $read = new Read();
            $read->ExeRead($tableName, "WHERE {$middle->getColumnTable($table, $tableName)} = :id", "id={$this->id}");
            if ($read->getResult()):
                foreach ($read->getResult() as $item):
                    $valores[] = $item['id'];
                endforeach;

                return implode(',', $valores);
            endif;
        endif;

        return null;
    }

    private function setManyToManyForeignKey($table, $bancoInfo, $listColumnsManyToMany = null, $middle = null) {
        if ($listColumnsManyToMany):

            $middle->setOrigin($table);

            foreach ($listColumnsManyToMany as $tableName):
                $middle->setTarget($tableName);
                $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['tableMiddle'] = $middle->getRelationTable($table, $tableName);
                $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['tableTarget'] = $tableName;
                $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['columnOrigin'] = $middle->getColumnTable($table, $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['tableMiddle']);
                $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['columnTarget'] = $middle->getColumnTable($bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['tableMiddle'], $tableName);
                $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['value'] = $this->getValueManytoMany($middle, $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['columnOrigin'], $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['columnTarget'], null);
                $bancoInfo[$table]['dados_value']['manyToMany'][$tableName] = array_merge($bancoInfo[$table]['dados_value']['manyToMany'][$tableName], $this->getTableInfo($bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['tableMiddle'], $bancoInfo[$table]['dados_value']['manyToMany'][$tableName]['dados_value']['value']));
            endforeach;
        endif;

        return $bancoInfo;
    }

    private function setKeys($id, $table, $g, $keys) {
        if(isset($keys[$g['COLUMN_NAME']])):
            $key[$g['COLUMN_NAME']] = $keys[$g['COLUMN_NAME']];
        endif;

        $key[$g['COLUMN_NAME']]['null'] = ($g['IS_NULLABLE'] === "YES" ? true : false);
        $key[$g['COLUMN_NAME']]['tipo'] = $this->getTipo($g['DATA_TYPE']);
        $key[$g['COLUMN_NAME']]['chave'] = $this->getChave($g['COLUMN_KEY']);
        $key[$g['COLUMN_NAME']]['increase'] = ($g['EXTRA'] === "auto_increment" ? true : false);
        $this->checkIdName($key[$g['COLUMN_NAME']]['chave'], $key[$g['COLUMN_NAME']]['increase'], $g['COLUMN_NAME']);
        $key[$g['COLUMN_NAME']]['posicao'] = $g['ORDINAL_POSITION'];
        $key[$g['COLUMN_NAME']]['permissao'] = $g['PRIVILEGES'];
        $key[$g['COLUMN_NAME']]['comentario'] = $g['COLUMN_COMMENT'];
        $key[$g['COLUMN_NAME']]['tamanho'] = (int)($key[$g['COLUMN_NAME']]['tipo'] === "int" ? explode(")", explode("(", $g['COLUMN_TYPE'])[1])[0] : ($key[$g['COLUMN_NAME']]['tipo'] === "float" ? 11 : $g['CHARACTER_MAXIMUM_LENGTH']));
        $key[$g['COLUMN_NAME']]['codificação'] = $g['CHARACTER_SET_NAME'];
        $key[$g['COLUMN_NAME']]['precisao'] = (int)$g['NUMERIC_PRECISION'];
        $key[$g['COLUMN_NAME']]['value'] = $this->getValue($id, $table, $key, $g, $keys);
        $key = $this->checkComment($key, $g['COLUMN_NAME']);

        return $key;
    }

    private function checkIdName($key, $auto, $col) {
        if ($auto && $key === "pk"):
            $this->idName = $col;
        endif;
    }

    private function getValueManytoMany($middle, $origin, $target, $default = 0) {
        if ($this->id):
            $middle->setId($this->id);
            return array($origin => $this->id, $target => $middle->getResult());
        endif;

        return $default;
    }

    private function getValue($id = null, $table, $key, $g, $keys) {
        if ($id):
            if (is_array($id)):
                return $id[$g['COLUMN_NAME']];
            endif;

            if (!isset($this->valores[$table][$id]) && isset($this->idName)):

                $read = new Read();
                $read->ExeRead($table, "WHERE {$this->idName} = :id", "id={$id}");
                if ($read->getResult()):
                    $this->valores[$table][$id] = $read->getResult()[0];
                endif;
            endif;

            if (isset($this->valores[$table][$id])):
                return $this->returnTypeValue(isset($this->valores[$table][$id][$g['COLUMN_NAME']]) ? $this->valores[$table][$id][$g['COLUMN_NAME']] : ($g['COLUMN_DEFAULT'] ? $g['COLUMN_DEFAULT'] : $this->getDefaultValue($key, $g['COLUMN_NAME'])), $key[$g['COLUMN_NAME']]['tipo']);
            endif;

        else:
            return $this->returnTypeValue($g['COLUMN_DEFAULT'] ? $g['COLUMN_DEFAULT'] : $this->getDefaultValue($key, $g['COLUMN_NAME']), $key[$g['COLUMN_NAME']]['tipo']);
        endif;

        return "";
    }

    private function returnTypeValue($valor, $tipo) {
        if ($tipo === "int"):
            return (int)$valor;
        elseif ($tipo === "float"):
            return (float)$valor;
        endif;

        return $valor;
    }

    private function checkComment($key, $column, $table = null) {
        $comment = ($table ? $key[$table][$column]['comentario'] : $key[$column]['comentario']);
        if ($comment):
            $new['comentario'] = $comment;

            $new = $this->extractTag('exe', $new, $comment, "<?", "?>");
            $new = $this->extractTag('allow', $new, $comment, "[[", "]]");
            $new = $this->extractTag('style', $new, $comment, "{{", "}}");
            $new = $this->extractTag('tags', $new, $comment, "<<", ">>");
            $new = $this->extractTag('regular', $new, $comment, "//", "\\\\");

            if (isset($new['tags']) && isset($new['tags']['on'])):
                $key = $this->checkTagOnAtribuition($key, $new['tags'], $key[$column]['value']);
            endif;

            if ($table):
                unset($key[$table][$column]['comentario']);
                $key[$table][$column] = array_merge($key[$table][$column], $new);
            else:
                unset($key[$column]['comentario']);
                $key[$column] = array_merge($key[$column], $new);
            endif;
        endif;

        return $key;
    }

    private function checkTagOnAtribuition($key, $tags, $value) {
        if (count($tags) > 1):
            $alvo = 1;
            foreach ($tags as $tag):
                if ($alvo < 3 && $tag !== "on"):
                    $dados["tag_{$alvo}"] = $tag;
                    $alvo++;
                endif;
            endforeach;

            if ($alvo === 3):
                $key[$dados[($value == 1 ? 'tag_1' : 'tag_2')]]['style'] = "ds-none";
            endif;
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

    private function getDefaultValue($key, $coluna) {
        switch ($key[$coluna]['tipo']):
            case 'int':
                return 0;
                break;

            case 'float':
                return 0.00;
                break;

            case 'text':
                return "";
                break;

            case 'datetime':
                return null;
                //                return date("Y-m-d") . "T" . date("H:i:s");
                break;

            case 'date':
                return null;
                //                return date("Y-m-d");
                break;

            case 'time':
                return null;
                //                return ((int)date("H")) - 2 . ':' . date("i");
                break;

            case 'year':
                return date("y");
                break;

            case 'boolean':
                return false;
                break;

            default:
                return "";

        endswitch;
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