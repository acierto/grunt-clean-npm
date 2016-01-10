/*
 * grunt-clean-npm
 * https://github.com/acierto/grunt-clean-npm
 *
 * Copyright (c) 2015 Bogdan Nechyporenko
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        clean: {
            tests: ['tmp']
        },
        nodeunit: {
            tests: ['test/*-test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('chdir', 'Change the cwd.', function (path) {
        console.log('*** Current: ', process.cwd(), ' *** Next: ', path);
        process.chdir(path);
    });

    grunt.registerTask('write', 'Write content to a file.', grunt.file.write);

    grunt.registerTask('mkdir', 'Create a directory.', function (path) {
        console.log('!!! mkdir', path);
        grunt.file.mkdir('tmp/node_modules');
    });

    grunt.registerTask('test', [
        'clean',
        'mkdir:tmp/node_modules',
        'write:tmp/node_modules/someLib.js:{}',
        'write:tmp/package.json:{ "name"\\: "for-test", "devDependencies"\\: { "adm-zip"\\: "0.4.7" } }',
        'chdir:tmp',
        'remove-node-modules',
        'generate-hash',
        'chdir:' + process.cwd().replace(/[A-Za-z]:\\/, '/'),
        'nodeunit',
        'clean'
    ]);

    grunt.registerTask('default', ['jshint', 'test']);

};