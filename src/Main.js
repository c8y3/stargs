import path from 'path';
import UserOptions from '/UserOptions';
import ArgumentParser from '/ArgumentParser';
import Checks from '/Checks';


export default function(options) {
    var userOptions = UserOptions(options);
    var definitions = userOptions.getOptionDefinitions();

    var parser = ArgumentParser(definitions);
    var checks = Checks(definitions, userOptions.getDescriptions());

    var self = {};

    self.parse = function(argv) {
        var programName = path.basename(argv[1]);
        var result = parser.parse(argv.slice(2));
        checks.execute(programName, result);
        var options = result.options;
        var mandatoryName = userOptions.getMandatoryName();
        if (mandatoryName !== undefined) {
            options[mandatoryName] = args;
        }
        return options;
    };

    return self;
};
