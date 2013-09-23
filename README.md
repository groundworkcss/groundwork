![Groundwork Logo](https://0.gravatar.com/avatar/c8ae740c0b5f7dd913308974a07ee02c?s=150)

GroundworkCSS 2.0.1
====

Say hello to responsive design made easy.

[http://groundwork.sidereel.com](http://groundwork.sidereel.com)

[GroundworkCSS](http://groundwork.sidereel.com) is a fully responsive HTML5, CSS 
and Javascript toolkit created by [@ghepting](http://twitter.com/ghepting).

Using GroundworkCSS, you can rapidly prototype and create accessible web apps that 
work on virtually any device. Key features that make GroundworkCSS stand out are:

* nestable, fractional, responsive, adaptive, fluid grid system
* works on virtually anything: mobile, tablet, or large screen devices
* built with modular SCSS and JS components
* easy to customize
* highly configurable
* supports purely semantic implementations by utilizing Sass @extend, @mixin and 
  %placeholder classes
* built-in ARIA role support
* responsive text and tables
* and much more

Getting Started using GroundworkCSS
====

Default Build
----

The easiest way to incorporate GroundworkCSS into your project is to copy the
pre-compiled CSS and JS files into your project, and then refer to them in
markup. The 2 most important files are:

* css/groundwork.css
* js/groundwork.all.js (requires jQuery & modernizr)

In addition, these support files may be used:

* js/libs/jquery-1.10.2.min.js
* js/libs/modernizr-2.6.2.min.js
* css/groundwork-ie.css (IE Compatibility)

All in all, you may end up with markup that looks like the following:

**At the top of your HTML document (within the head section)**

    <script type="text/javascript" src="/js/libs/modernizr-2.6.2.min.js"></script>
    <link type="text/css" rel="stylesheet" href="/css/groundwork.css">
    <!--[if IE]><link type="text/css" rel="stylesheet" href="/css/groundwork-ie.css"><![endif]-->

**At the bottom of your HTML document (just before your closing body tag)**

    <script type="text/javascript" src="/js/libs/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/js/groundwork.all.js"></script>


Custom Build
----

If you use SCSS and you want to compile your own build of Groundwork or 
integrate it along with your project code.

SCSS source files are located in **src/scss** and **src/coffee**.

Important files to edit are:

* groundwork.scss: dictates which modules are imported for compilation
(delete/comment out unneeded modules).
* _settings.scss: initial settings for Groundwork, including customizable 
colors, options to turn off rapid prototyping classes and much more.

You can then output your own groundwork[.css/.js], or import groundwork.scss 
as part of your project's SCSS. The latter lets you utilise GroundworkCSS's 
library through ```@include``` or ```@extend``` for your custom classes.


Ruby on Rails
----

If you're using Groundwork in a Ruby on Rails project, definitely use the 
[groundworkcss-rails gem](http://github.com/groundworkcss/groundworkcss-rails)


Want to develop on and contribute to GroundworkCSS?
----
Read [Contributing to Groundwork](https://github.com/groundworkcss/groundwork/wiki/Contributing-to-Groundwork) and fork away!  :)
