<div class="input-field col s12">
    <label class='font-light'> Email {($default === false) ? "*" : ""}</label>
    <input type='email' id="{$column}" data-model="{$ngmodel}" class='{$form['class']}'
            {($value && $value !== "")? 'value="' + {$value} + '"' : ''}
            {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
           style="{$form['style']}" required="{$default === false}"/>
</div>
