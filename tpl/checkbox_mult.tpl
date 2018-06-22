<div class="{$form['class']} row radius border" style="background: rgba(200,200,200, 0.1);{$form['style']}">
    <label for="{$column}"
           class="col padding-medium color-text-grey font-small">{$nome} {($default === false) ? "*" : ""}</label>
    <div class="row">
        <input type="hidden" class="idsCheckboxMult" data-model="{$ngmodel}" id="{$entity}-{$column}" data-format="selecao_mult"
                {($value)? "value='{$value|json_encode}'" : ''} />
        <div class="container listmult-content">
            {if $allow['values']}
                {foreach key=key item=item from=$allow['values']}
                    <label class="col s12">
                        <input type="checkbox" value="{$item}" class="checkboxmult"
                                {($key == 0)? "id='{$ngmodel}' data-format='checkbox' " : ''}
                                {($value && $item|in_array:$value) ? "checked='checked' " : "" }
                                {($size !== false)? "maxlength='{$size}' " : ''}
                                {($disabled)? "disabled='disabled' " : ''}
                                {($default === false)? 'required="required" ' : ''} />
                        <div class="font-large padding-medium pointer">{$allow['names'][$key]}</div>
                    </label>
                {/foreach}
            {/if}
        </div>

        <div class="tpl_list_mult hide listmult-card" style="border-top: solid 2px #EEE;margin-bottom: 2px!important;"
             rel="__$0__">
            <div class="col padding-small container" style="width:30px">
                <i class="material-icons padding-8">{$icon}</i>
            </div>
            <div class="rest relative" style="padding-top:4px">
                <div class="right" style="width: 45px; height: 45px">
                    <button onclick="removerListMult('#{$entity}-{$column}', __$0__)"
                            class="btn-floating color-white color-hover-text-red hover-shadow opacity hover-opacity-off">
                        <i class="material-icons">delete</i>
                    </button>
                </div>
                <div class="left container padding-medium listmult-title">__$1__</div>
            </div>
        </div>
    </div>
</div>