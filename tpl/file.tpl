<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="file" data-model="{$ngmodel}" id="{$column}"
        {($default === false)? 'required="required" ' : ''}
        style="{$form['style']}"  class="{$form['class']}" />
