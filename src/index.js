import objectAssign from 'object-assign';
import glob from 'glob';
import {union} from 'lodash';

class WebpackDynamicsPlugin {
    constructor(options = {}) {
        let defaultOptions = {
            connectionString: null,
            solutionName: ''
        };

        let mergedOptions = objectAssign({}, options);
        mergedOptions.dynamics = objectAssign({}, defaultOptions, options.dynamics);
        mergedOptions.files = options.files || [];

        this.options = mergedOptions;

        if (!this.options.dynamics.connectionString) {
            throw new Error('dynamics.connectionString is required');
        }
    }

    apply(compiler) {
        compiler.plugin('after-emit', this.uploadFiles.bind(this));
    }

    uploadFiles(compilation, done) {
        let files = this.__globFiles();
        if (!files.length)
            throw new Error('No files were matched');

        let tmpDir = this.__copyFilesToTmp(files);
        try {
            this.__sendToDynamics(tmpDir, done);
        }
        finally {
            //TODO clean up temp dir
        }
    }

    __globFiles() {
        return this.options.files.map((f) => {
            return glob.sync(f, {});
        }).reduce((currentList, nextList) => {
            return union(currentList, nextList);
        }, []);
    }

    __copyFilesToTmp(files) {

    }

    __sendToDynamics(files, done) {

    }
}

module.exports = WebpackDynamicsPlugin;