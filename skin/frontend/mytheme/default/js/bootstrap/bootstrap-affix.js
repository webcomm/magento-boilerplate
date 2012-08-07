/* ==========================================================
 * bootstrap-affix.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */!function(e){"use strict";var t=function(t,n){this.options=e.extend({},e.fn.affix.defaults,n);this.$window=e(window).on("scroll.affix.data-api",e.proxy(this.checkPosition,this)).on("resize.affix.data-api",e.proxy(this.refresh,this));this.$element=e(t);this.refresh()};t.prototype.refresh=function(){this.position=this.$element.offset()};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var e=this.$window.scrollLeft(),t=this.$window.scrollTop(),n=this.position,r=this.options.offset,i;typeof r!="object"&&(r={x:r,y:r});i=(r.x==null||n.left-e<=r.x)&&(r.y==null||n.top-t<=r.y);if(i==this.affixed)return;this.affixed=i;this.$element[i?"addClass":"removeClass"]("affix")};e.fn.affix=function(n){return this.each(function(){var r=e(this),i=r.data("affix"),s=typeof n=="object"&&n;i||r.data("affix",i=new t(this,s));typeof n=="string"&&i[n]()})};e.fn.affix.Constructor=t;e.fn.affix.defaults={offset:0};e(function(){e('[data-spy="affix"]').each(function(){var t=e(this),n=t.data();n.offset=n.offset||{};n.offsetX&&(n.offset.x=n.offsetX);n.offsetY&&(n.offset.y=n.offsetY);t.affix(n)})})}(window.jQuery);