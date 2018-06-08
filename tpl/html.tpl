<div class="col relative {$form['class']}" style="{$form['style']}">
    <label for="{$ngmodel}">{$nome} {($default === false) ? "*" : ""}</label>
    <textarea data-model="{$ngmodel}" id="{$ngmodel}" data-format="textarea"
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($default === false)? 'required="required" ' : ''}
            {($disabled)? "disabled='disabled' " : ''}
              style="height: 142px;" class="flow-text padding-small editorHtml hide"
              placeholder="descrição..." rows="10">{$value}</textarea>
    <span class="input-bar"></span>
</div>