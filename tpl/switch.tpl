<label for="{$column}" class="row">{$nome} {($default === false) ? "*" : ""}</label>
<label class="switch">
    <input type="checkbox" data-model="{$ngmodel}" id="{$column}" {($value && $value === true) ? "checked='checked' " : ""}
            {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
           style="{$form['style']}"  class="{$form['class']}" required="{$default === false}" />
    <div class="slider"></div>
</label>