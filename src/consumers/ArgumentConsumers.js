import StringParser from '/parsers/StringParser';
import BooleanParser from '/parsers/BooleanParser';
import HelpArgumentConsumer from '/consumers/HelpArgumentConsumer';
import OptionalArgumentConsumer from '/consumers/OptionalArgumentConsumer';
import MandatoryArgumentConsumer from '/consumers/MandatoryArgumentConsumer';


export default function(definitions) {
    var parsers = {
        string: StringParser(),
        boolean: BooleanParser()
    };

    var mandatoryArgumentConsumer = MandatoryArgumentConsumer();

    var optionConsumers = {};

    function registerOptionConsumers(delimiters, consumer) {
        delimiters.forEach(function(delimiter) {
            optionConsumers[delimiter] = consumer;
        });
    }

    function createOptionConsumer(definition) {
        if (definition.type === 'help') {
            return HelpArgumentConsumer();
        }
        var parser = parsers[definition.type];
        return OptionalArgumentConsumer(definition.name, parser);        
    }

    definitions.forEach(function(definition) {
        var consumer = createOptionConsumer(definition);
        registerOptionConsumers(definition.delimiters, consumer);
    });

    var self = {};

    self.find = function(argument) {
        var consumer = optionConsumers[argument];
        if (consumer === undefined) {
            consumer = mandatoryArgumentConsumer;
        }
        return consumer;
    }

    return self;
};
