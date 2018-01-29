<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="date" class="{$form['class']}" id="{$column}" data-model="{$ngmodel}"
        {($value !== false && $value === 1) ? "value='{$value}' " : "" }
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" />
