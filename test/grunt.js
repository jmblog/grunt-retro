module.exports = function (grunt) {

  // Load in grunt-retro
  grunt.loadTasks('../tasks');

  // Project configuration.
  grunt.initConfig({
    'echo-src': {
      'actual/src_compact.txt': 'test_files/file.js',
      single: {
        src: 'test_files/file.js',
        dest: 'actual/src_single.txt'
      },
      multi: {
        src: ['test_files/file.js', 'test_files/file2.js'],
        dest: 'actual/src_multi.txt'
      },
      expansion: {
        src: ['test_files/{file,file2}.js'],
        dest: 'actual/src_expansion.txt'
      },
      uri: {
        src: ['http://google.com/'],
        dest: 'actual/src_uri.txt'
      }
    },
    'echo-dest': {
      'actual/compact_test.txt': 'actual/dest_compact.txt',
      simple: {
        src: 'actual/dest_simple.txt',
        dest: 'actual/simple_test.js'
      }
    },
    test: {
      all: '*_test.js'
    }
  });

  // Register task for testing src
  grunt.registerMultiTask('echo-src', 'Save src to dest file', function () {
    var file = this.file,
        src = file.src,
        dest = this.data.dest || this.target;
    grunt.file.write(dest, JSON.stringify(src));
  });

  // Register task for testing dest
  grunt.registerMultiTask('echo-dest', 'Save dest to src file', function () {
    var file = this.file,
        dest = file.dest,
        src = this.data.src || this.data;
    grunt.file.write(src, JSON.stringify(dest));
  });

  // Run project task then tests.
  grunt.registerTask('default', 'echo-src echo-dest test');
};