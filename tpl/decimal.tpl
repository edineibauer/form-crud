<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="number" data-model="{$ngmodel}" id="{$ngmodel}" autocomplete="off" data-format="decimal"
        {($value != "") ? "value='{$value}' " : "" }
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" class="{$form['class']}" />
