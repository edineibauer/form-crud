<div class="{$form['class']}" style="{$form['style']}">
    <label class='font-light' for="{$ngmodel}">Nova Senha {($default === false) ? "*" : ""}</label>
    <input type='password' id="{$ngmodel}" data-model="{$ngmodel}" autocomplete="off" data-format="password"
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($default === false)? 'required="required" ' : ''} disabled="disabled" />
</div>
