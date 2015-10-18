<?php

class Webcomm_MagentoBoilerplate_Helper_Resource_Setup extends Mage_Core_Helper_Abstract
{
    /**
     * Remove config data with the given path. These may be a string
     * that matches the key to remove, or an array suitable to
     * be passed to Magento's query builder instead.
     *
     * @param  mixed $path
     * @return void
     */
    public function removeConfigData($path)
    {
        $values = Mage::getModel('core/config_data')
            ->getCollection()
            ->addFieldToFilter('path', $path);

        foreach ($values as $value) {
            $value->delete();
        }

        return $this;
    }
}
