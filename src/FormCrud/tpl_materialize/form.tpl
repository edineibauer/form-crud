<form action='{$home}formCrud' class="row" name='form-{$entity}' id='form-{$entity}' method='post'>
    {foreach $inputs as $input}
        {$input}
    {/foreach}

    {!$actions}
</form>