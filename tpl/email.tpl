<div class="input-field col s12">
    <label class='font-light'> Email {($default === false) ? "*" : ""}</label>
    <input type='email' id="{$column}" data-model="{$ngmodel}" class='{$form['class']}'
            {($value !== false && $value === 1) ? "value='{$value}' " : "" }
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($default === false)? 'required="required" ' : ''}
           style="{$form['style']}" />
</div>
