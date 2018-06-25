<div class="col relative {$form['class']}" {$form['atributos']} style="{$form['style']}">
    <label class="col">
        <span class="col">{$nome} {($default === false) ? "*" : ""}</span>
        <input type="number" step="0.01" data-model="{$ngmodel}" id="{$ngmodel}" autocomplete="nope" data-format="float"
                {($value != "") ? "value='{$value}' " : "" }
                {($size !== false)? "maxlength='{$size}' " : ''}
                {($disabled)? "disabled='disabled' " : ''}
                {($default === false)? 'required="required" ' : ''} />
        <span class="input-bar"></span>
    </label>
</div>