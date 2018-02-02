<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="tel" data-model="{$ngmodel}" id="{$column}"
        {($value != "")? "value='{$value}'" : ''}
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}"  class="telefone {$form['class']}" />
