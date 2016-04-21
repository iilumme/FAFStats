module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'app/assets/stylesheets/app.css' : 'app/assets/stylesheets/application.scss'
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
              'app/assets/stylesheets/app.min.css': 'app/assets/stylesheets/app.css'
            }
          }
        },
        watch: {
            sass: {
                files: ['app/assets/stylesheets/*.scss'],
                tasks: ['sass']
            },
            css: {
                files: 'app/assets/stylesheets/app.css',
                tasks: ['cssmin']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
}
