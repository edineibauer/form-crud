<div class="row padding-medium color-text-grey font-small">{$nome} {($default === false) ? "*" : ""}</div>
<div class="row">
    <div class="col container right" style="width:60px">
        <div class="col btn-floating color-{($id !== "")? "white" : 'teal'} listButton opacity hover-shadow hover-opacity-off" id="list-{$column}" data-entity="{$relation}"
             style="width:41px">
            <i class="material-icons prefix pointer editList">{($id !== "")? "edit" : 'add'}</i>
        </div>
        <input type="hidden" data-model="{$ngmodel}" id="{$ngmodel}" data-format="list"
                {($id !== "")? "value='{$id}'" : ''} />
    </div>
    <div class="rest container relative">
        <input type="text" placeholder="{$nome}" autocomplete="off" id="{$column}"
                {($title != "")? "value='{$title}'" : ''}
                {($size !== false)? "maxlength='{$size}' " : ''}
                {($default === false)? 'required="required" ' : ''}
               data-entity="{$relation}" data-parent="{$entity}" style="{$form['style']}" class="form-list rest {$form['class']}"/>
        <div class="col s12 list-complete" rel="one"></div>
    </div>
</div>
<div class="clear"><br></div>