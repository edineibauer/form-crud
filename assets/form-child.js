$(function() {
    if($("head").find("script[data-info='form-crud']").length === 0) {
        $("head")
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/dropzone.min.css" >')
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/form.min.css" >')
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/jquery-te.min.css" >')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/jquery-te.min.js" ></script>')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/dropzone.min.js" ></script>')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/form.min.js" data-info="form-crud" ></script>');
    }

    $(".table-search").prop("disabled", true);
    setTimeout(function(){
        $(".table-search").prop("disabled", false);
    },1000);
    loadMask();
    formAutoSubmit(".form-control");
});