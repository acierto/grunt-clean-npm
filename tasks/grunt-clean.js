/*
 * grunt-clean-npm
 * https://github.com/acierto/grunt-clean-npm
 *
 * Copyright (c) 2015 Bogdan Nechyporenko
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var sha1 = require('sha1');

    var originFile = 'package.json';
    var md5FileName = originFile + '.md5';
    var folderToRemove = 'node_modules';

    grunt.registerTask('clean-node-modules', 'Clean node modules.', function () {

        function execute(hash) {
            createUpdateMd5File(hash);
            removeNodeModules();
        }

        function removeNodeModules() {
            if (grunt.file.exists(folderToRemove)) {
                grunt.file.delete(folderToRemove);
            }
        }

        function getCurrentHash() {
            var json = grunt.file.readJSON(originFile);
            var devDependencies = JSON.stringify(json.devDependencies);
            var dependencies = JSON.stringify(json.dependencies);
            return sha1(devDependencies + dependencies);
        }

        function createUpdateMd5File(hash) {
            grunt.file.write(md5FileName, hash);
        }

        if (grunt.file.exists(md5FileName)) {
            var oldHash = grunt.file.read(md5FileName);
            var currentHash = getCurrentHash();
            if (oldHash !== currentHash) {
                execute(currentHash);
            }
        } else {
            execute(getCurrentHash());
        }

    });
};