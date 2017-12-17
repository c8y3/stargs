import Help from '/Help';


export default function(definitions, descriptions) {
    var help = Help(definitions, descriptions);

    var self = {};

    self.execute = function(programName, result) {
        if (result.requestHelp) {
            throw help.format(programName);
        }
        var args = result.args;
        if (args.length === 0) {
            throw help.format(programName);
        }
   };

    return self;
};

