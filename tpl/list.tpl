<div class="{$form['class']} parent-input parent-relation radius border" {$form['atributos']} style="background: rgba(200,200,200, 0.1);padding-left:10px!important;{$form['style']}">
    <label for="{$column}" class="row padding-8 color-text-grey font-small">
        {$nome} {($default === false) ? "*" : ""}
    </label>
    <div class="row list_mult_input">
        <div class="col buttonExtenContainer right padding-4">
            <button class="btn btnRelation theme-d2 opacity hover-opacity-off hover-shadow extendButton right list-{$column}"
                    data-entity="{$relation}" data-fields='{$form['fields']|@json_encode}'
                    data-defaults='{$form['defaults']|@json_encode}' data-autosave="{$autosave}"
                    {($disabled)? "disabled='disabled' " : ''}>
                <i class="material-icons prefix pointer editList transition-ease-25">{($id != "")? "edit" : 'add'}</i>
            </button>
            <input type="hidden" data-model="{$ngmodel}" id="{$ngmodel}" data-format="list"
                    {($id != "")? "value='{$id}'" : ''} />
        </div>
        <div class="rest relative">
            <input type="text" placeholder="pesquise..." autocomplete="off" id="{$column}"
                    {($title != "")? "value='{$title}'" : ''}
                    {($size !== false)? "maxlength='{$size}' " : ''}
                    {($disabled)? "disabled='disabled' " : ''}
                    {($default === false)? 'required="required" ' : ''}
                   data-entity="{$relation}" data-parent="{$entity}"
                   class="form-list rest"/>
            <div class="col s12 list-complete" rel="one"></div>
        </div>
        <div class="tpl_div_new_mult hide" rel="single"></div>

        <div class="multFieldsSelect" id="multFieldsSelect-{$relation}-{$column}">{$mult}</div>
    </div>
</div>