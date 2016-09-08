module.exports = function(grunt) {
	grunt.initConfig({
		htmllint:{
			files: ["src/*.html"],
			ifTrue: [ 'copy' ],
		},
		csslint: {
			strict: {
				options: {
					import:2
				},
				src: ['src/assets/css/*.css']
			},
			lax: {
				options: {
					import: false
				},
				src: ['src/assets/css/*.css']
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src/assets/', src: ['**'], dest: 'Assignment/Homework_1 - HTML/assets/'},
					{expand: true, cwd: 'src/', src: ['*.html',], dest: 'Assignment/Homework_1 - HTML/'},
				],
			},
		},
		watch:{
			html: {
				files: ['<%= htmllint.files %>'],
				tasks: ['html']
			},
			css: {
				files: ['<%= csslint.strict.src %>'],
				tasks: ['css']
			}
		}
	});
	// project configuration.
 	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['htmllint', 'csslint', 'copy']);
	grunt.registerTask('html',['htmllint', 'copy']);
	grunt.registerTask('css', ['csslint', 'copy']);
}
