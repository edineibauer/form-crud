<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<textarea data-model="{$ngmodel}"
        {($value && $value !== "")? 'value="' + {$value} + '"' : ''}
        {($size !== false)? 'maxlength="' + {$size} + '" ' : ''}
       style="height: 142px; {$form['style']}"  class="{$form['class']} flow-text pd-smallb font-size11"
       required="{$default === false}" placeholder="descrição..." rows="10"></textarea>