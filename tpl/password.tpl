<label class='font-light'>Nova Senha {($default === false) ? "*" : ""}</label>
<input type='password' id="{$column}" data-model="{$ngmodel}" autocomplete="off"
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="{$form['style']}" class='{$form['class']}'/>
