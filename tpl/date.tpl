<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="date" class="{$form['class']}" id="{$ngmodel}" data-model="{$ngmodel}" data-format="date"
        {($value != "") ? "value='{$value}' " : "" }
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" />
