const HELP_OPTION_DEFINITION = {
    delimiters: ['-h', '--help'],
    type: 'help',
    description: 'output usage information'
};

function buildDelimiters(name, options) {
    var delimiters = [];
    var shortDelimiter = options.short;
    if (shortDelimiter !== undefined) {
        delimiters.push('-' + shortDelimiter);
    }
    delimiters.push('--' + name);
    return delimiters;
}

export default function(configuration) {
    if (configuration === undefined) {
        configuration = {};
    }

    var definitions = configuration.options;
    var mandatory = configuration.mandatory;
    if (mandatory === undefined) {
        mandatory = {};
    }

    var self = {};

    self.getOptionDefinitions = function() {
        if (definitions === undefined) {
            definitions = {};
        }
        var optionNames = Object.keys(definitions);
        var result = optionNames.map(function(name) {
            var definition = definitions[name];
            var delimiters = buildDelimiters(name, definition);
            var type = definition.type;
            if (type === undefined) {
                type = 'boolean';
            }
            var defaultValue;
            if (type === 'boolean') {
                defaultValue = false;
            }
            return {
                name: name,
                delimiters: delimiters,
                type: type,
                defaultValue: defaultValue,
                description: definition.description
            };
        });
        result.push(HELP_OPTION_DEFINITION);
        return result;
    };

    self.getDescriptions = function() {
        return {
            program: configuration.description,
            mandatory: mandatory.description
        };
    };

    self.getMandatoryName = function() {
        return mandatory.name;
    };

    return self;
};
