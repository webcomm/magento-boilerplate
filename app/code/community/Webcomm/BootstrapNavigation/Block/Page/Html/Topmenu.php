<?php
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2011-2014 Webcomm Pty Ltd
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
                if (
                    Mage::getStoreConfig('catalog/navigation/top_in_dropdown')
                    && $childLevel == 0
                ) {
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
