<?php

class Webcomm_MagentoBoilerplate_Model_Observer
{
    public function addLayoutXml($event)
    {
        $xml = $event->getUpdates()
                ->addChild('magentoboilerplate');
        $xml->addAttribute('module', 'Webcomm_MagentoBoilerplate');
        $xml->addChild('file', 'magentoboilerplate.xml');
    }
}
