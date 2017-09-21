<form class="row" id='form-{$entity}' method='post' ng-app="formcrud" ng-controller="formcrud-controller" ng-cloak="">
    {foreach $inputs as $input}
        {$input}
    {/foreach}

    {$actions}
</form>

<script>
    window.onload = function() {
        var formCrud = angular.module('formcrud', []);
        formCrud.controller('formcrud-controller', function ($scope) {

            $scope.dados = {};

            $scope.saveFormCrud = function () {
                $.post("{$home}request/post", {
                    lib: "form-crud",
                    file: "saveDadosEntity",
                    entity: "{$entity}",
                    dados: $scope.dados
                }, function (g) {
                    g = $.parseJSON(g);
                    Materialize.toast(g['mensagem'], 3000);

                    if(g['response'] === 2) {
                        console.log(g['erros']);
                    }
                });
            };

        });
    }
</script>