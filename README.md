<a href="http://groundwork.sidereel.com" target="_blank">
  <img
  src="http://groundwork.sidereel.com/images/groundwork-logo_128x128.png"
  alt="GroundworkCSS">
</a>

GroundworkCSS Beta v1.5
=======================

Say hello to responsive design made easy.

[http://groundwork.sidereel.com](http://groundwork.sidereel.com)

[GroundworkCSS](http://groundwork.sidereel.com) is a fully responsive HTML5, CSS 
and Javascript toolkit created by [@ghepting](http://twitter.com/ghepting).

Using GroundworkCSS, you can rapidly prototype and build accessible web apps that 
work on virtually any device. Key features that make GroundworkCSS stand out are:

* nestable, fractions-based, fluid grid system
* works on virtually anything: mobile, tablet, or large screen devices
* built with modular SCSS and JS components
* easy to customize
* responsive text
* unique approach to responsive tables
* supports purely semantic implementations by utilizing Sass @extend, @mixin and 
  %placeholder classes

Getting Started with GroundworkCSS
==================================

Default Build
-------------

The easiest way to incorporate GroundworkCSS into your project is to copy the
pre-compiled CSS and JS files into your project, and then refer to them in
markup. The 2 most important files are:

* css/groundwork.css
* js/groundwork.all.js

In addition, these support files may be used:

* css/groundwork-ie.css (IE Compatibility)
* js/libs/html5shiv.min.js (IE Compatibility)
* css/font-awesome-ie7.min.css (IE Compatibility)
* js/plugins/jquery.cycle2.js (Required for Cycle2)

All in all, you may end up with markup that looks like the following:

**At the top of your HTML document (within the head section)**

    <link type="text/css" rel="stylesheet" href="/css/groundwork.css">
    <!--[if IE]><link type="text/css" rel="stylesheet" href="/css/groundwork-ie.css"><![endif]-->
    <!--[if lt IE 9]><script type="text/javascript" src="/js/libs/html5shiv.min.js"></script><![endif]-->
    <!--[if IE 7]><link type="text/css" rel="stylesheet" href="/css/font-awesome-ie7.min.css"><![endif]-->

**At the bottom of your HTML document (just before your closing body tag)**

    <script type="text/javascript" src="/js/plugins/jquery.cycle2.js"></script>
    <script type="text/javascript" src="/js/groundwork.all.js"></script>

Custom Build
------------

If you use SCSS and you want to compile your own build of groundwork you can do
so (good if you need lean CSS output for your site).

SCSS source files are located in **src/scss**. Important files to edit are:

* groundwork.scss: dictates which modules are imported for compilation
(delete/comment out unneeded modules).
* _variables.scss: initial settings for GroundworkCSS, including whether to
generate grid/helper classes or not.

You can then output your own groundwork.css, or import groundwork.scss as part
of your project's SCSS. The latter lets you utilise GroundworkCSS's library
through ```@include``` or ```@extend``` for your custom classes.