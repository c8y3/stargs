export default function() {
    var self = {};

    self.process = function(_, result) {
        result.requestHelp = true;
    };

    return self;
}
