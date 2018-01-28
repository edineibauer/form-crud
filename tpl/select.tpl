<label for="{$column}">{$nome} {($default === false) ? "*" : ""}</label>
<select data-model="{$ngmodel}" id="{$column}" style="{$form['style']}" class="{$form['class']}" required="{$default === false}">
    <option value="0" {(!$value || ($value && $value !== "")) ? "selected='selected' " : ""}disabled="disabled">selecione</option>
    {foreach key=key item=item from=$allow['values']}
        <option {($value && $value === $item) ? "selected='selected' " : ""}value="{$item}">{$allow['names'][$key]}</option>
    {/foreach}
</select>
