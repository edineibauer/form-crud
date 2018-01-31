<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="date" class="{$form['class']}" id="{$column}" data-model="{$ngmodel}"
        {($value !== "") ? "value='{$value}' " : "" }
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" />
