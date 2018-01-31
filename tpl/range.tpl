<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="range" data-model="{$ngmodel}" id="{$column}"
        {($value !== false && $value === 1) ? "value='{$value}' " : "" }
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}"  class="{$form['class']}" />
