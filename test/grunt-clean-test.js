/*
 * grunt-clean-npm
 * https://github.com/acierto/grunt-clean-npm
 *
 * Copyright (c) 2015 Bogdan Nechyporenko
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var npm = require('npm');

    grunt.registerTask('clean-node-modules', 'Clean node modules.', function () {
        var modules = Array.prototype.slice.call(arguments);
        var done = this.async();

        function errorHandler(err) {
            if (err) {
                grunt.log.error(err);
            }
            done();
        }

        npm.load(function (err, npm) {
            if (err) {
                grunt.log.error(err);
                return;
            }

            npm.commands.install(modules, errorHandler);
        });
    });
};