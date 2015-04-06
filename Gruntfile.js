module.exports = function(grunt) {
    grunt.initConfig({
        /*----------------------------------------------------
        *      Metadata
        *----------------------------------------------------*/
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
                ' * Web: <%= pkg.author.homepage %>\n' +
                ' * Twitter: <%= pkg.author.twitter %>\n' +
                ' * Lead dev: <%= pkg.author.dev %>\n' +
                ' * Lead design: <%= pkg.author.design %>\n' +
                ' * Project management: <%= pkg.author.management %>\n' +
                ' */',

        /*----------------------------------------------------
        *      SASS compiler
        *----------------------------------------------------*/

        sass: {
            dist: {
                files: {
                    'web/css/main.css': 'src/scss/main.scss'
                }
            }
        },

        /*----------------------------------------------------
        *      Lint SCSS
        *----------------------------------------------------*/

        scsslint: {
            allFiles: [
                'src/scss/*.scss',
            ],
            options: {
                config: 'scss-lint-config.yml',
                reporterOutput: 'scss-lint-report.xml'
            },
        },

        /*----------------------------------------------------
        *      Autoprefixer
        *----------------------------------------------------*/

        autoprefixer: {
            files: {
                'web/css/main.css': ['web/css/main.css'],
            }
        },

        /*----------------------------------------------------
        *      Minify CSS files
        *----------------------------------------------------*/

        cssmin: {
            options: {
                stripBanners: true
            },

            files: {
                'web/css/main.css': ['web/css/main.css'],
            }
        },

        /*----------------------------------------------------
        *      JSHint
        *----------------------------------------------------*/

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            }
        },

        /*----------------------------------------------------
        *      Concatenate
        *----------------------------------------------------*/

        concat: {
            basic_and_extras: {
                files: {
                    'web/js/main.js':
                    [
                        'src/js/main.js',
                        'src/js/general.js',
                        'src/js/buttons.js',
                        'src/js/editor.js',
                    ],
                }
            }
        },

        /*----------------------------------------------------
        *      uglify javascripts
        *----------------------------------------------------*/

        uglify: {
            my_target: {
                files: {
                    'web/js/main.js': ['web/js/main.js'],
                }
            }
        },

        /*----------------------------------------------------
        *      Watch task.
        *----------------------------------------------------*/

        watch: {
            scss: {
                files: [
                    'src/scss/*.scss',
                    'src/scss/helpers/*.scss',
                    'src/scss/styles/*.scss',
                ],
                tasks: ['compilesass','prefixcss', 'minifycss']
            },

            js: {
                files: [
                    'src/js/*.js',
                ],
                tasks: ['lintjs','combine']
            },
        }
    });



    /*----------------------------------------------------
    *      load node modules
    *----------------------------------------------------*/

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');

    /*----------------------------------------------------
    *      register tasks for grunt usage
    *----------------------------------------------------*/

    grunt.registerTask('compilesass', ['sass']);
    grunt.registerTask('lintsass', ['scsslint']);
    grunt.registerTask('prefixcss', ['autoprefixer']);
    grunt.registerTask('minifycss', ['cssmin']);

    grunt.registerTask('lintjs', ['jshint']);
    grunt.registerTask('combine', ['concat']);
    grunt.registerTask('uglifyjs', ['uglify']);

    grunt.registerTask('monitor', ['watch']);

    grunt.registerTask('default', ['compilesass','prefixcss','minifycss','lintjs','combine','monitor']);
    grunt.registerTask('dist', ['compilesass','prefixcss','minifycss','lintjs','combine']);
};