export default function() {
    var self = {};

    self.process = function(stream, result) {
        result.args = result.args.concat(stream.getCurrent());
    };

    return self;
};
