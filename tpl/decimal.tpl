<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="number" data-model="{$ngmodel}" id="{$column}" autocomplete="off"
        {($value !== false && $value === 1) ? "value='{$value}' " : "" }
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" class="{$form['class']}" />
