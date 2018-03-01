<div class="row padding-medium color-text-grey font-small">{$nome}</div>
<div class="row">
    <div class="hide">
        <input type="hidden" data-model="{$ngmodel}" id="{$ngmodel}" data-format="list"
                {($id !== "")? "value='{$id}'" : ''} />
    </div>
    <div class="col s12 container relative">
        <input type="text" placeholder="{$nome}" autocomplete="off" id="{$column}"
                {($title != "")? "value='{$title}'" : ''}
                {($size !== false)? "maxlength='{$size}' " : ''}
                {($default === false)? 'required="required" ' : ''}
               data-entity="{$relation}" style="{$form['style']}" class="form-list rest {$form['class']}"/>
        <div class="col s12" rel="one" id="list-complete-{$column}"></div>
    </div>
</div>