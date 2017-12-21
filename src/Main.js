import path from 'path';
import UserConfiguration from '/UserConfiguration';
import ArgumentParser from '/ArgumentParser';
import Checks from '/Checks';


export default function(configuration) {
    var userConfiguration = UserConfiguration(configuration);
    var definitions = userConfiguration.getOptionDefinitions();

    var parser = ArgumentParser(definitions);
    var checks = Checks(definitions, userConfiguration.getDescriptions());

    var self = {};

    self.parse = function(argv) {
        var programName = path.basename(argv[1]);
        var result = parser.parse(argv.slice(2));
        checks.execute(programName, result);
        var options = result.options;
        var mandatoryName = userConfiguration.getMandatoryName();
        if (mandatoryName !== undefined) {
            options[mandatoryName] = result.args;
        }
        return options;
    };

    return self;
};
