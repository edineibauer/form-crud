<div class="{$col}">
    <div class="input-field col s12">
        <select>
            {section name=index loop=$allow}
            <option value="{$allow[index]}">{$relation[$smarty.section.index.index + 1]}</option>
            {/section}
        </select>
        <label>{$title}</label>
    </div>
</div>