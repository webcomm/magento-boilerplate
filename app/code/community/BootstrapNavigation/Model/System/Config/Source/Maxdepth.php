<?php

class Webcomm_BootstrapNavigation_Model_System_Config_Source_Maxdepth
{
    /**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        return array(
            array('value' => 2, 'label'=>Mage::helper('adminhtml')->__('Yes')),
            array('value' => 1, 'label'=>Mage::helper('adminhtml')->__('No')),
        );
    }

    /**
     * Get options in "key-value" format
     *
     * @return array
     */
    public function toArray()
    {
        return array(
            2 => Mage::helper('adminhtml')->__('Yes'),
            1 => Mage::helper('adminhtml')->__('No'),
        );
    }
}
