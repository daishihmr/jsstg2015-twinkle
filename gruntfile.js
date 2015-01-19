var BANNER = ["/*\n",
    " * <%= pkg.name %> v<%= pkg.version %>\n",
    " * http://www.dev7.jp\n",
    " * \n",
    " * The MIT License (MIT)\n",
    " * Copyright © 2015 daishi_hmr, dev7.jp\n",
    " * \n",
    " * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and\n",
    " * associated documentation files (the “Software”), to deal in the Software without restriction, including\n",
    " * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies\n",
    " * of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following\n",
    " * conditions:\n",
    " * \n",
    " * The above copyright notice and this permission notice shall be included in all copies or substantial portions\n",
    " * of the Software.\n",
    " * \n",
    " * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n",
    " * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n",
    " * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n",
    " * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n",
    " * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n",
    " * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n",
    " * THE SOFTWARE.\n",
    " */\n"
].join("");

var THREEJS_ADDINS = require("./threejsaddins.js");

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-koko');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: ["build", "libs"],
        copy: {
            main: {
                files: [{
                    src: ["tmlib.js/build/tmlib.js"],
                    dest: "libs/tmlib.js"
                }, {
                    src: ["bulletml.js/build/bulletml.js"],
                    dest: "libs/bulletml.js"
                }, {
                    src: ["bulletml.js/build/plugins/tmlib.bulletml.js"],
                    dest: "libs/tmlib.bulletml.js"
                }, ],
            },
        },
        concat: {
            threejsaddins: {
                files: {
                    "libs/three.js": ["three.js/build/three.js"].concat(THREEJS_ADDINS),
                },
            },
        },
        uglify: {
            dist: {
                options: {
                    banner: BANNER,
                    sourceMap: false,
                },
                files: {
                    "build/twinkle.min.js": ["build/twinkle.js"],
                },
            },
        },
        nodewebkit: {
            main: {
                options: {
                    version: "0.11.5",
                    platforms: ["win", "osx"],
                },
                src: [
                    "fonts/**",
                    "images/**",
                    "sounds/**",
                    "index.html",
                    "build/twinkle.min.js",
                    "package.json",
                    "README.md",
                ],
            },
            dev: {
                options: {
                    version: "0.11.5",
                    platforms: ["win", "osx"],
                },
                src: [
                    "fonts/**",
                    "images/**",
                    "sounds/**",
                    "dev.html",
                    "build/twinkle.js",
                    "package.json",
                    "README.md",
                ],
            },
        },
        koko: {
            main: {
                openPath: "/index.html",
                staticPort: "54345",
            },
            dev: {
                openPath: "/dev.html",
                staticPort: "54345",
            },
        },
        browserify: {
            main: {
                files: {
                    "build/twinkle.js": ["scripts/main.js"],
                },
            },
            options: {
                browserifyOptions: {
                    debug: true,
                },
            },
        },
        watch: {
            scripts: {
                files: ["scripts/**/*.js"],
                tasks: ["browserify"]
            }
        },
    });

    grunt.registerTask("web", ["clean", "copy", "concat:threejsaddins", "browserify", "uglify", "koko:dev"]);
    grunt.registerTask("default", ["clean", "copy", "concat:threejsaddins", "browserify", "uglify", "nodewebkit:main"]);

};
