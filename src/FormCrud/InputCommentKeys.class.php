<?php

/**
 * Created by PhpStorm.
 * User: Edinei
 * Date: 12/05/2017
 * Time: 10:47
 */
class InputCommentKeys {
    private $dado;
    private $data;
    private $coluna;
    private $table;
    private $retorno;
    private $result;

    /**
     * @param mixed $data
     */
    public function setData($data) {
        $this->data = $data;
    }

    /**
     * @param mixed $coluna
     */
    public function setColuna($coluna) {
        $this->coluna = $coluna;
    }

    /**
     * @param mixed $dado
     */
    public function setDado($dado) {
        $this->dado = $dado;
    }

    /**
     * @param mixed $table
     */
    public function setTable($table) {
        $this->table = $table;
    }

    /**
     * @param mixed $retorno
     */
    public function setRetorno($retorno) {
        $this->retorno = $retorno;
    }

    /**
     * @return mixed
     */
    public function getResult() {
        $this->start();
        return $this->result;
    }

    private function start() {
        if (isset($this->dado['tags'])):
            foreach ($this->dado['tags'] as $tag):

                switch ($tag):
                    case 'week':

                        $this->dado['title'] = "Dia da Semana";
                        $this->dado['options'] = "";
                        $week = [1 => "D", 2 => "S", 3 => "T", 4 => "Q", 5 => "Q", 6 => "S", 7 => "S"];
                        for ($i = 1; $i < 8; $i++):
                            $this->dado['options'] .= "<button class='btn btn-white " . ($this->dado['value'] === $i ? "weekSelected " : "") . "pd-medium fl-left border-primaryhover weeks' id='{$this->dado['id']}-{$i}' onclick=\"selectWeek({$i}, '{$this->dado['id']}')\" style='margin-left:2px;'>{$week[$i]}</button>";
                        endfor;

                        $this->setResult("week");
                        break;

                    case 'month':

                        $this->dado['title'] = "Dia do Mês";
                        $this->dado['options'] = "";
                        for ($i = 1; $i < 32; $i++):
                            $this->dado['options'] .= "<button class='btn btn-white " . ($this->dado['value'] === $i ? "weekSelected " : "") . "pd-medium fl-left border-primaryhover month' id='{$this->dado['id']}-{$i}' onclick=\"selectMonth({$i}, '{$this->dado['id']}')\">" . ($i < 10 ? "0" : "") . "{$i}</button>";
                        endfor;

                        $this->setResult("week");
                        break;

                    case 'on':
                        $this->dado['title'] = ucwords(Check::getNameBanco($this->coluna));
                        $this->dado['check'] = ($this->dado['value'] == 1 ? 'checked="checked"' : '');
                        $this->dado = $this->getTagsOn($this->dado, $this->dado['tags']);
                        $this->setResult("on");
                        break;

                    case 'star':
                        $this->dado['title'] = ucwords(str_replace(array('_', '-'), ' ', $this->coluna));
                        $this->dado['star'] = Check::Star($this->dado['id'], $this->dado['value'], 10);
                        $this->setResult("star");
                        break;

                    case 'hidden':
                        $this->result = " ";
                        break;

                    case 'invisible':
                        $this->setResult("invisible");
                        break;

                    case 'level':
                        $this->dado['check0'] = ($this->dado['value'] === 0 ? "selected='selected'" : "");
                        $this->dado['check1'] = ($this->dado['value'] === 1 ? "selected='selected'" : "");
                        $this->dado['check2'] = ($this->dado['value'] === 2 ? "selected='selected'" : "");
                        $this->dado['check3'] = ($this->dado['value'] === 3 ? "selected='selected'" : "");
                        $this->setResult("level");
                        break;

                    case 'image':

                        $this->dado['tableSelect'] = $this->table;
                        $this->dado['retorno'] = $this->retorno;

                        $gallery = new Gallery();
                        $gallery->setTable($this->table);
                        $gallery->setCover($this->dado['value']);
                        $gallery->setPostId($this->dado['id']);
                        $this->dado['images'] = $gallery->getGallery();

                        $this->setResult("image");
                        break;

                    default:
                        if (file_exists('../../_app' . DIRECTORY_SEPARATOR . 'formCrud' . DIRECTORY_SEPARATOR . 'tpl' . DIRECTORY_SEPARATOR . $this->dado['tags'][0] . '.tpl.html')):
                            $this->setResult($this->dado['tags'][0]);
                        endif;

                endswitch;
            endforeach;
        endif;
    }

    private function getTagsOn($dados, $tags) {

        $dados["tag_1"] = "";
        $dados['tag_2'] = "";

        if (count($tags) > 1):
            $alvo = 1;
            foreach ($tags as $tag):
                if ($alvo < 3 && $tag !== "on" && isset($this->data[$tag])):
                    $dados["tag_{$alvo}"] = ucwords(Check::getNameBanco($tag));
                    $alvo++;
                endif;
            endforeach;

            if ($alvo !== 3):
                $dados["tag_1"] = "";
                $dados['tag_2'] = "";
            endif;
        endif;

        return $dados;
    }

    private function setResult($tpl) {
        $input = new View();
        $input->setBase("_app/formCrud/tpl");
        $dados = $this->dado;
        unset($dados['tags'], $dados['style'], $dados['exe'], $dados['allow'], $dados['regular']);
        $this->result = $input->Retorna($dados, $input->Load($tpl));
    }

}