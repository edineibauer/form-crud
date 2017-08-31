<?php

namespace FormCrud;

use ConnCrud\Read;
use Entity\EntityInfo;

class TemplateEngine
{
    private $smart;

    public function __construct()
    {
        $this->start();
    }

    public function getShow(string $template, array $data = null) :string
    {
        if ($data) {
            $this->setData($data);
        }
        $retorno =  $this->smart->fetch($template . ".tpl");

        $this->smart->clearAllAssign();

        return $retorno;
    }

    /**
     * @param string $template
     * @param array $data
     */
    public function show(string $template, array $data = null) : void
    {
        if ($data) {
            $this->setData($data);
        }
        $this->smart->display($template . ".tpl");
        $this->smart->clearAllAssign();
    }

    /**
     * @param array $data
    */
    public function setData(array $data)
    {
        foreach ($data as $name => $value) {
            $this->smart->assign($name, $value);
        }
    }

    public function clearData()
    {
        $this->smart->clearAllAssign();
    }

    private function start()
    {
        $this->smart = new \Smarty();
        //        $this->smart->caching = true;
        //        $this->smart->cache_lifetime = 120;

        $this->smart->setTemplateDir("src/FormCrud/tplMaterialize");
    }
}