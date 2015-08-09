/**
 * Created by lukedowell on 8/7/15.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'node_modules/',
                src: [
                    //Dat Jquery
                    'jquery/dist/jquery.min.js',
                    'jquery/dist/jquery.min.map',

                    //Bootstrap bill
                    'bootstrap/dist/css/bootstrap.min.css',
                    'bootstrap/dist/css/bootstrap.css.map',

                    'bootstrap/dist/js/bootstrap.min.js'
                ],
                dest: 'server/public/vendors/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify', 'copy']);
};