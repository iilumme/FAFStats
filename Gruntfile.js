module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'app/assets/stylesheets/style.css' : 'app/assets/stylesheets/style.scss'
                }
            }
        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'app/assets/stylesheets/application.min.css': ['app/assets/stylesheets/application.css', 'app/assets/stylesheets/style.css']
            }
          }
        },
        watch: {
            sass: {
                files: 'app/assets/stylesheets/style.scss',
                tasks: ['sass']
            },
            css: {
                files: ['app/assets/stylesheets/application.css', 'app/assets/stylesheets/style.css'],
                tasks: ['cssmin']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
}
