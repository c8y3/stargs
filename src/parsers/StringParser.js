export default function() {
    var self = {};

    self.parse = function(stream) {
        return stream.read();
    };

    return self;
};
