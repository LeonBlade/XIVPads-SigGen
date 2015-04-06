/*global module:false*/
module.exports = function(grunt) {

/*----------------------------------------------------
*      Project config
*----------------------------------------------------*/
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
        *      Styles
        *----------------------------------------------------*/

        /*----------------------------------------------------
        *      SASS compiler
        *----------------------------------------------------*/

        sass: {
            dist: {
                files: {
                    'web/css/styles.css': 'src/scss/style.scss'
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
                'web/css/styles.css': ['web/css/styles.css'],
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
                'web/css/styles.css': ['web/css/styles.css'],
            }
        },


        /*----------------------------------------------------
        *      Javascripts
        *----------------------------------------------------*/

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
                    'web/js/main.js': ['src/js/main.js'],
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
        *      HTML stuff
        *----------------------------------------------------*/

        /*----------------------------------------------------
        *      HTML5 lint
        *----------------------------------------------------*/

        lint5: {
            dirPath: "src/",
            defaults: {
                //"email": "a@a.com",
                //"username": "abcd"
            },
            templates: [
                "index.html"
            ],
            ignoreList: [
                "Bad value â€œX-UA-Compatibleâ€ for attribute â€œhttp-equivâ€ on element â€œmetaâ€.",
                //"another message"
                //"Bad value â€œâ€ for attribute â€œactionâ€ on element â€œformâ€: Must be non-empty.",
                //"Attribute â€œ[a-z1-9]+â€ not allowed on element â€œ[a-z1-9]+â€ at this point",
                //"You can just copy these straight from the error log"
            ]
        },

        /*----------------------------------------------------
        *      Minify HTML
        *----------------------------------------------------*/

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeRedundantAttributes: true
                },

                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },


        /*----------------------------------------------------
        *      Files, watching & FTP
        *----------------------------------------------------*/

        /*----------------------------------------------------
        *      Copy required files
        *----------------------------------------------------*/

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['img/**/*', 'font/*', 'js/lib/htc/*', 'css/*', '*.html'],
                    dest: 'dist/'
                }]
            }
        },

        /*----------------------------------------------------
        *      push changed files to FTP location
        *----------------------------------------------------*/

        ftpush: {
            build: {
                auth: {
                    host: '',
                    port: 21,
                    authKey: 'key1'
                },

                src: 'dist/',
                dest: '',
                exclusions: ['.DS_Store']
            }
        },

        /*----------------------------------------------------
        *      Watch task.
        *----------------------------------------------------*/

        watch: {
            scss: {
                files: [
                    'src/scss/*.scss',
                ],
                tasks: ['compilesass','prefixcss', 'minifycss']
            },

            js: {
                files: [
                    'src/js/main.js',
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

    grunt.loadNpmTasks('grunt-lint5');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ftpush');
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

    grunt.registerTask('linthtml', ['lint5']);
    grunt.registerTask('minifyhtml', ['htmlmin']);

    grunt.registerTask('files', ['copy']);
    grunt.registerTask('upload', ['ftpush']);
    grunt.registerTask('monitor', ['watch']);


    grunt.registerTask('default', ['compilesass','prefixcss','minifycss','lintjs','combine','monitor']);
    grunt.registerTask('dist', ['compilesass','prefixcss','minifycss','lintjs','combine']);
};