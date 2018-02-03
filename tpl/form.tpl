<link rel="stylesheet" href="{$home}assets/dropzone.css" >
<link rel="stylesheet" href="{$home}assets/form.css" >
<script src="{$home}assets/dropzone.min.js" defer ></script>
<script src="{$home}assets/form.js" defer ></script>

<div class="row relative form-crud" id='form_{$entity}' data-entity="{$entity}" data-action="save/form">
    <div class="panel">
        {foreach $inputs as $input}
            {$input}
        {/foreach}
    </div>
</div>

<div id="teste"></div>