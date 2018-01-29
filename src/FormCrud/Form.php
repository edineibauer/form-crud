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
        $this->value = Entity::read($this->entity, $id);
    }

    public function getForm($design = null)
    {
        if(!$this->value)
            $this->value = Entity::read($this->entity);
        $this->fixValues();

        if ($design)
            $this->setDesign($design);

        $template = new Template("form-crud");
        $form['inputs'] = $this->prepareInputs();
        $form['id'] = $this->id;
        $form['entity'] = $this->entity;
        $form['home'] = defined("HOME") ? HOME : "";

        return $template->getShow("form", $form);
    }

    public function showForm($design = null)
    {
        if ($design)
            $this->setDesign($design);

        echo $this->getForm();
    }

    private function fixValues()
    {
        foreach ($this->value as $column => $value) {
            if(is_string($value) && preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/i',$value))
                $this->value[$column] = str_replace(' ', 'T', $value);
        }
    }

    /**
     * @return array
     */
    private function prepareInputs($ngmodel = null): array
    {
        $dados = array();
        $ngmodel = $ngmodel ?? "dados.";

        $template = new Template("form-crud");

        foreach (Metadados::getDicionario($this->entity) as $i => $data) {
            if ($data['form']) {

                $data['value'] = $this->value[$data['column']] ?? null;
                $data['ngmodel'] = $ngmodel . $data['column'];

                if ($data['key'] === "extend") {
                    $dados[] = $this->getExtended($data['column'], $data['relation'], $ngmodel);

                } else {
                    $dados[] = '<div class="col ' . $data['form']['cols'] . ' ' . $data['form']['colm'] . ' ' . $data['form']['coll'] . '">'
                        . $template->getShow($data['form']['input'], $data)
                        .'</div>';
                }
            }
        }

        return $dados;
    }

    private function getList($column, $table, $ngmodel)
    {

    }

    private function getExtended($column, $table, $ngmodel)
    {
        $entidade = $this->entity;
        $this->entity = $table;

        $templateExt = new Template("form-crud");
        $form['inputs'] = $this->prepareInputs($ngmodel . $column . ".");
        $form['column'] = $column;

        $this->entity = $entidade;

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