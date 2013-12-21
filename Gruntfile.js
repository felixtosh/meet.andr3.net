module.exports = function (grunt) {
    
    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concat opts
        concat: {
            dist: {
                src: [
                    "vendor/modernizr/modernizr.js",
                    "vendor/jquery2/jquery.js",
                    "assets/js/*.js"
                ],
                dest: "build/production.js"
            },
            css: {
                src: [
                    "build/css/base.css",
                ],
                dest: "build/css/all.css"
            }
        },

        // Uglify
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */'
            },
            build: {
                src: "build/production.js",
                dest: "build/production.min.js"    
            }
        },

        // ImageMin
        imagemin: {
            dynamic: {                              // Another target
                files: [{
                    expand: true,                   // Enable dynamic expansion
                    cwd: 'assets/imgs/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],    // Actual patterns to match
                    dest: 'build/imgs/dist/'        // Destination path prefix
                }]
            }    
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ["assets/js/*.js"],
                tasks: ["concat", "uglify"],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ["assets/scss/*.scss"],
                tasks: ["sass"],
                options: {
                    spawn: false
                }
            }
        },

        // SASS
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [
                    {
                        expand: true,
                        cwd: "assets/scss/",
                        src: ["*.scss"],
                        dest: "build/css",
                        ext: ".css"
                    }
                ]
            }
        },

        // Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 3 version']
            },
            dist: {
                files: {
                    'build/css/all.prefixed.css': 'build/css/all.css'
                }
            }
        }
    });


    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Specify available cmds/tasks
    grunt.registerTask('dev', ['sass', 'concat', 'autoprefixer' ]);
    grunt.registerTask('default', ['sass', 'concat', 'autoprefixer', 'uglify', 'imagemin', ]);
};
