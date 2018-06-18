<div class="col relative {$form['class']}" style="{$form['style']}">
    <label class='font-light' for="{$ngmodel}">Nova Senha {($default === false) ? "*" : ""}</label>
    <input type='password' id="{$ngmodel}" data-model="{$ngmodel}" data-format="password"
            {($value != "")? "value='{$value}'" : ''}
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($disabled)? "disabled='disabled' " : ''}
            {($default === false)? 'required="required" ' : ''} autocomplete="new-password" />
    <span class="input-bar"></span>
</div>
