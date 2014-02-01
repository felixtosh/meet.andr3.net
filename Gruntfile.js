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
                    "build/css/common.css",
                    "build/css/content.css",
                    "build/css/forms.css",
                    "build/css/icons.css",
                    "build/css/l-large.css",
                    "build/css/m-medium.css",
                    "build/css/s-small.css",
                    "build/css/typography.css",
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
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-responsive-videos');

    // Specify available cmds/tasks
    grunt.registerTask('dev', ['sass', 'concat', 'autoprefixer' ]);
    grunt.registerTask('default', ['sass', 'concat', 'autoprefixer', 'uglify', 'imagemin', ]);
};
