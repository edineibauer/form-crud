<form class="row relative plugin" id='form_{$entity}' method='post' data-plugin="model" data-entity="{$entity}" action="save/form">
    <div class="panel">
        {foreach $inputs as $input}
            {$input}
        {/foreach}
    </div>
    <script src="{$home}assets/form-child.js" defer ></script>
</form>