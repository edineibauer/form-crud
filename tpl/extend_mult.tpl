<div class="{$form['class']}" style="{$form['style']}">
    <div class="row list_mult_input border-bottom radius border" style="background: rgba(200,200,200, 0.1);">

        <div class="buttonExtenContainer padding-4 right">
            <button class="btn-floating opacity hover-opacity-off theme-d2 extendButton hover-shadow margin-0 right list-{$relation}"
                    style="margin-right:20px!important"
                    {($disabled)? "disabled='disabled' " : ''}
                    data-entity="{$relation}" data-fields='{$form['fields']|@json_encode}'
                    data-defaults='{$form['defaults']|@json_encode}' data-autosave="{$autosave}">
                <i class="material-icons left">add</i>
            </button>

            <input type="hidden" data-model="{$ngmodel}" id="{$entity}-{$column}" data-format="extend_mult"
                    {($value)? "value='[{foreach item=id key=i from=$value}{if $i > 0},{/if}{$id.id}{/foreach}]'" : ''} />
        </div>
        <div class="left color-text-grey padding-12 container upper relative">
            {$nome}
        </div>

        <div class="tpl_div_new_mult hide" rel="mult"></div>

        <div class="container listmult-content">
            {if $value}
                {foreach item=data key=i from=$value}
                    <div class="listmult-card" style="border-top: solid 2px #DDD;margin-bottom: 2px!important;" rel="{$data.id}">
                        <div class="col padding-small container" style="width:30px">
                            <i class="material-icons padding-8">{$icon}</i>
                        </div>
                        <div class="rest relative" style="padding-top:4px">
                            <div class="right" style="width: 94px; height: 45px">
                                <button id="{$entity}-{$column}-btn"
                                        onclick="editListMult('{$relation}', '#{$entity}-{$column}', {$data.id})"
                                        class="btn-floating hover-shadow color-white opacity hover-opacity-off">
                                    <i class="material-icons transition-ease-25">edit</i>
                                </button>
                                <button onclick="removerListMult('#{$entity}-{$column}', {$data.id})"
                                        class="btn-floating color-hover-text-red hover-shadow color-white opacity hover-opacity-off margin-0">
                                    <i class="material-icons transition-ease-25">delete</i>
                                </button>
                            </div>
                            <div class="left container padding-8 font-light listmult-title">{$data.title}</div>
                        </div>
                    </div>
                {/foreach}
            {/if}
        </div>

        <div class="tpl_list_mult hide listmult-card" style="border-top: solid 2px #DDD;margin-bottom: 2px!important;" rel="__$0__">
            <div class="col padding-small container" style="width:30px">
                <i class="material-icons padding-8">{$icon}</i>
            </div>
            <div class="rest relative" style="padding-top:4px">
                <div class="right" style="width: 94px; height: 45px">
                    <button id="{$entity}-{$column}-btn"
                            onclick="editListMult('{$relation}', '#{$entity}-{$column}', __$0__)"
                            class="btn-floating hover-shadow color-white opacity hover-opacity-off">
                        <i class="material-icons transition-ease-25">edit</i>
                    </button>
                    <button onclick="removerListMult('#{$entity}-{$column}', __$0__)"
                            class="btn-floating color-hover-text-red hover-shadow color-white opacity hover-opacity-off margin-0">
                        <i class="material-icons transition-ease-25">delete</i>
                    </button>
                </div>
                <div class="left container padding-8 font-light listmult-title">__$1__</div>
            </div>
        </div>
    </div>
</div>