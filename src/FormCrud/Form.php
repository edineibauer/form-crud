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
    private $children;
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

    public function setChildren()
    {
        $this->children = true;
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

    public function getFormChildren($id = null) {
        $this->setChildren();
        return $this->getForm($id);
    }

    public function showFormChildren($id = null)
    {
        echo $this->getFormChildren($id);
    }

    public function getForm($id = null)
    {
        $template = new Template("form-crud");
        $form['inputs'] = $this->prepareInputs($this->entity, "dados.", $this->readValues($id));
        $form['id'] = $id;
        $form['entity'] = $this->entity;
        $form['home'] = defined("HOME") ? HOME : "";

        return "<div class='form-control row'>"
            . $template->getShow($this->children ? "form-children" : "form", $form)
            . "</div>";
//            ."<script src='" . HOME . "vendor/conn/form-crud/assets/form.min.js' defer ></script>"
    }

    public function showForm($id = null)
    {
        echo $this->getForm($id);
    }

    private function readValues($id = null)
    {
        Entity::setError(null);
        $value = Entity::read($this->entity, $id);
        if(Entity::getError())
            $value = Entity::read($this->entity);

        return Entity::getError() ? null : $this->fixValues($value);
    }

    private function fixValues($value)
    {
        foreach (Metadados::getDicionario($this->entity) as $i => $data) {
            if ($data['format'] === "datetime" && is_string($value[$data['column']]))
                $value[$data['column']] = str_replace(' ', 'T', $value[$data['column']]);
        }

        return $value;
    }

    /**
     * @param string $entity
     * @param string $ngmodel
     * @param mixed $values
     *
     * @return array
     */
    private function prepareInputs(string $entity, string $ngmodel, $values = null): array
    {
        $dados = [];
        $values = $values ?? [];

        foreach (Metadados::getDicionario($entity, true) as $i => $data) {
            if ($data['form']) {
                $data['path'] = PATH_HOME;
                $data['home'] = HOME;
                $data['entity'] = $entity;
                $data['value'] = $values[$data['column']] ?? null;
                $data['ngmodel'] = $ngmodel . $data['column'];
                $data = $this->checkListData($data);
                $data = $this->checkListMultData($data);
                $data = $this->checkDateValue($data);
                $dados[] = $this->processaInput($data, $ngmodel, $values);
            }
        }

        return $dados;
    }

    private function checkDateValue($data)
    {
        if($data['format'] === "datetime")
            $data['value'] = str_replace(' ', 'T', $data['value']);

        return $data;
    }

    private function checkListData(array $data)
    {
        if($data['key'] === "list") {
            $dic = Metadados::getDicionario($data['relation']);
            $info = Metadados::getInfo($data['relation']);
            $data['title'] = $info['title'] && $data['value'] ? $data['value'][$dic[$info['title']]['column']] : "";
            $data['id'] = isset($data['value']['id']) ? $data['value']['id'] : "";
        }

        return $data;
    }

    private function checkListMultData(array $data)
    {
        if($data['key'] === "list_mult" || $data['key'] === "extend_mult") {
            $dic = Metadados::getDicionario($data['relation']);
            $info = Metadados::getInfo($data['relation']);
            $data['info']['title'] = $dic[$info['title']]['column'];
        }

        return $data;
    }

    /**
     * @param array $data
     * @param string $ngmodel
     * @param mixed $value
     * @return mixed
    */
    private function processaInput(array $data, string $ngmodel, $value)
    {
        $template = new Template("form-crud");

        if ($data['key'] === "extend") {
            return $this->getExtended($data['column'], $data['relation'], $ngmodel, $value);

        } else {
            $info = "";
            if(in_array($data['format'], ["title", "source"]))
                $info = "<input type='hidden' rel='{$data['format']}' value='{$data['ngmodel']}' />";

            return $info . '<div class="row"><div class="col '
            . (!empty($data['form']['cols']) ? 's' . $data['form']['cols'] : "") . ' '
            . (!empty($data['form']['colm']) ? 'm' . $data['form']['colm'] : "") . ' '
            . (!empty($data['form']['coll']) ? 'l' . $data['form']['coll'] : "") . ' '
                . 'margin-bottom">'
                . $template->getShow($data['form']['input'], $data)
                . '</div></div>';
        }
    }

    private function getExtended($column, $table, $ngmodel, $value)
    {
        $templateExt = new Template("form-crud");
        $form['inputs'] = $this->prepareInputs($table,$ngmodel . $column . ".", $value[$column] ?? []);
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