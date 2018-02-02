<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="text" data-model="{$ngmodel}" id="{$column}" autocomplete="off"
        {($value != "") ? "value='{$value}' " : "" }
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" class="cnpj {$form['class']}" />
