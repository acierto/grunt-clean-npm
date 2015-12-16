'use strict';

var grunt = require('grunt');
var path = require('path');

exports.clean_node_modules = {
    'clean-node-modules': function (test) {
        test.expect(2);

        var nodeModulesPath = path.join('tmp', 'node_modules');
        var md5filePath = path.join(nodeModulesPath, 'package.json.md5');
        var someLibPath = path.join(nodeModulesPath, 'someLib.js');

        test.ok(grunt.file.exists(md5filePath), 'md5 is not created');
        test.ok(!grunt.file.exists(someLibPath), 'libraries in node_modules are not removed');

        test.done();
    }
};