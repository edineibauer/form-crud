$(function() {
    loadMask();
    var $form = $("body").find("form").last();
    $form.off("keyup change", "input, textarea, select").on("keyup change", "input, textarea, select", function (e) {
        if (e.which !== 13)
            formSubmit($form);
    }).submit(function (e) {
        e.preventDefault();
    });
});