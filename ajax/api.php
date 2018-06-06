<?php
$entity = trim(strip_tags(filter_input(INPUT_POST, 'entity', FILTER_DEFAULT)));
$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$save = filter_input(INPUT_POST, 'autosave', FILTER_VALIDATE_BOOLEAN);
$callback = trim(strip_tags(filter_input(INPUT_POST, 'callback', FILTER_DEFAULT)));

$defaults = trim(strip_tags(filter_input(INPUT_POST, 'defaults', FILTER_DEFAULT)));
$defaults = !empty($defaults) ? json_decode($defaults, true) : null;

$fields = trim(strip_tags(filter_input(INPUT_POST, 'fields', FILTER_DEFAULT)));
$fields = !empty($fields) ? json_decode($fields, true) : null;

if(!empty($entity)) {
    $form = new \FormCrud\Form($entity);

    if ($save === false)
        $form->setAutoSave(false);

    if ($callback)
        $form->setCallback($callback);

    if(!empty($fields))
        $form->setFields($fields);

    if(!empty($defaults))
        $form->setDefaults($defaults);

    $data['data'] = $form->getForm($id ?? null);

    if($form->getError()) {
        $data['response'] = 2;
        $data['error'] = $form->getError();
    }
} else {
    $data['response'] = 2;
    $data['error'] = "Entidade não encontrada. Envie um 'entity' válido.";
}