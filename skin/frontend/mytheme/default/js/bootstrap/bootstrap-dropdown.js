/* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
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
 * ============================================================ */!function(e){"use strict";function r(){e(t).parent().removeClass("open")}var t='[data-toggle="dropdown"]',n=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};n.prototype={constructor:n,toggle:function(t){var n=e(this),i,s,o;if(n.is(".disabled, :disabled"))return;s=n.attr("data-target");if(!s){s=n.attr("href");s=s&&s.replace(/.*(?=#[^\s]*$)/,"")}i=e(s);i.length||(i=n.parent());o=i.hasClass("open");r();o||i.toggleClass("open");return!1}};e.fn.dropdown=function(t){return this.each(function(){var r=e(this),i=r.data("dropdown");i||r.data("dropdown",i=new n(this));typeof t=="string"&&i[t].call(r)})};e.fn.dropdown.Constructor=n;e(function(){e("html").on("click.dropdown.data-api",r);e("body").on("click.dropdown",".dropdown form",function(e){e.stopPropagation()}).on("click.dropdown.data-api",t,n.prototype.toggle)})}(window.jQuery);