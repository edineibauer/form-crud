{if !$reload}
    <input type='hidden' class="fields" id='fields-{$entity}' value='{($fields) ? ($fields|json_encode) : ""}'/>
{/if}
<div class='form-control row font-large'>
    <div class="row relative form-crud" id='form_{$entity}' data-entity="{$entity}">
        <div class="panel">
            <input type='hidden' rel='title' value='{$relevant}'>
            {foreach $inputs as $input}
                {$input}
            {/foreach}
            <input type="hidden" value="{$autoSave}" id="autoSave"/>
            <input type="hidden" value="{$callback}" id="callbackAction"/>
        </div>

        {if $saveButton.text != "Adicionar" && $saveButton.text != "Atualizar"}
            <div class="col padding-16 container parent-save-form">
                <button class="btn theme-d2 hover-shadow opacity hover-opacity-off saveFormButton {$saveButton.class}">
                    <i class="material-icons left padding-right">{$saveButton.icon}</i>{$saveButton.text}
                </button>
            </div>
        {/if}

        {if !$reload}
            <script>
                (function () {
                    var $head = document.getElementsByTagName('head')[0];
                    if (document.querySelector("script[data-info='form-crud']") == null) {
                        var style = document.createElement('link');
                        style.rel = "stylesheet";
                        style.href = HOME + 'vendor/conn/form-crud/assets/main.min.css?v=' + VERSION;
                        $head.appendChild(style);

                        var script = document.createElement('script');
                        script.setAttribute("data-info", "form-crud");
                        script.src = HOME + 'vendor/conn/form-crud/assets/main.min.js?v=' + VERSION;
                        $head.appendChild(script);
                    } else {
                        {if $saveButton.text == "Adicionar" || $saveButton.text == "Atualizar"}
                        loadMask($('#form_{$entity}'));
                        loadFormFiles($('#form_{$entity}'));
                        {else}
                        loadForm('#form_{$entity}');
                        {/if}
                    }
                })();
            </script>
        {/if}
    </div>
</div>
