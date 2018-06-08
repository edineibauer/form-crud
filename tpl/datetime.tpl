<div class="col relative {$form['class']}" style="{$form['style']}">
    <label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
    <input type="datetime-local" id="{$ngmodel}" data-model="{$ngmodel}" data-format="datetime"
            {($value != "") ? "value='{$value}' " : "" }
            {($disabled)? "disabled='disabled' " : ''}
            {($default === false)? 'required="required" ' : ''} />
    <span class="input-bar"></span>
</div>
