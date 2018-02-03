<div class="col s12"><br></div>
<div>{$nome} {($default === false) ? "*" : ""}</div>
{foreach key=key item=item from=$allow['values']}
    <label class="col s12">
        <input type="checkbox" data-model="{$ngmodel}" value="{$item}"
                {($key === 0)? "id='{$ngmodel}' data-format='checkbox' " : ''}
                {($value && $item|in_array:$value) ? "checked='checked' " : "" }
                {($size !== false)? "maxlength='{$size}' " : ''}
                {($default === false)? 'required="required" ' : ''}
               style="{$form['style']}" class="{$form['class']}"/>
        <div class="font-size13 padding-medium pointer">{$allow['names'][$key]}</div>
    </label>
{/foreach}
