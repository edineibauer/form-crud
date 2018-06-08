<div class="{$form['class']}" style="{$form['style']}">
    <div class="row padding-8 color-text-grey font-small">{$nome} {($default === false) ? "*" : ""}</div>
    <div class="row">
        <div class="col right" style="width:60px">
            <div class="col btn-floating {($id != "")? "color-white" : 'theme-d2'} listButton opacity hover-shadow hover-opacity-off"
                 id="list-{$column}" data-entity="{$relation}" data-fields='{$form['fields']|@json_encode}'
                 data-defaults='{$form['defaults']|@json_encode}' data-autosave="{$autosave}"
                    {($disabled)? "disabled='disabled' " : ''}
                 style="width:41px">
                <i class="material-icons prefix pointer editList">{($id != "")? "edit" : 'add'}</i>
            </div>
            <input type="hidden" data-model="{$ngmodel}" id="{$ngmodel}" data-format="list"
                    {($id != "")? "value='{$id}'" : ''} />
        </div>
        <div class="rest relative">
            <input type="text" placeholder="{$nome}" autocomplete="nope" id="{$column}"
                    {($title != "")? "value='{$title}'" : ''}
                    {($size !== false)? "maxlength='{$size}' " : ''}
                    {($disabled)? "disabled='disabled' " : ''}
                    {($default === false)? 'required="required" ' : ''}
                   data-entity="{$relation}" data-parent="{$entity}"
                   class="form-list rest"/>
            <span class="input-bar"></span>
            <div class="col s12 list-complete" rel="one"></div>
        </div>
        <div class="multFieldsSelect" id="multFieldsSelect-{$relation}-{$column}">{$mult}</div>
    </div>
</div>
<div class="clear"><br></div>