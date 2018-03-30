<div class="row relative form-crud" id='form_{$entity}' data-entity="{$entity}">
    <div class="panel">
        {foreach $inputs as $input}
            {$input}
        {/foreach}
        <input type="hidden" value="{$autoSave}" id="autoSave"/>
        <input type="hidden" value="{$callback}" id="callbackAction"/>
        {if !$autoSave}
            <div class="col padding-16">
                <button class="btn color-teal hover-shadow opacity hover-opacity-off" id="saveFormButton"><i
                            class="material-icons left padding-right">save</i>Salvar
                </button>
            </div>
        {/if}
    </div>
    <script>
        window.onload = function () {
            var $head = $("head");
            if ($head.find("script[data-info='form-crud']").length === 0) {
                var ran = Math.floor((Math.random() * 10000));
                $head.append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/main.min.css?v=' + ran + '" >\n<script src="' + HOME + 'vendor/conn/form-crud/assets/main.min.js?v=' + ran + '" data-info="form-crud"><\/script>');
            } else {
                loadForm();
            }
        };
    </script>
</div>
