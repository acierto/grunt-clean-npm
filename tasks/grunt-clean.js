/*
 * grunt-clean-npm
 * https://github.com/acierto/grunt-clean-npm
 *
 * Copyright (c) 2015 Bogdan Nechyporenko
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path');
    var sha1 = require('sha1');

    var originFile = 'package.json';
    var nodeModules = 'node_modules';
    var md5FileName = path.join(nodeModules, originFile + '.md5');

    function getCurrentHash() {
        var json = grunt.file.readJSON(originFile);
        var devDependencies = JSON.stringify(json.devDependencies);
        var dependencies = JSON.stringify(json.dependencies);
        return sha1(devDependencies + dependencies);
    }

    function isNoHashOrModified() {
        if (!grunt.file.exists(md5FileName)) {
            return true;
        }

        return grunt.file.read(md5FileName) !== getCurrentHash();
    }

    grunt.registerTask('generate-hash', 'Generate a hash code based on dependencies.', function () {
        if (isNoHashOrModified()) {
            grunt.file.write(md5FileName, getCurrentHash());
        }
    });

    grunt.registerTask('remove-node-modules', 'Clean node modules.', function () {

        function removeNodeModules() {
            if (grunt.file.exists(nodeModules)) {
                grunt.file.delete(nodeModules);
            }
        }

        if (isNoHashOrModified()) {
            removeNodeModules();
        }
    });
};