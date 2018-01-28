var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

$('.telefone').mask(SPMaskBehavior, spOptions);
$(".rg").mask('9999999999', {reverse: true});
$(".ie").mask('999.999.999.999', {reverse: true});
$(".cpf").mask('999.999.999-99', {reverse: true});
$(".cnpj").mask('99.999.999/9999-99', {reverse: true});
$(".cep").mask('99999-999', {reverse: true});
$(".valor").mask('#.##0,00', {reverse: true});
$('.date_time').mask('00/00/0000 00:00:00');