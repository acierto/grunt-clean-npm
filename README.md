# grunt-clean-npm

Cleans node_module for the local project when there was any changes in package.json dependencies or devDependencies. As npm has 
issues with resolving dependencies when you already downloaded some old versions, it is better to remove node_modules.
But to do it each time is not a solution, as to download all of your dependencies when you have a few of them could take a time,
so better to be a bit smarter and do it only when you really need it.

## Setup
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) 
guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. 
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-clean-npm --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-clean-npm');
```

## Using grunt-clean-npm

```shell
grunt grunt-clean-npm
```

# How it works

Module checks whether the dependencies or devDependencies in *package.json* are changed, and if so removes *node_modules* folder. 