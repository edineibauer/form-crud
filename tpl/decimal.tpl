<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="number" data-model="{$ngmodel}" id="{$column}" autocomplete="off"
        {($value != "") ? "value='{$value}' " : "" }
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" class="{$form['class']}" />
