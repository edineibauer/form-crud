<div class="{$form['class']}" style="{$form['style']}">
    <label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
    <input type="datetime-local" id="{$ngmodel}" data-model="{$ngmodel}" data-format="datetime"
            {($value != "") ? "value='{$value}' " : "" }
            {($default === false)? 'required="required" ' : ''} />
</div>
