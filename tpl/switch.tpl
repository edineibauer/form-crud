<div class="{$form['class']}" {$form['atributos']} style="{$form['style']}">
    <label class="col">
        <span class="col">{$nome} {($default === false) ? "*" : ""}</span>
        <div class="switch">
            <input type="checkbox" data-model="{$ngmodel}" id="{$ngmodel}" data-format="switch"
                    {($value !== false && $value == 1) ? "checked='checked' " : "" }
                    {($size !== false)? "maxlength='{$size}' " : ''}
                    {($disabled)? "disabled='disabled' " : ''}
                    {($default === false)? 'required="required" ' : ''}
                   class="switchCheck"/>
            <div class="slider"></div>
        </div>
    </label>
</div>