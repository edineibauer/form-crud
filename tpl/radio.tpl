<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="radio" data-model="{$ngmodel}"
        {($value && $value !== "")? 'checked="checked" ' : ''}
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="{$form['style']}"  class="{$form['class']}"
       required="{$default === false}" />
