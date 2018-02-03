<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="file" data-model="{$ngmodel}" id="{$ngmodel}" data-format="file"
        {($default === false)? 'required="required" ' : ''}
        style="{$form['style']}"  class="{$form['class']}" />
