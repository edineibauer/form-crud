<div class="col s12"><br></div>
<div>{$nome} {($default === false) ? "*" : ""}</div>
{foreach key=key item=item from=$allow['values']}
    <label class="md-radio col s12" data-model="{$ngmodel}" style="{$form['style']}"  class="{$form['class']}">
        <input type="radio" name="{$column}" {($item === $value) ? "checked='checked' " : "" }>
        <span class="md-radio--fake">
        <span></span>
    </span>
        <div class="col s10">
            {$allow['names'][$key]}
        </div>
    </label>
{/foreach}