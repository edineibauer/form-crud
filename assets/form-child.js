$(function() {
    if($("head").find("script[data-info='form-crud']").length === 0) {
        var ran = Math.floor((Math.random() * 10000));
        $("head")
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/main.min.css?v=' + ran + '" >')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/main.min.js?v=' + ran + '" data-info="form-crud" ></script>');
    }

    $(".table-search").prop("disabled", true);
    setTimeout(function(){
        $(".table-search").prop("disabled", false);
    },1000);

    $(".form-crud").off("click", "#saveFormButton").on("click", "#saveFormButton", function () {
        formSave($(this).closest(".form-crud"), true);
    });

    setTimeout(function () {
        $("input[type=email], input[type=password]").prop("disabled", false);
    },1);

    loadMask();
    formAutoSubmit(".form-control");
});