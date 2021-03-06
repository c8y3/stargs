# stargs

A small command line argument parser. The primary design goal of this library API is to be both:
* as simple as possible,
* and fully unit testable.

As a consequence, the `parse` operation provided by stargs is a pure function, which does not, for instance, do any of the following:
* reading of `process.argv`,
* output to the standard output,
* or call to `process.exit`.

I hope you like it. It was fun to code.


## Installation

```
$ npm install stargs
```

## Usage

Create a script `example` with the following content:

```js
#!/usr/bin/env node

const Stargs = require('stargs');

const parser = Stargs({
    description: 'A random program description!',
    args: 'input',
    options: {
        boolean: {
            description: 'a boolean flag'
        },
        string: {
            type: 'string',
            description: 'an string option'
        },
        short: {
            short: 's',
            description: 'an option with a short delimiter'
        }
    }
});

try {
    const result = parser.parse(process.argv);
    console.log(result);
} catch (e) {
    console.log(e.message);
}
```

Make this script executable:

```
$ chmod +x example
```

Then run it with some arguments:

```
$ ./example --boolean --string hello -s remaining arguments
```

It parses the command line and captures the argument values:

```js
{ boolean: true,
  string: 'hello',
  short: true,
  input: [ 'remaining', 'arguments' ] }
```

If no argument (or option `-h` or `--help`) is provided, it outputs the help message:
```

  Usage: example [options] <input>

  A random program description!


  Options:

    --boolean          a boolean flag
    --string <string>  an string option
    -s, --short        an option with a short delimiter
    -h, --help         output usage information

```


## License

stargs is licensed under the GPL-3.0 license.
