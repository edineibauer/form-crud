<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="time" data-model="{$ngmodel}" id="{$column}"
        {($value && $value !== "")? 'value="' + {$value} + '"' : ''}
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="{$form['style']}" class="ano {$form['class']}"
       required="{$default === false}" />
