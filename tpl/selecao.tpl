<div class="{$form['class']} radius border" {$form['atributos']} style="background: rgba(200,200,200, 0.1);{$form['style']}">
    <label for="{$column}" class="col padding-medium color-text-grey font-small">{$nome} {($default === false) ? "*" : ""}</label>
    <div class="row">
        <div class="hide buttonExtenContainer">
            <input type="hidden" data-model="{$ngmodel}" id="{$ngmodel}" data-format="list"
                    {($id != "")? "value='{$id}'" : ''} />
        </div>
        <div class="col s12 container relative">
            <input type="text" placeholder="selecione um valor" autocomplete="nope" id="{$column}"
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