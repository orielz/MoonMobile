module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        clean: {
            pre: ['build/**/*', '.tmp/**/*'],
            post: ['.tmp/concat', 'template.js']
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/src/app.html': 'build/src/app.html'
                }
            }
        },

        //replace: {
        //    package: {
        //        src: 'package.json',
        //        dest: 'package.json',
        //        replacements: [{
        //            from: /\"version\": \"([\d\.]+)\"/g,
        //            to: function (matchedWord, index, fullText, regexMatches) {   // callback replacement
        //                return '"version": "' + (parseFloat(regexMatches) + 0.1).toFixed(1) + '"';
        //            }
        //        }]
        //    },
        //    index: {
        //        src: 'staged/src/app.html',
        //        dest: 'staged/src/app.html',
        //        replacements: [{
        //            from: '../bower_components/',
        //            to: 'bower_components/'
        //        }]
        //    }
        //},

        copy: {
            temp2build: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp',
                        src: ['**/*'],
                        dest: 'build/src'
                    }
                ]
            },
            app2build: {
                files: [
                    {
                        expand: true,
                        cwd: '',
                        src: ['node_modules/**'],
                        dest: 'build/'
                    }
                ]
            },
            app2temp: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['app.html'],
                        dest: '.tmp'
                    }
                ]
            }
        },

        useminPrepare: {
            html: ['src/app.html'],
            options: {
                dest: '.tmp'
            }
        },

        usemin: {
            html: ['.tmp/app.html']
        },

        ngtemplates:  {
            app:        {
                cwd:      'src',
                src:      ['states/**/*.html', 'components/**/*.html'],
                dest:     'template.js',
                options:  {
                    module: 'tradency.mobile',
                    usemin: 'js/app.js' // <~~ This came from the <!-- build:js --> block
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', [
        'clean:pre',
        'useminPrepare',
        'ngtemplates',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'clean:post',
        'copy:app2temp',
        'usemin',
        'copy:temp2build',
        'copy:app2build',
        'htmlmin'
    ]);

    grunt.registerTask('install', [
        'clean:installSrc',
        'copy:staged2install'
    ]);

    grunt.registerTask('deploy', [
        //'copy:staged2dropbox'
        //'ftp-deploy'
    ]);

};