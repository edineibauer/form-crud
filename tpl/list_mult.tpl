<div class="{$form['class']} col radius border" {$form['atributos']} style="background: rgba(200,200,200, 0.1);{$form['style']}">
    <label for="{$column}" class="col padding-medium color-text-grey font-small">{$nome} {($default === false) ? "*" : ""}</label>
    <div class="row list_mult_input">
        <div class="col buttonExtenContainer right" style="width: 117px;padding-right: 12px;">
            <button class="btn-floating theme-d2 opacity hover-opacity-off hover-shadow extendButton right list-{$relation}"
                    data-entity="{$relation}" data-fields='{$form['fields']|@json_encode}'
                    data-defaults='{$form['defaults']|@json_encode}' data-autosave="{$autosave}"
                    {($disabled)? "disabled='disabled' " : ''}
                    style="width:41px">
                <i class="material-icons prefix pointer editList">add</i>
            </button>
            <input type="hidden" data-model="{$ngmodel}" id="{$entity}-{$column}" data-format="list_mult"
                    {($value)? "value='[{foreach item=id key=i from=$value}{if $i > 1},{/if}{$id.id}{/foreach}]'" : ''} />
        </div>
        <div class="rest container relative">
            <input type="text" placeholder="{$nome}" autocomplete="nope" id="{$column}"
                    {($size !== false)? "maxlength='{$size}' " : ''}
                    {($default === false)? 'required="required" ' : ''}
                    {($disabled)? "disabled='disabled' " : ''}
                   data-entity="{$relation}" data-parent="{$entity}"
                   class="form-list rest"/>
            <div class="col s12 list-complete" rel="mult"></div>
        </div>
        <div class="tpl_div_new_mult hide" rel="mult"></div>

        <div class="container listmult-content">
            {if $value}
                {foreach item=data key=i from=$value}
                    <div class="listmult-card" style="{if $i>1}border-top: solid 1px #DDD;{/if}margin-bottom: 2px!important;" rel="{$data.id}">
                        <div class="col padding-small container" style="width:30px">
                            <i class="material-icons padding-8">{$icon}</i>
                        </div>
                        <div class="rest relative" style="padding-top:4px">
                            <div class="right" style="width: 94px; height: 45px">
                                <button id="{$entity}-{$column}-btn"
                                        onclick="editListMult('{$relation}', '#{$entity}-{$column}', {$data.id})"
                                        class="btn-floating hover-shadow color-white opacity hover-opacity-off editListMult">
                                    <i class="material-icons transition-ease-25">edit</i>
                                </button>
                                <button onclick="removerListMult('#{$entity}-{$column}', {$data.id})"
                                        class="btn-floating color-hover-text-red hover-shadow color-white opacity hover-opacity-off margin-0 removerListMult">
                                    <i class="material-icons transition-ease-25">delete</i>
                                </button>
                            </div>
                            <div class="left container padding-8 font-light listmult-title">
                                {foreach key=k item=it from=$data.valores}
                                    <small class="color-text-grey">{$k}:</small> {$it}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/foreach}
                            </div>
                        </div>
                    </div>
                {/foreach}
            {/if}
        </div>

        <div class="tpl_list_mult hide listmult-card transition-easy" style="border-top: solid 1px #DDD;margin-bottom: 2px!important;" rel="__$0__">
            <div class="col padding-small container" style="width:30px">
                <i class="material-icons padding-8">{$icon}</i>
            </div>
            <div class="rest relative" style="padding-top:4px">
                <div class="right" style="width: 94px; height: 45px">
                    <button id="{$entity}-{$column}-btn"
                            onclick="editListMult('{$relation}', '#{$entity}-{$column}', __$0__)"
                            class="btn-floating hover-shadow color-white opacity hover-opacity-off editListMult">
                        <i class="material-icons transition-ease-25">edit</i>
                    </button>
                    <button onclick="removerListMult('#{$entity}-{$column}', __$0__)"
                            class="btn-floating color-hover-text-red hover-shadow color-white opacity hover-opacity-off margin-0 removerListMult">
                        <i class="material-icons transition-ease-25">delete</i>
                    </button>
                </div>
                <div class="left container padding-8 font-light listmult-title">__$1__</div>
            </div>
        </div>
    </div>
</div>