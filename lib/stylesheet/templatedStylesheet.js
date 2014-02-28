'use strict';

var path = require('path'),
    fs = require('fs'),
    utils = require('../utils/stylesheet'),
    _ = require('underscore');

module.exports = function getTemplatedStylesheet(name) {
    var template = _.template(fs.readFileSync(path.join(__dirname, '/templates/', name + '.tpl')).toString());

    return function generateSpritesheet(layout, filePath, spritePath, options, callback) {
        var scaledLayout,
            defaults = {
                prefix: '',
                sufix: '',
                nameMapping: utils.nameToClass,
                spritePath: utils.getRelativeSpriteDir(spritePath, filePath),
                pixelRatio: 1,
                includeUrl: true,
                appendToFile: false
            };

        options = _.extend({}, defaults, options);

        scaledLayout = utils.getScaledLayoutForPixelRatio(layout, options.pixelRatio);

        scaledLayout.images = scaledLayout.images.map(function (image) {
            image.ignore = false;
            var imageName = options.nameMapping(image.path),
            className,
            re;

            if (options.pixelRatio === 2 && imageName.indexOf('@2x') === -1) {
                image.ignore = true;
            }
            if (options.pixelRatio === 1 && imageName.indexOf('@2x') !== -1) {
                image.ignore = true;
            }
            if (options.pixelRatio === 2 && imageName.indexOf('@2x') !== -1) {
                re = /@2x$/;
                imageName = imageName.replace(re, '');
            }

            className = utils.prefixString(imageName, options);
            return _.extend(image, { className: className });

        });

        console.log(options.appendToFile);
        if (options.appendToFile) {
            fs.appendFile(filePath, template({
                getCSSValue: utils.getCSSValue,
                spriteName: utils.prefixString('sprite', options),
                options: options,
                layout: scaledLayout
            }), callback);
        } else {
            fs.writeFile(filePath, template({
                getCSSValue: utils.getCSSValue,
                spriteName: utils.prefixString('sprite', options),
                options: options,
                layout: scaledLayout
            }), callback);
        }


    };
};
