import rootImport from 'rollup-plugin-root-import';
import path from 'path';
import configuration from './package.json';

export default {
    input: 'src/Main.js',
    plugins: [
		rootImport({
		    root: path.join(__dirname, '/src'),
		    extensions: '.js'
		})
    ],
    output: [
        { file: configuration.main, format: 'cjs' },
        { file: configuration.module, format: 'es' }
    ]
};
