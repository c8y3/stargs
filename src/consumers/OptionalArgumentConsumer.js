export default function(name, parser) {
    var self = {};

    self.process = function(stream, result) {
        result.options[name] = parser.parse(stream);
    };

    return self;
};
