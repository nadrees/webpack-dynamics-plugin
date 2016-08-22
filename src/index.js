import objectAssign from 'object-assign';

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

    uploadFiles() {

    }
}

module.exports = WebpackDynamicsPlugin;