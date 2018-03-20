<label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
<textarea data-model="{$ngmodel}" id="{$ngmodel}" data-format="textarea"
        {($size !== false)? "maxlength='{$size}' " : ''}
        {($default === false)? 'required="required" ' : ''}
       style="height: 142px; {$form['style']}"  class="{$form['class']} flow-text padding-small editorHtml hide"
          placeholder="descrição..." rows="10">{$value}</textarea>