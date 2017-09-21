<input type='hidden' id='bancoUso' value='#tableSelect#'/>
<div class='container'>
    <input type='hidden' class="formcrud" id="{$column}" ng-model="{$ngmodel}" />
    <div class='container pd-medium {$class}' id='imgpreview'>
        {$column}
        <button onclick="getPage('sendGallery', '#value#', '#retorno#');" class='container btn btn-white pd-medium'>
            <i class='shoticon shoticon-gallery'></i>Editar Imagem
        </button>
    </div>
</div>