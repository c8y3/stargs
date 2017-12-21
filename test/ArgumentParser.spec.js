import ArgumentParser from '/ArgumentParser';

describe('ArgumentParser', function() {

    describe('parse', function() {
        it('should not return undefined when there is an argument', function() {
            var option = {name: 'flag', delimiters: ['-f'], type: 'boolean'};
            var subject = ArgumentParser([option]);
            var result = subject.parse(['-f']);
            assert.isTrue(result.options.flag);
        });

        it('should output remaining arguments in args', function() {
            var subject = ArgumentParser([]);
            var result = subject.parse(['mandatory']);
            assert.equal(result.args, 'mandatory');
        });

        it('should capture string parameter', function() {
            var option = {name: 'flag', delimiters: ['-f'], type: 'string'};
            var subject = ArgumentParser([option]);
            var result = subject.parse(['-f', 'value']);
            assert.equal(result.options.flag, 'value');
        });

        it('should not have key undefined in result when an argument with no name is defined', function() {
            var subject = ArgumentParser([{
                delimiters: ['-h'],
                type: 'help'
            }]);
            var result = subject.parse(['-h']);
            assert.isFalse(result.options.hasOwnProperty(undefined));
        });
    });
});
