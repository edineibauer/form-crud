<?php

namespace FormCrud;

class TemplateEngine
{
    private $design;
    private $smart;

    public function __construct($design = null)
    {
        if($design) {
            $this->setDesign($design);
        }
        $this->start();
    }

    /**
     * @param mixed $design
     */
    public function setDesign($design)
    {
        $this->design = $design;
    }

    /**
     * @param string $template
     * @param array $data
     * @return string
    */
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

        $this->smart->setTemplateDir("src/FormCrud/tpl" . ($this->design ? "_{$this->design}" : ""));
    }
}