import ArrayIterator from '/ArrayIterator';

export default function(argv) {
    var args = ArrayIterator(argv);
    var currentToken;

    var self = {};

    self.read = function() {
        currentToken = args.next();
        return currentToken;
    };

    self.getCurrent = function() {
        return currentToken;
    };

    self.isEmpty = function() {
        return !args.hasNext();
    };

    return self;
};
