<div class="col container" style="width:60px">
    <button class="col btn-floating color-grey-light listButton" id="list-{$relation}" data-entity="{$relation}"
            style="width:41px">
        <i class="material-icons prefix pointer editList">folder</i>
    </button>
    <input type="hidden" data-model="{$ngmodel}"
            {($id !== "")? "value='{$id}'" : ''} />
</div>
<div class="rest container">
    <input type="text" id="{$column}" placeholder="{$nome}"
            {($title != "")? "value='{$title}'" : ''}
            {($size !== false)? "maxlength='{$size}' " : ''}
            {($default === false)? 'required="required" ' : ''}
           data-entity="{$relation}" style="{$form['style']}" class="rest {$form['class']}"/>
</div>
