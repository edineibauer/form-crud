<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<form action="request/post" enctype="multipart/form-data" class="dropzone {$form['class']}" style="{$form['style']}">
    <div class="fallback">
        <input name="file" type="file" multiple />
    </div>
    <input type="hidden" name="lib" value="form-crud" />
    <input type="hidden" name="file" value="save/source" />
    <input type="hidden" name="entity" value="{$entity}" />
    <input type="hidden" name="column" value="{$column}" />
</form>
<input type="hidden" data-model="{$ngmodel}" id="{$entity}-{$column}" data-format="file"
        {($value != "")? "value='{$value}'" : ''}
        {($size !== false)? "maxlength='{$size}' " : ''} />