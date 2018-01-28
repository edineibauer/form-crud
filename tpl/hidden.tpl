<input type='hidden'
        {($value && $value !== "")? 'value="' + {$value} + '"' : ''}
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="{$form['style']}"
       id="formcrud-identificador-entity"  data-model="{$ngmodel}" id="{$column}" style="{$form['style']}" class="{$form['class']}" />