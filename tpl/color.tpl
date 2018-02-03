<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="color" data-model="{$ngmodel}" id="{$ngmodel}" data-format="color"
        {($value != "") ? "value='{$value}' " : "" }
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}"  class="{$form['class']}" />
