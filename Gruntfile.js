module.exports = function (grunt) {
    
    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concat opts
        concat: {
            dist: {
                src: [
                    "vendor/jquery2/jquery.js",
                    "vendor/sticky/jquery.sticky.js",
                    "vendor/jquery-waypoints/waypoints.js",
                    "assets/js/ControlledAnimation.js",
                    "assets/js/AsyncForm.js",
                    "assets/js/ReadingModes.js",
                    "assets/js/LazyLoadingContainer.js",
                    "assets/js/LazyLoadingImage.js",
                    "assets/js/smoothScrollTo.function.js",
                    "assets/js/meetandr3.js"
                ],
                dest: "build/js/production.js"
            },
            css: {
                src: [
                    "vendor/normalize-css/normalize.css",
                    "vendor/animate.css/animate.css",
                    "build/css/base.css",
                    "build/css/common.css",
                    "build/css/content.css",
                    "build/css/forms.css",
                    "build/css/icons.css",
                    "build/css/typography.css"
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
                src: "build/js/production.js",
                dest: "build/js/production.min.js"    
            }
        },

        // ImageMin
        imagemin: {
            dynamic: {                              // Another target
                files: [{
                    expand: true,                   // Enable dynamic expansion
                    cwd: 'assets/imgs/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],    // Actual patterns to match
                    dest: 'build/imgs/'        // Destination path prefix
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
                tasks: ["sass","autoprefixer","concat"],
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
                browsers: ['ff 3', 'android 3','last 3 version'],
                diff: 'build/autoprefixer.diff'
            },
            dist: {
                src: 'build/css/*.css'
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css/',
                ext: '.min.css'
            }
        },

        // Responsive videos
        responsive_videos: {
            dist:{
                options: {
                    sizes: [{
                        name: "small",
                        width: 320,
                        poster: true
                    },{
                        name: "large",
                        width: 1024,
                        poster: true
                    }],
                    encodes: [{
                        webm: [
                            {'-vcodec': 'libvpx'},
                            {'-acodec': 'libvorbis'},
                            {'-crf': '12'},
                            {'-q:a': '100'},
                            {'-threads': '0'}
                        ],
                        mp4: [
                            {'-vcodec':'libx264'},
                            {'-acodec': 'libfaac'},
                            {'-pix_fmt': 'yuv420p'},
                            {'-q:v': '4'},
                            {'-q:a': '100'},
                            {'-threads': '0'}
                        ],
                        ogv: [{
                            '-vcodec': 'libtheora'
                        }, {
                            '-acodec': 'libvorbis'
                        }, {
                            '-threads': '0'
                        }]
                    }]
                },
                files: [{
                    expand: true,
                    src: ['videos/**.{mov,mp4}'],
                    cwd: 'assets/',
                    dest: 'build/'
                }]
            }
        },
    });


    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-responsive-videos');

    // Specify available cmds/tasks
    grunt.registerTask('dev', ['sass', 'concat', 'autoprefixer' ]);
    grunt.registerTask('media', ['imagemin', 'responsive_videos' ]);
    grunt.registerTask('default', ['sass', 'concat', 'autoprefixer', 'cssmin', 'uglify', 'imagemin']);

};
