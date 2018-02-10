<div class="row padding-medium color-text-grey font-small">{$nome}</div>
<div class="row">
    <div class="col container" style="width:60px">
        <div class="col btn-floating color-grey-light listButton" id="list-{$relation}" data-entity="{$relation}"
             style="width:41px">
            <i class="material-icons prefix pointer editList">folder</i>
        </div>
        <input type="hidden" data-model="{$ngmodel}" id="{$entity}-{$column}" data-format="list_mult"
                {($value)? "value='[{foreach item=id key=i from=$value}{if $i > 0},{/if}{$id.id}{/foreach}]'" : ''} />
    </div>
    <div class="rest container relative">
        <input type="text" placeholder="{$nome}" autocomplete="off" id="{$column}"
                {($size !== false)? "maxlength='{$size}' " : ''}
                {($default === false)? 'required="required" ' : ''}
               data-entity="{$relation}" style="{$form['style']}" class="form-list rest {$form['class']}"/>
        <div class="col s12" rel="mult" id="list-complete-{$column}"></div>
    </div>

    <div class="container" id="listmult-content">
        {if $value}
            {foreach item=data key=i from=$value}
                <div class="card listmult-card" style="margin-bottom: 2px!important;" rel="{$data.id}">
                    <div class="col padding-small container" style="width:60px">
                    </div>
                    <div class="rest padding-small relative">
                        <div class="right" style="width: 100px; height: 45px">
                            <button id="{$entity}-{$column}-btn" onclick="editListMult('{$relation}', '#{$entity}-{$column}', {$data.id})" class="btn-floating color-white opacity hover-opacity-off"><i class="material-icons">edit</i></button>
                            <button onclick="removerListMult('#{$entity}-{$column}', {$data.id})" class="btn-floating color-white opacity hover-opacity-off"><i class="material-icons">delete</i></button>
                        </div>
                        <div class="right container padding-medium listmult-title">{$data[$info.title]}</div>
                    </div>
                </div>
            {/foreach}
        {/if}
    </div>

    <div id="tpl-listmult" class="hide card listmult-card" style="margin-bottom: 2px!important;" rel="__$0__">
        <div class="col padding-small container" style="width:60px">
        </div>
        <div class="rest padding-small relative">
            <div class="right" style="width: 100px; height: 45px">
                <button id="{$entity}-{$column}-btn" onclick="editListMult('{$relation}', '#{$entity}-{$column}', __$0__)" class="btn-floating color-white opacity hover-opacity-off"><i class="material-icons">edit</i></button>
                <button onclick="removerListMult('#{$entity}-{$column}', __$0__)" class="btn-floating color-white opacity hover-opacity-off"><i class="material-icons">delete</i></button>
            </div>
            <div class="right container padding-medium listmult-title">__$1__</div>
        </div>
    </div>
</div>