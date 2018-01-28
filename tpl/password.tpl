<label class='font-light'>Nova Senha {($default === false) ? "*" : ""}</label>
<input type='password' id="{$column}" data-model="{$ngmodel}" autocomplete="off"
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="{$form['style']}" class='{$form['class']}' required="{$default === false}"/>
