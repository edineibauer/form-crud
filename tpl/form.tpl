<div class="row relative form-crud" id='form_{$entity}' data-entity="{$entity}">
    <div class="panel">
        {foreach $inputs as $input}
            {$input}
        {/foreach}
        <input type="hidden" value="{$autoSave}" id="autoSave" />
        <input type="hidden" value="{$callback}" id="callbackAction" />
        {if !$autoSave}
            <div class="col padding-16">
                <button class="btn color-teal hover-shadow opacity hover-opacity-off" id="saveFormButton"><i class="material-icons left padding-right">save</i>Salvar</button>
            </div>
        {/if}
    </div>
    <script src="{$home}vendor/conn/form-crud/assets/form-child.min.js?v={$cache}" defer ></script>
</div>
