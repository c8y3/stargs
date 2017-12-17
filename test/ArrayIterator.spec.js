import ArrayIterator from '/ArrayIterator';

describe('ArrayIterator', function() {

    describe('next', function() {
        it('should return the first element of the array', function() {
            var subject = ArrayIterator([1]);
            assert.equal(1, subject.next());
        });

        it('should return the second element on the second call', function() {
            var subject = ArrayIterator([1, 2]);
            subject.next();
            assert.equal(2, subject.next());
        });
    });

    describe('hasNext', function() {
        it('should return false on empty array', function() {
            var subject = ArrayIterator([]);
            assert.isFalse(subject.hasNext());
        });

        it('should return true on array with an element', function() {
            var subject = ArrayIterator([1]);
            assert.isTrue(subject.hasNext());
        });

        it('should return false after one call to next on array with an element', function() {
            var subject = ArrayIterator([1]);
            subject.next();
            assert.isFalse(subject.hasNext());
        });
    });
});
