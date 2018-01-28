<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="text" data-model="{$ngmodel}"
        {($value && $value !== "")? 'value="' + {$value} + '"' : ''}
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="{$form['style']}"  class="telefone {$form['class']}"
       required="{$default === false}" />
