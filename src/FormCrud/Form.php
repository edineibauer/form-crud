<?php

/**
 * FromCrud (Class)
 *
 * Esta classe tem como objetivo linkar uma entidade a um conjunto de templates para disponibilizar um
 * formulário para operações de edição e criação de uma entidade existente ou nova.
 *
 * Localização das templates, por padrão na pasta "tpl"
 *
 * Os templates são selecionado com base no atributo "input" dos campos de uma entidade.
 *
 * Os Template selecionados devem conter a extensão "tpl" para funcionamento com a biblioteca Smarty
 *      tpl (folder default) ->
 *          input.tpl
 *
 * Templates podem recebem uma personalização "tpl_personalizado" (folder), sendo assim
 * necessário evidenciar a personalização ao instanciar a classe:
 *      $form = new Form('personalizado');
 *
 * ou então setando o design desejado logo após instanciar:
 *      $form = new Form();
 *      $form->setDesign('personalizado');
 *
 * Requer as dependências:
 * Conn-Crud -> para manipulação do Banco
 * Entity -> para controle da entidade
 * Smarty -> motor de template
 */

namespace FormCrud;

use ConnCrud\Read;
use Entity\Entity;
use EntityForm\Metadados;
use Helpers\Template;

class Form
{
    private $entity;
    private $value;
    private $id;
    private $design = "input";

    /**
     *
     * @param string $entity
     */
    public function __construct(string $entity = null)
    {
        if ($entity)
            $this->setEntity($entity);
    }

    /**
     * @param string $entity
     */
    public function setEntity(string $entity)
    {
        $this->entity = $entity;
    }

    /**
     * @param mixed $design
     */
    public function setDesign($design)
    {
        $this->design = $design;
    }

    /**
     * @param array $data
     */
    public function setData(array $data)
    {
        //        if ($this->entity)
        //            $this->entity->setData($data);
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
        $this->readValues($id);
    }

    public function getForm($id = null)
    {
        if($id)
            $this->setId($id);
        elseif (!$this->value)
            $this->readValues();

        $template = new Template("form-crud");
        $form['inputs'] = $this->prepareInputs($this->entity, "dados.", $this->value);
        $form['id'] = $this->id;
        $form['entity'] = $this->entity;
        $form['home'] = defined("HOME") ? HOME : "";

        return $template->getShow("form", $form);
    }

    public function showForm($id = null)
    {
        echo $this->getForm($id);
    }

    private function readValues($id = null)
    {
        $this->value = Entity::read($this->entity, $id);
        if(Entity::getError())
            $this->value = Entity::read($this->entity);
        $this->fixValues();
    }

    private function fixValues()
    {
        foreach (Metadados::getDicionario($this->entity) as $i => $data) {
            if ($data['format'] === "datetime" && is_string($this->value[$data['column']])) {
                $this->value[$data['column']] = str_replace(' ', 'T', $this->value[$data['column']]);
            } elseif ($data['type'] === "json") {
                if(is_string($this->value[$data['column']]))
                    $this->value[$data['column']] = json_decode($this->value[$data['column']], true);
                elseif(!is_array($this->value[$data['column']]))
                    $this->value[$data['column']] = [];
            }
        }
    }

    /**
     * @param string $entity
     * @param string $ngmodel
     * @param array $values
     *
     * @return array
     */
    private function prepareInputs(string $entity, string $ngmodel, array $values): array
    {
        $dados = array();

        foreach (Metadados::getDicionario($entity, true) as $i => $data) {
            if ($data['form']) {
                $data['value'] = $values[$data['column']] ?? null;
                $data['ngmodel'] = $ngmodel . $data['column'];
                $dados[] = $this->processaInput($data, $ngmodel);
            }
        }

        return $dados;
    }

    private function processaInput($data, $ngmodel)
    {
        $template = new Template("form-crud");
        if ($data['key'] === "extend") {
            return $this->getExtended($data['column'], $data['relation'], $ngmodel);

        } else {
            return '<div class="col ' . $data['form']['cols'] . ' ' . $data['form']['colm'] . ' ' . $data['form']['coll'] . ' margin-bottom">'
                . $template->getShow($data['form']['input'], $data)
                . '</div>';
        }
    }

    private function getList($column, $table, $ngmodel)
    {

    }

    private function getExtended($column, $table, $ngmodel)
    {
        $templateExt = new Template("form-crud");
        $form['inputs'] = $this->prepareInputs($table,$ngmodel . $column . ".", $this->value[$column]);
        $form['column'] = $column;

        return $templateExt->getShow("extend", $form);
    }

    private function setAutocompleteData($table)
    {
        $results = $this->getDataBaseResultsFrom($table);
        if ($results) {
            $data = array();
            foreach ($results as $result) {
                $data[$result['title']] = (isset($result['image']) ? "'{$result['image']}'" : null);
            }
            return json_encode($data);
        }

        return "";
    }

    private function getDataBaseResultsFrom($table)
    {
        $entity = Metadados::getInfo($table);

        if (!empty($entity['title'])) {
            $table = (defined('PRE') && !preg_match('/^' . PRE . '/i', $table) ? PRE : "") . $table;

            $read = new Read();
            $read->setSelect(!empty($entity['image']) ? array($entity['title'], $entity['image']) : $entity['title']);
            $read->exeRead($table);
            if ($read->getResult()) {
                return $read->getResult();
            }
        }
    }
}