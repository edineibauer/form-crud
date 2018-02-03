<div class="input-field col s12">
    <label class='font-light' for="{$ngmodel}"> Email {($default === false) ? "*" : ""}</label>
    <input type='email' id="{$ngmodel}" data-model="{$ngmodel}" class='{$form['class']}' data-format="email"
            {($value != "") ? "value='{$value}' " : "" }
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($default === false)? 'required="required" ' : ''}
           style="{$form['style']}" />
</div>
