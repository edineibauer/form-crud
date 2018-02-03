<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="datetime-local" class="{$form['class']}" id="{$ngmodel}" data-model="{$ngmodel}" data-format="datetime"
        {($value != "") ? "value='{$value}' " : "" }
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" />
