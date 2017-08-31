<?php

namespace FormCrud;

use ConnCrud\Read;
use Entity\Entity;
use Entity\EntityInfo;

class Form
{
    private $entity;
    private $design;
    private $js;
    private $css;
    private $form;

    public function __construct($entity = null)
    {
        $this->css = "";
        $this->js = "";
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
        $this->preSetCssJsDesign();
    }

    /**
     * @param mixed $entity
     */
    public function setEntity($entity)
    {
        $this->entity = $entity;
        $this->form = "<form action='" . HOME . "formCrud' name='form-{$this->entity}' id='form-{$this->entity}' method='post'";
    }

    public function getForm()
    {
        $inputs = $this->prepareInputs();
        $inputs .= $this->getButtons();

        return $this->form . ">" . $inputs . "</form>" . $this->getCss() . $this->getJs();
    }

    public function showForm()
    {
        echo $this->getForm();
    }

    private function prepareInputs()
    {
        $dados = "";

        $template = new TemplateEngine();
        $entity = new Entity($this->entity);
        foreach ($entity->getJsonStructEntity() as $column => $values) {
            if (!isset($values['edit']) || $values['edit']) {
                $dados .= $template->getShow($values['input'], $values);
                if($values["key"] === "fk") {
                    $this->setJsAutoComplete($values["table"], $values["column"]);
                }
            }
        }

        return $dados;
    }

    private function setJsAutoComplete($table, $column)
    {
        $results = $this->getResultsFrom($table);
        if($results) {
            $resultJs = "";
            foreach ($results as $result) {
                $resultJs .= (!empty($resultJs) ? ", " : "") . "'{$result['title']}': " . (isset($result['image']) ? "'{$result['image']}'" : "null");
            }

            $this->js .= "
                $('#{$column}').autocomplete({
                data: {{$resultJs}},
                limit: 20,
                onAutocomplete: function(val) {
                  // Callback function when value is autcompleted.
                },
                minLength: 1
              });";
        }
    }

    private function getResultsFrom($table)
    {
        $entity = new EntityInfo($table);
        $entity = $entity->getJsonInfoEntity();

        if(!empty($entity['title'])) {
            $table = (defined('PRE') && !preg_match('/^' . PRE . '/i', $table) ? PRE : "") . $table;

            $read = new Read();
            $read->setSelect(!empty($entity['image']) ? array($entity['title'], $entity['image']) : $entity['title']);
            $read->exeRead($table);
            if ($read->getResult()) {
                return $read->getResult();
            }
        }
    }

    private function preSetCssJsDesign()
    {
        if($this->design === "materialize") {
            $this->setForm("class='row' ");
            $this->setCss(".autocomplete-content{position: absolute}");
            $this->setJs("$('select').material_select();");
            $this->setJs("$('.datepicker').pickadate({
                monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
                weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                today: 'Hoje',
                clear: 'Limpar',
                close: 'Pronto',
                labelMonthNext: 'Próximo mês',
                labelMonthPrev: 'Mês anterior',
                labelMonthSelect: 'Selecione um mês',
                labelYearSelect: 'Selecione um ano',
                format: 'dd/mm/yyyy',
                selectMonths: true,
                selectYears: 15
          });");
        }
    }

    private function setForm($form)
    {
        $this->form .= $form;
    }

    /**
     * @param mixed $css
     */
    private function setCss($css)
    {
        $this->css .= $css;
    }

    /**
     * @param string $js
     */
    private function setJs(string $js)
    {
        $this->js .= $js;
    }

    /**
     * @return string
     */
    private function getCss()
    {
        return "<style>{$this->css}</style>";
    }

    /**
     * @return string
     */
    private function getJs()
    {
        return "<script>$(function (){{$this->js}});</script>";
    }

    private function getButtons()
    {
        $view = new TemplateEngine();
        return $view->getShow("saveButton", array("title" => "Salvar", "funcao" => "save"));
    }
}