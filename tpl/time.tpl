<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="time" data-model="{$ngmodel}" id="{$ngmodel}" data-format="time"
        {($value != "")? "value='{$value}'" : ''}
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" class="ano {$form['class']}" />
