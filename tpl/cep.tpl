<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="text" data-model="{$ngmodel}" id="{$column}"
        {($value && $value !== "")? 'value="' + {$value} + '" ' : ''}
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="{$form['style']}" class="cep {$form['class']}"
       required="{$default === false}" />
