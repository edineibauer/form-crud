<div class="col relative {$form['class']} input-field col s12" style="{$form['style']}">
    <label class="col">
        <span class="col">{$nome} {($default === false) ? "*" : ""}</span>
        <input type='email' id="{$ngmodel}" data-model="{$ngmodel}" data-format="email" autocomplete="nope"
                {($value != "") ? "value='{$value}' " : "" }
                {($size !== false)? "maxlength='{$size}' " : ''}
                {($disabled)? "disabled='disabled' " : ''}
                {($default === false)? 'required="required" ' : ''} />
        <span class="input-bar"></span>
    </label>
</div>
