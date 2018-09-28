<div class="{$form['class']} radius border" {$form['atributos']} style="background: rgba(200,200,200, 0.1);padding-left:10px!important;{$form['style']}">
    <div class="row list_mult_input">
        <div class="col buttonExtenContainer right padding-4" style="width:105px">
            <button class="btn-floating {($id != "")? "color-white" : 'theme-d2'} listButton right transition-ease-25 opacity hover-shadow hover-opacity-off list-{$column}"
                    data-entity="{$relation}" data-fields='{$form['fields']|@json_encode}'
                    data-defaults='{$form['defaults']|@json_encode}' data-autosave="{$autosave}"
                    {($disabled)? "disabled='disabled' " : ''}
                    style="width:41px">
                <i class="material-icons prefix pointer editList transition-ease-25">{($id != "")? "edit" : 'add'}</i>
            </button>
            <input type="hidden" data-model="{$ngmodel}" id="{$ngmodel}" data-format="list"
                    {($id != "")? "value='{$id}'" : ''} />
        </div>
        <div class="rest relative padding-large">
            {$nome}
        </div>
        <div class="tpl_div_new_mult hide" rel="single"></div>

        <div class="multFieldsSelect" id="multFieldsSelect-{$relation}-{$column}">{$mult}</div>
    </div>
</div>