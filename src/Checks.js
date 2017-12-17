import Help from '/Help';


export default function(definitions, descriptions) {
    var help = Help(definitions, descriptions);

    function helpError(programName) {
        return new Error(help.format(programName));
    }

    var self = {};

    self.execute = function(programName, result) {
        if (result.requestHelp) {
            throw helpError(programName);
        }
        var args = result.args;
        if (args.length === 0) {
            throw helpError(programName);
        }
   };

    return self;
};

