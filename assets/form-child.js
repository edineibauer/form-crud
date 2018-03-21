$(function() {
    if($("head").find("script[data-info='form-crud']").length === 0) {
        var ran = Math.floor((Math.random() * 10000));
        $("head")
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/dropzone.min.css?v=' + ran + '" >')
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/form.min.css?v=' + ran + '" >')
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/jquery-te.min.css?v=' + ran + '" >')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/jquery-te.min.js?v=' + ran + '" ></script>')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/dropzone.min.js?v=' + ran + '" ></script>')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/form.min.js?v=' + ran + '" data-info="form-crud" ></script>');
    }

    $(".table-search").prop("disabled", true);
    setTimeout(function(){
        $(".table-search").prop("disabled", false);
    },1000);
    loadMask();
    formAutoSubmit(".form-control");
});