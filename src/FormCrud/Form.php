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
use Entity\EntityInfo;
use Helpers\Template;

class Form
{
    private $entity;
    private $design;

    public function __construct($entity = null)
    {
        if ($entity) {
            $this->setEntity($entity);
        }
    }

    /**
     * @param mixed $design
     */
    public function setDesign($design)
    {
        $this->design = $design;
    }

    /**
     * @param mixed $entity
     */
    public function setEntity($entity)
    {
        $this->entity = $entity;
    }

    public function getForm($design = null)
    {
        if ($design) {
            $this->setDesign($design);
        }

        $template = new Template("form-crud");
        $template->setDesign($this->design);
        $form['inputs'] = $this->prepareInputs();
        $form['actions'] = $this->getButtons();
        $form['entity'] = $this->entity;
        $form['home'] = defined("HOME") ? HOME : "";

        return $template->getShow("form", $form);
    }

    public function showForm($design = null)
    {
        if ($design) {
            $this->setDesign($design);
        }
        echo $this->getForm();
    }

    /**
     * @return array
     */
    private function prepareInputs($extend = false, $ngmodel = null): array
    {
        $dados = array();
        $ngmodel = $ngmodel ?? "dados.";

        $entity = new Entity($this->entity);
        $template = new Template("form-crud");
        $template->setDesign($this->design);

        foreach ($entity->getJsonStructEntity() as $column => $values) {
            if ($values['edit'] && (!$extend || $values['key'] !== "primary")) {

                $values['class'] .= " " . ($extend ? "extend_formcrud" : "formcrud");
                $values['ngmodel'] = $ngmodel . $values['column'];

                if ($values['input'] === "extend") {
                    $dados[] = $this->getExtended($values['column'], $values['table'], $ngmodel);

                } else {
                    $dados[] = $template->getShow($values['input'], $values);
                }

                if ($values["key"] === "fk") {
                    $dados[] = "<input type='hidden' for='{$column}' class='autoCompleteData' value='" . $this->setAutocompleteData($values["table"]) . "' />";
                }
            }
        }

        return $dados;
    }

    private function getExtended($column, $table, $ngmodel)
    {
        $entidade = $this->entity;
        $this->setEntity($table);

        $templateExt = new Template("form-crud");
        $templateExt->setDesign($this->design);
        $form['inputs'] = $this->prepareInputs(1, $ngmodel . $column . ".");
        $form['column'] = $column;

        $this->setEntity($entidade);

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
        $entity = new EntityInfo($table);
        $entity = $entity->getJsonInfoEntity();

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

    private function getButtons()
    {
        $view = new Template("form-crud");
        $view->setDesign($this->design);
        return $view->getShow("saveButton", array("title" => "Salvar", "funcao" => "save"));
    }
}