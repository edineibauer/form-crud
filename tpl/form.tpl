<form class="row relative" id='form_{$entity}' method='post' data-entity="{$entity}" action="save/form">
    <div class="panel">
        {foreach $inputs as $input}
            {$input}
        {/foreach}
    </div>
</form>