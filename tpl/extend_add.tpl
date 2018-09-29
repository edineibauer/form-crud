<div class="{$form['class']} parent-input parent-relation" {$form['atributos']} style="{$form['style']}">
    <div class="container padding-0 padding-bottom">
        {$nome}
    </div>
    <div class="row list_mult_input radius border" style="background: rgba(200,200,200, 0.1);">
        <div class="col buttonExtenContainer right padding-4">
            <button class="btn btnRelation {($id != "")? "color-white" : 'theme-d2'} listButton right transition-ease-25 opacity hover-shadow hover-opacity-off list-{$column}"
                    data-entity="{$relation}" data-fields='{$form['fields']|@json_encode}'
                    data-defaults='{$form['defaults']|@json_encode}' data-autosave="{$autosave}"
                    {($disabled)? "disabled='disabled' " : ''}>
                <i class="material-icons prefix pointer editList transition-ease-25">{($id != "")? "edit" : 'add'}</i>
            </button>
            <input type="hidden" data-model="{$ngmodel}" id="{$ngmodel}" data-format="list"
                    {($id != "")? "value='{$id}'" : ''} />
        </div>
        <div class="rest relative padding-large">
            Nenhum Resultado Selecionado
        </div>
        <div class="tpl_div_new_mult hide" rel="single"></div>

        <div class="multFieldsSelect" id="multFieldsSelect-{$relation}-{$column}">{$mult}</div>
    </div>
</div>