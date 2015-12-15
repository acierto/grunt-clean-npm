'use strict';

var grunt = require('grunt');
var path = require('path');

exports.clean_node_modules = {
    'clean-node-modules': function (test) {
        test.expect(2);

        var md5filePath = path.join('tmp', 'package.json.md5');
        var nodeModulesPath = path.join('tmp', 'node_modules');

        test.ok(grunt.file.exists(md5filePath), 'md5 is not created');
        test.ok(!grunt.file.exists(nodeModulesPath), 'node_modules is not removed');

        test.done();
    }
};