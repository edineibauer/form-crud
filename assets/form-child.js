$(function() {
    if($("head").find("script[data-info='form-crud']").length === 0) {
        $("head")
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/dropzone.min.css" >')
            .append('<link rel="stylesheet" href="' + HOME + 'vendor/conn/form-crud/assets/form.min.css" >')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/dropzone.min.js" ></script>')
            .append('<script src="' + HOME + 'vendor/conn/form-crud/assets/form.min.js" data-info="form-crud" ></script>');
    }

    loadMask();
    formAutoSubmit(".form-control");
});