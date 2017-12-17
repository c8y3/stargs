import UserOptions from '/UserOptions';

describe('UserOptions', function() {

    describe('getOptionDefinitions', function() {
        it('should return the options definitions with help', function() {
            var subject = UserOptions({});
            var definitions = subject.getOptionDefinitions();
            assert.deepEqual([{
                delimiters: ['-h', '--help'],
                description: 'output usage information',
                type: 'help'
            }], definitions);
        });

        it('should return the description in help', function() {
            var subject = UserOptions({
                options: {
                    flag: {
                        description: 'description'
                    }
                }
            });
            var definitions = subject.getOptionDefinitions();
            assert.equal('description', definitions[0].description);
        });

        it('should return the delimiters in help', function() {
            var subject = UserOptions({
                options: {
                    flag: {}
                }
            });
            var definitions = subject.getOptionDefinitions();
            assert.equal('--flag', definitions[0].delimiters[0]);
        });

        it('should set the name in help when the option is of type string', function() {
            var subject = UserOptions({
                options: {
                    flag: {
                        type: 'string'
                    }
                }
            });
            var definitions = subject.getOptionDefinitions();
            assert.equal('flag', definitions[0].name);
        });

        it('should set the default to false for boolean flags', function() {
            var subject = UserOptions({
                options: {
                    flag: {}
                }
            });
            var definitions = subject.getOptionDefinitions();
            assert.isFalse(definitions[0].defaultValue);
        });
    });
});
