<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="text" data-model="{$ngmodel}" autocomplete="off" placeholder="R$" id="{$column}"
        {($value && $value !== "")? 'value="' + {$value} + '"' : ''}
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="{$form['style']}"  class="valor {$form['class']}"
       required="{$default === false}" />
