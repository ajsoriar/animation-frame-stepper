
'use strict';

module.exports = function(grunt) {

    var getDate = ( timestamp ) => {
        var dt = null, str;
        if (!timestamp) timestamp = Date.now();
        dt = new Date(timestamp);
        str = dt.getFullYear() + "-";
        if (dt.getMonth() < 9) str += "0";
        str += (dt.getMonth() + 1);
        str += "-";
        if(dt.getDate() < 10) str += "0";
        str += dt.getDate();
        return str;
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ['dist/*.*']
            }
        },

        copy: {
            build: {
                files: [{
                    cwd: 'src',
                    src: [
                        '*.js' //,
                        //'*.css'
                    ],
                    dest: 'dist',
                    expand: true
                }]
            }
        },

        uglify: {
            options: {
                report: 'min',
                preserveComments: 'some', // will preserve all comments that start with a bang (!) or include a closure compiler style directive (@preserve)
                mangle: false, // false to prevent changes to your variable and function names.
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'dist/animation-stepper.min.js': ['dist/animation-stepper.js']
                }
            }
        },
        concat: {
            dist: {
              src: ['src/header.txt', 'dist/animation-stepper.js'],
              dest: 'dist/animation-stepper.js',
            },
        },
        remove_comments: {
            js: {
                options: {
                    multiline: true,
                    singleline: true,
                    keepSpecialComments: false
                },
                cwd: 'dist',
                src: '*.js',
                expand: true,
                dest: 'dist'
            }
        },
        removelogging: {
            dist: {
              src: 'dist/animation-stepper.js',
              dest: 'dist/animation-stepper.js',
              options: {
                // see below for options. this is optional.
              }
            }
        },
        replace: {
            header: {
                options: {
                    patterns: [
                        {
                            json: {
                                "version-number": '<%= pkg.version %>',
                                "version-date": getDate( Date.now() ),
                            }
                        }
                    ]
                },
                files: [
                    {
                        src: ['dist/animation-stepper.js'],
                        dest: 'dist/animation-stepper.js'
                    }
                ]
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-remove-comments');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-remove-logging");
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask( 
        'build',
        'Compiles all of the assets and files to dist directory.',
        ['clean', 'copy', 'remove_comments:js', 'removelogging', 'concat', 'replace:header', 'uglify']
    );

};
