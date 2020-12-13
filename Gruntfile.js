module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "assets/css/style.min.css": "assets/css/custom.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['assets/css/**/custom.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        copy: {
            main: {
                expand: true,
                src: 'assets/**',
                dest: 'backup',
            },
        },
        autoprefixer:{
            dist:{
                files:{
                    'assets/css/style.min.css':'assets/css/style.min.css'
                }
            }
        },
        processhtml: {
            build: {
                files: {
                    'index.html' : ['index.html']
                }
            }
        },
        browserSync: {
            resource: {
                    files: {
                    src: ['assets/**/*.css', 'assets/**/*.js', '*.html']
                },
                    options: {
                    watchTask: true,
                    livereload: true,
                    server: './'
                }
            }
        },    
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer'); 
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-contrib-concat'); (It throws an error.)  
    // grunt.loadNpmTasks('grunt-contrib-clean'); (It throws an error.)
    grunt.registerTask('default', ['copy', 'less', 'browserSync', 'watch']);
};