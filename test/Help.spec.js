import Help from '/Help';

describe('Help', function() {

    describe('buildMessage', function() {
        it('should not output the options when there are none', function() {
            var subject = Help([]);
            var message = subject.format('program');
            assert.equal('\n  Usage: program\n', message);
        });

        it('should output mandatory parameter when specified', function() {
            var subject = Help([], { mandatory: 'mandatory_parameter' });
            var message = subject.format('program');
            assert.equal('\n  Usage: program <mandatory_parameter>\n', message);
        });

        it('should not output any description when it is not specified', function() {
            var subject = Help([{
                delimiters: ['--flag']
            }]);
            var message = subject.format('program');
            assert.equal('\n  Usage: program [options]\n\n  Options:\n\n    --flag  \n', message);
        });

        it('should output the option name when it is of type string', function() {
            var subject = Help([{
                delimiters: ['--flag'],
                name: 'name',
                type: 'string'
            }]);
            var message = subject.format('program');
            assert.equal('\n  Usage: program [options]\n\n  Options:\n\n    --flag <name>  \n', message);
        });
    });
});
