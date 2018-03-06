<?php

namespace FormCrud;


use ConnCrud\SqlCommand;
use EntityForm\Metadados;

class FormSearch
{
    private $entity;
    private $column;
    private $parent;
    private $search;
    private $result = "";

    /**
     * @param string $entity
     * @param string $parent
     * @param string $search
     * @return string
    */
    public function __construct(string $entity, string $parent, string $search, string $column)
    {
        $this->entity = $entity;
        $this->parent = $parent;
        $this->search = $search;
        $this->column = $column;

        $this->search();
    }

    /**
     * @return string
     */
    public function getResult(): string
    {
        return $this->result;
    }

    private function search()
    {
        $dicionario = \EntityForm\Metadados::getDicionario($this->entity);
        $relevant = \EntityForm\Metadados::getRelevant($this->entity);
        if($relevant) {
            $column = $dicionario[$relevant]['column'];

            $template = new \Helpers\Template("form-crud");
            $where = "WHERE {$column} LIKE '%{$this->search}%'";
            $data = $this->filter();

            $comando = "SELECT " . PRE . $this->entity . ".* FROM " . PRE . $this->entity . (!empty($data['join']) ? " {$data['join']}" : "") . " WHERE " . PRE . $this->entity . ".{$column} LIKE '%{$this->search}%'" . (!empty($data['where']) ? " AND {$data['where']}" : "") . " ORDER BY " . PRE . $this->entity . ".{$column} LIMIT 7";
            $sql = new SqlCommand();
            $sql->exeCommand($comando);

            if ($sql->getResult())
                $this->result = $template->getShow("list-result", ["data" => $sql->getResult(), "column" => $column]);
        }
    }

    private function filter() :array
    {
        $dicionario = Metadados::getDicionario($this->parent);
        $filter = [
            "join" => "",
            "where" => ""
        ];
        foreach ($dicionario as $item) {
            if($item['column'] === $this->column && isset($item['filter']) && !empty($item['filter']) && is_array($item['filter'])) {
                $relationDicionario = Metadados::getDicionario($item['relation']);
                foreach ($item['filter'] as $f) {
                    $dados = explode(",", $f);

                    foreach ($relationDicionario as $column) {
                        if($column['column'] === $dados[0]) {
                            $relationColumnDic = $column;
                            break;
                        }
                    }

                    if (in_array($relationColumnDic['key'], ['list', 'selecao', 'extend'])) {
                        $filter = $this->filterFieldList($filter, $relationColumnDic['relation'], $relationDicionario, $relationColumnDic, $dados);

                    } elseif (in_array($relationColumnDic['key'], ['selecao_mult', 'list_mult', 'extend_mult'])) {
                        $filter = $this->filterFieldMult($filter, $relationColumnDic['relation'], $relationDicionario, $relationColumnDic, $dados);

                    } else {
                        $filter["where"] = $this->filterField(PRE . $this->entity, $filter['where'], $dados);
                    }
                }
            }
        }

        return $filter;
    }

    /**
     * @param array $filter
     * @param string $relEntity
     * @param array $relDicionario
     * @param array $relColumnDic
     * @param array $dados
     * @return string
     */
    private function filterFieldList(array $filter, string $relEntity, array $relDicionario, array $relColumnDic, array $dados)
    {
        $filter['join'] = "INNER JOIN " . PRE . $relEntity . " ON " . PRE . $this->entity . "." . $relColumnDic['column'] . " = " . PRE . $relEntity . ".id";
        $filter['where'] = $this->filterField(PRE . $relEntity, $filter['where'], $dados);

        return $filter;
    }

    /**
     * @param array $filter
     * @param string $relEntity
     * @param array $relDicionario
     * @param array $relColumnDic
     * @param array $dados
     * @return string
     */
    private function filterFieldMult(array $filter, string $relEntity, array $relDicionario, array $relColumnDic, array $dados)
    {
        $entity1 = PRE . $this->entity;
        $entityRelational = $entity1 . "_" . $relEntity . "_" . $relColumnDic['column'];
        $entity2 = PRE . $relEntity;

        $filter['join'] .= " INNER JOIN " . $entityRelational . " ON {$entity1}.id = {$entityRelational}.{$this->entity}_id";
        $filter['join'] .= " INNER JOIN " . $entity2 . " ON {$entity2}.id = {$entityRelational}.{$relEntity}_id";

        $filter['where'] = $this->filterField($entity2, $filter['where'], $dados);

        return $filter;
    }

    /**
     * @param string $entity
     * @param string $where
     * @param array $dados
     * @return string
     */
    private function filterField(string $entity, string $where, array $dados) :string
    {
        if(!empty($where))
            $where .= " AND ";

        $column = (isset($dados[3]) && !empty($dados[3]) && $dados[3] !== "null" ? $dados[3] : $dados[0]);

        if (in_array($dados[1], ["%%", "%=", "=%", "!%%", "!%=", "!=%"])) {
            $num = in_array($dados[1], ["!%%", "!%=", "!=%"]) ? 1 : 0;
            $where .= "{$entity}.{$column} " . ($num === 1 ? "NOT " : "") . "LIKE '" . ($dados[1][$num] === "%" ? "%" : "") . $dados[2] . ($dados[1][$num+1] === "%" ? "%" : "") . "'";

        } elseif (in_array($dados[1], ["in", "!in"])) {
            $dados[2] = implode(',', array_map(function ($v)
            {
                $v = strip_tags($v);
                $v = str_replace(["'", '"'], "", $v);
                return trim($v);
            }, explode(',', $dados[2])));
            $where .= ($dados[1] === "!in" ? "NOT " : "") . "FIND_IN_SET({$entity}.{$column}, '{$dados[2]}')";

        } else {

            $where .= "{$entity}.{$column} {$dados[1]} '{$dados[2]}'";
        }

        return $where;
    }
}