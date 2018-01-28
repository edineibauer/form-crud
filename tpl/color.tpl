<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="color" data-model="{$ngmodel}"
        {($value && $value !== "")? 'value="' + {$value} + '"' : ''}
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="{$form['style']}"  class="{$form['class']}"
       required="{$default === false}" />
