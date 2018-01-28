<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<input type="file" data-model="{$ngmodel}"
       style="{$form['style']}"  class="{$form['class']}"
       required="{$default === false}" />
