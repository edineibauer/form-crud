function loadForm(){
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
}