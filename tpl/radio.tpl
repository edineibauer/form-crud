<div class="col s12"><br></div>
<div class="radio-title">{$nome} {($default === false) ? "*" : ""}</div>
{foreach key=key item=item from=$allow['values']}
    <label class="md-radio left" style="{$form['style']}" class="{$form['class']}">
        <input type="radio" name="{$column}" data-model="{$ngmodel}" value="{$item}"
                {($item === $value) ? "checked='checked' " : "" } />
        <span class="md-radio--fake">
            <span></span>
        </span>
        <div class="left">
            {$allow['names'][$key]}
        </div>
    </label>
{/foreach}