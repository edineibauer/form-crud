<?php
$entity = trim(strip_tags(filter_input(INPUT_POST, 'entity', FILTER_DEFAULT)));
$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$form = new \FormCrud\Form($entity);
$data['data'] = $form->getForm($id ?? null);

$data['data'] .= '<script>
$(function() {
    $("body").find("form").last().model();
});</script>';