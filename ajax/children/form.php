<?php
$entity = trim(strip_tags(filter_input(INPUT_POST, 'entity', FILTER_DEFAULT)));
$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

$form = new \FormCrud\Form($entity);
$data['data'] = $form->getFormChildren($id ?? null);