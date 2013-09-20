<?php
/**
 * Webcomm Magento Boilerplate
 *
 * @copyright   Copyright (c) 2012 - 2013 Webcomm Pty Ltd
 * @link        http://webcomm.com.au
 */

class Webcomm_BootstrapNavigation_Block_Page_Html_Topmenu extends Mage_Page_Block_Html_Topmenu
{
	/**
     * Recursively generates top menu html from data that is specified in $menuTree
     *
     * @param Varien_Data_Tree_Node $menuTree
     * @param string $childrenWrapClass
     * @return string
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

			$anchorClasses    = array();
			$anchorAttributes = array();

            $outermostClassCode = '';
            $outermostClass = $menuTree->getOutermostClass();

            if ($childLevel == 0 && $outermostClass) {
            	$anchorClasses[] = $outermostClass;
                $child->setClass($outermostClass);
            }

            if ($child->hasChildren()) {
            	$anchorClasses[] = 'dropdown-toggle';

            	if ($childLevel == 0) {
            		// $anchorAttributes[] = array('data-toggle', 'dropdown');
            		$anchorAttributes[] = array('data-hover', 'dropdown');
            	}
            }

            // Add list item
            $html .= '<li ' . $this->_getRenderedMenuItemAttributes($child) . '>';

            array_walk($anchorAttributes, function(&$attribute) {
            	$attribute = $attribute[0] . '="' . $attribute[1] . '"';
            });

            // Add anchor item
            $html .= '<a href="' . $child->getUrl() . '" class="' . implode(' ', $anchorClasses) . '"' . implode(' ', $anchorAttributes) . '>';

            // Actual item itself
            $html .= '<span>' . $this->escapeHtml($child->getName()) . '</span>';

            if ($child->hasChildren() && $childLevel == 0) {
            	$html .= '<span class="caret"></span>';
            }

            // Close anchor item
            $html .= '</a>';

            if ($child->hasChildren()) {
                $html .= '<ul class="level' . $childLevel . ' ' . $childrenWrapClass . '">';
                $html .= $this->_getHtml($child, $childrenWrapClass);
                $html .= '</ul>';
            }
            $html .= '</li>';

            $counter++;
        }

        return $html;
    }

	/**
	 * Returns array of menu item's classes
	 *
	 * @param Varien_Data_Tree_Node $item
	 * @return array
	 */
	protected function _getMenuItemClasses(Varien_Data_Tree_Node $item)
	{
		$classes = parent::_getMenuItemClasses($item);

		if ($item->hasChildren()) {

			if ($item->getLevel() == 0) {
				$classes[] = 'dropdown';
			} else {
				$classes[] = 'dropdown-menu';
			}
		}

		return $classes;
	}
}
