<div class="col relative {$form['class']}" style="{$form['style']}">
    <label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
    <input type="text" data-model="{$ngmodel}" autocomplete="nope" class="valor" placeholder="R$" id="{$ngmodel}" data-format="valor"
            {($value != "")? "value='{$value}'" : ''}
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($disabled)? "disabled='disabled' " : ''}
            {($default === false)? 'required="required" ' : ''} />
    <span class="input-bar"></span>
</div>