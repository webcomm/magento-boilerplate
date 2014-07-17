<?php

class Webcomm_BootstrapNavigation_Block_Page_Html_Topmenu extends Mage_Page_Block_Html_Topmenu
{
    /**
     * {@inheritDoc}
     */
    protected function _getHtml(Varien_Data_Tree_Node $menuTree, $childrenWrapClass)
    {
        $html = '';

        $children = $menuTree->getChildren();
        $parentLevel = $menuTree->getLevel();
        $childLevel = is_null($parentLevel) ? 0 : $parentLevel + 1;

        $counter = 1;
        $childrenCount = $children->count();

        $parentPositionClass = $menuTree->getPositionClass();
        $itemPositionClassPrefix = $parentPositionClass ? $parentPositionClass . '-' : 'nav-';

        foreach ($children as $child) {

            $child->setLevel($childLevel);
            $child->setIsFirst($counter == 1);
            $child->setIsLast($counter == $childrenCount);
            $child->setPositionClass($itemPositionClassPrefix . $counter);

            $outermostClassCode = '';
            $outermostClass = $menuTree->getOutermostClass();

            if ($childLevel == 0 && $outermostClass) {
                $outermostClassCode = ' class="' . $outermostClass . '" ';
                $child->setClass($outermostClass);
            }
            if ($child->hasChildren()) {
                $outermostClassCode .= ' data-toggle="dropdown" ';
            }

            $html .= '<li ' . $this->_getRenderedMenuItemAttributes($child) . '>';
            $html .= '<a href="' . $child->getUrl() . '" ' . $outermostClassCode . '><span>';
            $html .= $this->escapeHtml($child->getName());
            if ($child->hasChildren()) {
                $html .= ' <b class="caret"></b>';
            }
            $html .= '</span></a>';

            if ($child->hasChildren()) {
                if (!empty($childrenWrapClass)) {
                    $html .= '<div class="' . $childrenWrapClass . '">';
                }
                $html .= '<ul class="level' . $childLevel . ' dropdown-menu">';
                if ($childLevel == 0) {
                    $prefix = Mage::getStoreConfig('catalog/navigation/top_in_dropdown_prefix');
                    $suffix = Mage::getStoreConfig('catalog/navigation/top_in_dropdown_suffix');
                    $html .= '<li class="level1 level-top-in-dropdown">';
                    $html .= '<a href="'.$child->getUrl().'"><span>';
                    $html .= $this->escapeHtml($prefix.' '.$child->getName().' '.$suffix);
                    $html .= '</span></a>';
                    $html .= '</li>';
                    $html .= '<li class="divider"></li>';
                }
                $html .= $this->_getHtml($child, $childrenWrapClass);
                $html .= '</ul>';

                if (!empty($childrenWrapClass)) {
                    $html .= '</div>';
                }
            }
            $html .= '</li>';

            $counter++;
        }

        return $html;
    }

    /**
     * {@inheritDoc}
     */
    protected function _getMenuItemClasses(Varien_Data_Tree_Node $item)
    {
        $classes = parent::_getMenuItemClasses($item);

        if ($item->hasChildren()) {
            $classes[] = 'parent';
        }

        return $classes;
    }
}
