<div class="{$form['class']}" style="{$form['style']}">
    <label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
    <input type="text" data-model="{$ngmodel}" autocomplete="off" placeholder="R$" id="{$ngmodel}" data-format="valor"
        {($value != "")? "value='{$value}'" : ''}
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''} />
</div>