<div class="clear"><br></div>
<div class="row">
    <div class="col container pd-small right" style="width:135px">
        <button class="btn color-blue listButton" id="list-{$relation}" data-entity="{$relation}"><i class="material-icons left pd-small">add</i> <span class="left pd-small">Novo</span></button>

        <input type="hidden" data-model="{$ngmodel}" id="{$entity}-{$column}" data-format="list_mult"
                {($value)? "value='[{foreach item=id key=i from=$value}{if $i > 0},{/if}{$id.id}{/foreach}]'" : ''} />
    </div>
    <div class="rest container pd-big relative">
        {$nome}
    </div>

    <div class="container" id="listmult-content">
        {if $value}
            {foreach item=data key=i from=$value}
                <div class="card listmult-card" style="margin-bottom: 2px!important;" rel="{$data.id}">
                    <div class="col pd-small container" style="width:60px">
                    </div>
                    <div class="rest pd-small relative">
                        <div class="right" style="width: 100px; height: 45px">
                            <button id="{$entity}-{$column}-btn" onclick="editListMult('{$relation}', '#{$entity}-{$column}', {$data.id})" class="btn-floating color-white opacity hover-opacity-off"><i class="material-icons">edit</i></button>
                            <button onclick="removerListMult('#{$entity}-{$column}', {$data.id})" class="btn-floating color-white opacity hover-opacity-off"><i class="material-icons">delete</i></button>
                        </div>
                        <div class="right container pd-mediumb listmult-title">{$data[$info.title]}</div>
                    </div>
                </div>
            {/foreach}
        {/if}
    </div>

    <div id="tpl-listmult" class="hide card listmult-card" style="margin-bottom: 2px!important;" rel="__$0__">
        <div class="col pd-small container" style="width:60px">
        </div>
        <div class="rest pd-small relative">
            <div class="right" style="width: 100px; height: 45px">
                <button id="{$entity}-{$column}-btn" onclick="editListMult('{$relation}', '#{$entity}-{$column}', __$0__)" class="btn-floating color-white opacity hover-opacity-off"><i class="material-icons">edit</i></button>
                <button onclick="removerListMult('#{$entity}-{$column}', __$0__)" class="btn-floating color-white opacity hover-opacity-off"><i class="material-icons">delete</i></button>
            </div>
            <div class="right container pd-mediumb listmult-title">__$1__</div>
        </div>
    </div>
</div>