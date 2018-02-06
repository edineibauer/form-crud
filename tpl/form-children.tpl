<div class="row relative form-crud" id='form_{$entity}' data-entity="{$entity}" data-action="save/form">
    <div class="panel">
        {foreach $inputs as $input}
            {$input}
        {/foreach}
    </div>
    <script src="{$home}vendor/conn/entity-form/assets/form-child.min.js" defer ></script>
</div>