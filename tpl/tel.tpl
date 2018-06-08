<div class="col relative {$form['class']}" style="{$form['style']}">
    <label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
    <input type="tel" data-model="{$ngmodel}" id="{$ngmodel}" data-format="tel" autocomplete="off"
            {($value != "")? "value='{$value}'" : ''}
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($disabled)? "disabled='disabled' " : ''}
            {($default === false)? 'required="required" ' : ''}
           class="telefone"/>
    <span class="input-bar"></span>
</div>