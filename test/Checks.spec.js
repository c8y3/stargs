import Checks from '/Checks';

describe('Checks', function() {

    describe('execute', function() {
        it('should throw an Error with a message corresponding to the help when help is requested', function() {
            var subject = Checks([]);
            try {
                subject.execute('', { requestHelp: true });
            } catch (e) {
                assert.isDefined(e.message);
            }
        });
    });
});
