<?php

class Webcomm_MagentoBoilerplate_Helper_Data extends Mage_Core_Helper_Abstract
{
    /**
     * Payload produced by the assets manifest JSON file.
     *
     * @var array
     */
    protected $assetsManifest;

    /**
     * Get the dynamically produced stylesheet URL.
     *
     * @return string
     */
    public function getStylesheetUrl()
    {
        return $this->getAsset('css/styles.css');
    }

    /**
     * Get the dynamically produced JavaScript URL.
     *
     * @return string
     */
    public function getJavascriptUrl()
    {
        return $this->getAsset('js/scripts.js');
    }

    /**
     * Get an asset by name, utilising the manifest where possibel.
     *
     * @param  string  $name
     * @return string
     */
    protected function getAsset($name)
    {
        $manifest = $this->getAssetsManifest();

        if (array_key_exists($name, $manifest)) {
            return $manifest[$name];
        }

        return $name;
    }

    /**
     * Get the assets manifest payload, lazily-loading the contents of the file.
     *
     * @return array
     */
    protected function getAssetsManifest()
    {
        if ($this->assetsManifest === null) {
            $assetsJsonFile = Mage::getDesign()->getSkinBaseDir().'/rev-manifest.json';

            if (file_exists($assetsJsonFile)) {
                $this->assetsManifest = json_decode(file_get_contents($assetsJsonFile), true);
            } else {
                $this->assetsManifest = [];
            }
        }

        return $this->assetsManifest;
    }
}
