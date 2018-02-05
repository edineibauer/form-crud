<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<form action="request/post" enctype="multipart/form-data" id="form-{$entity}-{$column}" class="dropzone card {$form['class']}" style="{$form['style']}">
    <div class="fallback">
        <input name="file" class="hide" type="file" multiple accept="{foreach item=name key=i from=$allow['values']}{if $i > 0},{/if}.{$name}{/foreach}" />
    </div>
    <input type="hidden" name="lib" value="form-crud" />
    <input type="hidden" name="file" value="save/source" />
    <input type="hidden" name="entity" value="{$entity}" />
    <input type="hidden" name="column" value="{$column}" />
</form>
<input type="hidden" data-model="{$ngmodel}" id="{$entity}-{$column}" data-format="files"
        {*{($value != "")? "value='{$value}'" : ''}*}
        {($size !== false)? "maxlength='{$size}' " : ''} />