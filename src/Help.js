var TAB = '  ';
var SEPARATOR = ', ';

export default function(definitions, options) {
    if (options === undefined) {
        options = {};
    }

    function formatFlagsDescription(definition) {
        var flagDescription = TAB.repeat(2) + definition.delimiters.join(SEPARATOR);
        if (definition.type === 'string') {
            flagDescription += ' <' + definition.name + '>';
        }
        return flagDescription;
    }

    function computeDescriptionOffset() {
        var result = 0;
        definitions.forEach(function(definition) {
            var flagDescription = formatFlagsDescription(definition);
            var length = flagDescription.length;
            if (length > result) {
                result = length;
            }
        });
        return result;
    }

    function formatOptionHelp(descriptionOffset, definition) {
        var message = formatFlagsDescription(definition);
        message += ' '.repeat(descriptionOffset - message.length);
        var description = definition.description;
        if (description === undefined) {
            description = '';
        }
        return message + TAB + description;
    }

    function formatOptionsHelp() {
        var descriptionOffset = computeDescriptionOffset(definitions);
        var optionsHelpMessages = definitions.map(function(definition) {
            return formatOptionHelp(descriptionOffset, definition);
        });
        return TAB + 'Options:\n\n' + optionsHelpMessages.join('\n');
    }

    function formatUsageMessage(programName) {
        var result = TAB + 'Usage: ' + programName;
        if (definitions.length !== 0) {
            result +=  ' [options]';
        }
        var mandatoryDescription = options.mandatory;
        if (mandatoryDescription !== undefined) {
            result += ' <' + mandatoryDescription + '>';
        }
        return result;
    }

    function formatDescription(description) {
        return TAB + description + '\n';
    }

    var self = {};

    self.format = function(programName) {
        var sections = [];
        sections.push(formatUsageMessage(programName));
        var description = options.program;
        if (description !== undefined) {
            sections.push(formatDescription(description));
        }
        if (definitions.length !== 0) {
            sections.push(formatOptionsHelp());
        }
        var message = sections.join('\n\n');
        return '\n' + message + '\n';
    };

    return self;  
};
