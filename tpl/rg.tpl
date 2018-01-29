<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="text" data-model="{$ngmodel}" id="{$column}" autocomplete="off"
        {($value !== false && $value === 1) ? "value='{$value}' " : "" }
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}"  class="rg {$form['class']}" />
