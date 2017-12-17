import TokenStream from '/TokenStream';
import ArgumentConsumers from '/consumers/ArgumentConsumers';


export default function(definitions) {
    var consumers = ArgumentConsumers(definitions);

    function initializeResult() {
        var options = {};
        definitions.forEach(function(definition) {
            var name = definition.name;
            options[name] = definition.defaultValue;
        });

        return {
            args: [],
            requestHelp: false,
            options: options
        };
    }

    function processNextArgument(stream, result) {
        var currentArgument = stream.read();
        var consumer = consumers.find(currentArgument);
        consumer.process(stream, result);
    };

    var self = {};

    self.parse = function(argv) {
        var result = initializeResult();
        var stream = TokenStream(argv);
        while (!stream.isEmpty()) {
            processNextArgument(stream, result);
        }
        return result;
    }

    return self;
};
