#!/bin/bash

# === micro-MVC - Awesome! ====
# A folder structure that assists web development by separating code from design which
# provides a concrete platform for front-end, back-end programmers and designers.
# Coded by George Delaportas (G0D)
# Copyright (C) 2020

rm -rf Awesome!
mkdir Awesome!
cd Awesome!
mkdir design
mkdir code
cd code
mkdir front-end
mkdir back-end
cd back-end
mkdir dispatching
cd ../../design
ln -s ../../framework/content content
ln -s ../../framework/templates templates
ln -s ../../site/css css
ln -s ../../site/pix pix
cd ../code/front-end
ln -s ../../../framework/config config
ln -s ../../../framework/content content
ln -s ../../../framework/errors error_pages
ln -s ../../../framework/logs logs
ln -s ../../../framework/templates templates
ln -s ../../../framework/mvc/views views
ln -s ../../../framework/extensions/js js-ext
ln -s ../../../site/sections sections
cd ../back-end
ln -s ../../../framework/config config
ln -s ../../../framework/logs logs
ln -s ../../../framework/mvc mvc
ln -s ../../../framework/extensions/php php-ext
cd dispatching
ln -s ../../../../framework/misc/dispatchers/conditions mvc
ln -s ../../../../framework/misc/dispatchers/gates ajax
