<header class="color-blue container">
    <h2>{($id) ? "Editar " : "Cadastro de "}{$entity}</h2>
</header>
<form class="row relative plugin" id='form_{$entity}' method='post' data-plugin="model" data-table="{$entity}" action="save/form">
    <div class="panel">
        {foreach $inputs as $input}
            {$input}
        {/foreach}
    </div>
</form>
<script src="{$home}vendor/conn/form-crud/assets/form.js" defer ></script>