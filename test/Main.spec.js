import Main from '/Main';

// TODO should allow a missing description
// TODO should allow a missing mandatory option
// TODO should allow a missing options
describe('Main', function() {

    it('should accept no parameters', function() {
        Main();
    });

    describe('parse', function() {
        it('should handle options which are boolean flags', function() {
            var subject = Main({
                options: {
                    flag: {
                        long: 'flag',
                        type: 'boolean'
                    }
                }
            });
            var result = subject.parse(['', '', '--flag', 'mandatory']);
            assert.isTrue(result.flag);
        });

        it('should consider options to be boolean flags by default', function() {
            var subject = Main({
                options: {
                    flag: {
                        long: 'flag'
                    }
                }
            });
            var result = subject.parse(['', '', '--flag', 'mandatory']);
            assert.isTrue(result.flag);
        });

        it('should use the option name, if option long is not present', function() {
            var subject = Main({
                options: {
                    flag: {}
                }
            });
            var result = subject.parse(['', '', '--flag', 'mandatory']);
            assert.isTrue(result.flag);
        });

        it('should accept a short name', function() {
            var subject = Main({
                options: {
                    flag: {
                        short: 'f'
                    }
                }
            });
            var result = subject.parse(['', '', '-f', 'mandatory']);
            assert.isTrue(result.flag);
        });

        it('should not accept -undefined as short name when short option is absent', function() {
            var subject = Main({
                options: {
                    flag: {}
                }
            });
            var result = subject.parse(['', '', '-undefined', 'mandatory']);
            assert.isFalse(result.flag);
        });

        it('should throw an error with the help message when parsing flag --help', function() {
            var subject = Main();
            assert.throws(function() {
                subject.parse(['', 'programName', '--help']);
            }, '\n  Usage: programName [options]\n\n  Options:\n\n    -h, --help  output usage information');
        });

        it('should include the mandatory parameter in the usage', function() {
            var subject = Main({
                mandatory: {
                    name: 'mandatory',
                    description: 'description'
                }
            });
            assert.throws(function() {
                subject.parse(['', 'programName', '--help']);
            }, '\n  Usage: programName [options] <description>\n\n  Options:\n\n    -h, --help  output usage information');
        });

        it('should present the short name of a parameter first', function() {
            var subject = Main({
                options: {
                    flag: {
                        short: 'f'
                    }
                }
            });
            assert.throws(function() {
                subject.parse(['', 'programName', '--help']);
            }, '\n  Usage: programName [options]\n\n  Options:\n\n    -f, --flag  \n    -h, --help  output usage information');
        });

        it('should accept an argument with name help', function() {
            var subject = Main({
                options: {
                    help: {
                        short: 'f'
                    }
                }
            });
            var result = subject.parse(['', '', '-f', 'mandatory']);
            assert.isTrue(result.help);
        });

        it('should put the description in help', function() {
            var subject = Main({
                description: 'description'
            });
            assert.throws(function() {
                subject.parse(['', 'programName', '--help']);
            }, '\n  Usage: programName [options]\n\n  description\n\n\n  Options:\n\n    -h, --help  output usage information');
        });

        it('should put the name of a string option in help', function() {
            var subject = Main({
                options: {
                    flag: {
                        type: 'string'
                    }
                }
            });
            assert.throws(function() {
                subject.parse(['', 'programName', '--help']);
            }, '\n  Usage: programName [options]\n\n  Options:\n\n    --flag <flag>  \n    -h, --help     output usage information');
        });

        it('should set absent flags to false', function() {
            var subject = Main({
                options: {
                    flag: {}
                }
            });
            var result = subject.parse(['', '', 'mandatory']);
            assert.isFalse(result.flag);
        });

        it('should not return leftovers of previous run', function() {
            var subject = Main({
                options: {
                    flag: {}
                }
            });
            subject.parse(['', '', '--flag', 'mandatory']);
            var result = subject.parse(['', '', 'mandatory']);
            assert.isFalse(result.flag);
        });

        it('should compute the program name from the argument line', function() {
            var subject = Main();
            assert.throws(function() {
                subject.parse(['', '/some/directory/programName.ext', '--help']);
            }, '\n  Usage: programName.ext [options]\n\n  Options:\n\n    -h, --help  output usage information');
        });

        it('should not fail when there is a configuration for mandatory arguments', function() {
            var subject = Main({
                mandatory: {
                    name: 'paths'
                }
            });
            var result = subject.parse(['', '', 'inputFile']);
            assert.equal(result.paths, 'inputFile');
        });
    });
});
