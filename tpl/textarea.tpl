<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<textarea data-model="{$ngmodel}" id="{$column}"
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="height: 142px; {$form['style']}"  class="{$form['class']} flow-text pd-smallb font-size11"
          placeholder="descrição..." rows="10">{($value !== "")? $value : ''}</textarea>