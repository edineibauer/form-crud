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
use Entity\Metadados;
use Helpers\Template;

class Form
{
    private $entity;
    private $id;
    private $design = "input";

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
        if (is_string($entity)) {
            $this->entity = new Entity($entity);
        } elseif (is_object($entity) && is_a($entity, "Entity\Entity")) {
            $this->entity = $entity;
        }
    }

    /**
     * @param array $data
     */
    public function setData(array $data)
    {
        if ($this->entity) {
            $this->entity->setData($data);
        }
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
        $this->entity->load($id);
    }

    public function getForm($design = null)
    {
        if ($design) {
            $this->setDesign($design);
        }

        $template = new Template("form-crud");
        $template->setDesign($this->design);
        $form['inputs'] = $this->prepareInputs();
        $form['id'] = $this->id;
        $form['entity'] = $this->entity->getEntity();
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
    private function prepareInputs($ngmodel = null): array
    {
        $dados = array();
        $ngmodel = $ngmodel ?? "dados.";

        $template = new Template("form-crud");
        $template->setDesign($this->design);

        foreach ($this->entity->getMetadados()['struct'] as $column => $values) {
            if ($values['edit']) {

                $values['column'] = $ngmodel . $values['column'];
                $values['value'] = "";

                if ($values['input'] === "extend") {
                    $dados[] = $this->getExtended($column, $values['table'], $ngmodel);

                } else {
                    if (!empty($this->entity->get($column))) {
                        if ($values['input'] === "list") {
                            $entidadeList = $this->entity->get($column);
                            $values['value'] = $entidadeList->get($entidadeList->getMetadados()['info']['title']);

                        } else if ($values['input'] === "list_mult") {
                            foreach ($this->entity->get($column) as $entidadeListMmult) {
                                $values['value'][] = $entidadeListMmult->get($entidadeListMmult->getMetadados()['info']['title']);
                            }
                        } else {
                            $values['value'] = $this->entity->get($column);
                        }
                    } else {
                        $values['value'] = '';
                    }
                    $dados[] = $template->getShow($values['input'], $values);
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
        if (!empty($this->entity->get($column)) && is_a($this->entity->get($column), "Entity\Entity")) {
            $this->entity = $this->entity->get($column);
        } else {
            $this->setEntity($table);
        }

        $templateExt = new Template("form-crud");
        $templateExt->setDesign($this->design);
        $form['inputs'] = $this->prepareInputs($ngmodel . $column . ".");
        $form['entity'] = $column;

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