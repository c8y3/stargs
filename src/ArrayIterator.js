export default function(array) {

    var index = 0;

    var self = {};

    self.next = function() {
        return array[index++];
    };

    self.hasNext = function() {
        return index < array.length;
    };

    return self;
};
