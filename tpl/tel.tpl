<div class="{$form['class']}" style="{$form['style']}">
    <label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
    <input type="tel" data-model="{$ngmodel}" id="{$ngmodel}" data-format="tel"
            {($value != "")? "value='{$value}'" : ''}
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($default === false)? 'required="required" ' : ''}
           class="telefone"/>
</div>