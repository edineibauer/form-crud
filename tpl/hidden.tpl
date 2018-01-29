<input type='hidden'
        {($value !== false && $value === 1) ? "value='{$value}' " : "" }
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" data-model="{$ngmodel}" style="{$form['style']}" class="{$form['class']}" />