<?php

/**
 * Created by PhpStorm.
 * User: Edinei
 * Date: 19/05/2017
 * Time: 20:23
 */
abstract class formScript {

    private $script;
    private $table;
    private $retorno;
    private $function;
    private $ckEditor;
    private $result;
    private $titleTag;

    /**
     * @param mixed $table
     */
    public function setTable($table) {
        $this->table = $table;
        $this->setFunction();
    }

    /**
     * @param mixed $titleTag
     */
    public function setTitleTag($titleTag) {
        $this->titleTag = $titleTag;
    }

    /**
     * @param mixed $retorno
     */
    public function setRetorno($retorno) {
        $this->retorno = $retorno;
    }

    /**
     * @param mixed $ckEditor
     */
    private function setCkEditor($ckEditor) {
        $this->ckEditor[] = 'CKEDITOR.replace(\'' . $ckEditor . '\', {customConfig: \'\'});';
    }

    /**
     * @return mixed
     */
    protected function getScript() {
        return $this->script;
    }

    /**
     * @return mixed
     */
    protected function getFunction() {
        return $this->function;
    }

    /**
     * @return mixed
     */
    protected function getRetorno() {
        return $this->retorno;
    }

    /**
     * @return mixed
     */
    protected function getTable() {
        return $this->table;
    }

    /**
     * @return mixed
     */
    protected function getResult() {
        $this->start();
        return $this->result;
    }

    protected function setJsSave($coluna, $dado) {
        $script = ($dado['tipo'] === 'text' && $dado['tamanho'] > 255 ? $this->setCkEditor($dado['id']) . "'" . $this->encode($coluna) . "': CKEDITOR.instances.{$dado['id']}.getData()" : "'" . $this->encode($coluna) . "': $('#{$dado['id']}').val()");
        $this->setScript(1, $this->table, $script);
    }

    protected function setScript($order, $table, $script, $acao = 'normal') {
        $this->script[$order][$table] = (isset($this->script[$order][$table]) ? $this->script[$order][$table] . ", " : "'acao': '{$acao}', ") . $script;
    }

    private function setFunction() {
        $this->function = "save" . md5($this->table) . rand(0, 9999999);
    }

    private function start() {
        ob_start();
        $this->checkCkEditor();

        echo "<script>" . $this->scriptsPersonalizadosInicio() .$this->applySaveFunctionValues() . "</script>";

        echo '<script src="' . HOME . '/_app/formCrud/controller/form.js"></script>';
        echo "<script>" . $this->scriptsPersonalizadosFinal() . "</script>";
        $this->result = ob_get_contents();
        ob_end_clean();
    }


    private function scriptsPersonalizadosInicio() {
        return "function workError(error){
                infor(\"<b style='padding:2px 10px 6px 11px;transform: rotate(90deg);' class='fl-left bg-terceary radius-circle'>:(</b> &nbsp;&nbsp;<b style='color:red'>Erros</b> Encontrados\");
                $('.tagError').remove();
                $.each(error, function( id, info ) {
                    if(id === 'infor') {
                        infor(info);
                    }else {
                        $('#' + id).after(\"<div class='container pd-small font-size09 transition-easy tagError' style='color:red'>\" + info + \"</div>\");
                    }
                });
        }";
    }

    private function scriptsPersonalizadosFinal() {
        return "var vTitle = $('#workspace_' + sessionStorage.space).find('section').last().find(\"input[rel = 'title']\"); vTitle.focus(); if(vTitle.val() == '' && '' != '{$this->titleTag}') { vTitle.val('{$this->titleTag}');} else { vTitle.val(vTitle.val()); }
            $('input').keyup(function(e){
                if(e.which === 13){
                    $(this).parent().siblings('.btnSavePost').click()
                }
            });";

    }

    private function applySaveFunctionValues() {
        ksort($this->script);
        return  "function " . $this->function . "(){" . $this->setSaveFunction(1) . "}";
    }

    private function setSaveFunction($order) {
        $result = "";
        if (isset($this->script[$order])):
            foreach ($this->script[$order] as $table => $campos):
                $result .= "$.post('" . HOME . "/_app/formCrud/controller/saveForm.php', {t: '{$this->encode(str_replace(PRE, "", $table))}', {$campos}}";

                if ($order < 3):
                    $result .= ", function(g){
                        var result = jQuery.parseJSON(g);
                        if(result['success']) {";

                    if ($order === 1):
                        $result .= "infor(\"<div style='color:green'><i class='shoticon shoticon-certo'></i> &nbsp;&nbsp;salvo</div>\");"
                        . "var id = (result['id'] < 0 ? result['id'] * -1 : result['id']); $('.tagError').remove();";

                        $result .= $this->setSaveFunction(2);
                        $result .= $this->setSaveFunction(3);

                        if ($this->retorno):
                            $result .= "$.post('../_app/formCrud/controller/getTitleTagTable.php', {banco: '{$table}', id: id, idValue: '{$this->retorno}', column: sessionStorage.getItem('editing-column-{$table}')}, 
                                    function (r) {
                                        selectOneToOne('{$this->table}', '{$this->retorno}', (r ? r : ''), id);
                                    });";
                        else:
                            $result .= "getPage('{$table}', id);";
                        endif;

                    endif;

                    $result .= "} else {
                            workError(result['error']);
                        }
                    }";
                endif;

                $result .= ");";
            endforeach;
        endif;

        return $result;
    }

    private function checkCkEditor() {
        if ($this->ckEditor):
            echo '<script src="' . HOME . '/_app/Library/ckeditor/ckeditor.js"></script>' . "<script>" . implode(' ', $this->ckEditor) . "CKEDITOR.config.contentsCss = '../css/styleP.css'; CKEDITOR.config.allowedContent = true;" . "</script>" . "<style>" . '#cke_editor{float:left; width:100%}.cke_button__underline, .cke_button__strike, .cke_button__horizontalrule, .cke_button__blockquote, .cke_button__removeformat, .cke_button__unlink, .cke_toolbar_break, .cke_button__xdsoft_translater_reverse, .cke_button__xdsoft_translater_settings, .cke_button__specialchar, .cke_button__superscript, .cke_button__subscript, .cke_button__image, .cke_button__anchor, .cke_button__table { display: none !important;}.cke_top {background: #F5F5F5; border-bottom: solid 1px #CCC; padding: 5px 5px 2px;}' . "</style>";
        endif;
    }

    private function encode($s) {
        return $s;
        //        return str_replace(array("===", "==", "="), array(md5("==="), md5("=="), md5("=")), base64_encode($s));
    }
}