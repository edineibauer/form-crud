<link rel="stylesheet" href="{$home}vendor/conn/entity-form/assets/dropzone.min.css" >
<link rel="stylesheet" href="{$home}vendor/conn/entity-form/assets/form.min.css" >
<script src="{$home}vendor/conn/entity-form/assets/dropzone.min.js" defer ></script>
<script src="{$home}vendor/conn/entity-form/assets/form.min.js" defer ></script>

<div class="row relative form-crud" id='form_{$entity}' data-entity="{$entity}" data-action="save/form">
    <div class="panel">
        {foreach $inputs as $input}
            {$input}
        {/foreach}
    </div>
</div>

<div id="teste"></div>