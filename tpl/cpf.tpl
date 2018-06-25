<div class="col relative {$form['class']}" {$form['atributos']} style="{$form['style']}">
    <label class="col">
        <span class="col">{$nome} {($default === false) ? "*" : ""}</span>
        <input type="text" data-model="{$ngmodel}" id="{$ngmodel}" autocomplete="off" data-format="cpf"
                {($value != "") ? "value='{$value}' " : "" }
                {($size !== false)? "maxlength='{$size}' " : ''}
                {($disabled)? "disabled='disabled' " : ''}
                {($default === false)? 'required="required" ' : ''}
               class="cpf"/>
        <span class="input-bar"></span>
    </label>
</div>