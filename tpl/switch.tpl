<label for="{$ngmodel}" class="row">{$nome} {($default === false) ? "*" : ""}</label>
<label class="switch">
    <input type="checkbox" data-model="{$ngmodel}" id="{$ngmodel}" data-format="switch"
            {($value !== false && $value === 1) ? "checked='checked' " : "" }
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($default === false)? 'required="required" ' : ''}
           style="{$form['style']}"  class="switchCheck {$form['class']}" />
    <div class="slider"></div>
</label>