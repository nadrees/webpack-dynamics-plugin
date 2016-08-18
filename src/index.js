class WebpackDynamicsPlugin {
    constructor() {

    }

    apply(compiler) {
        compiler.plugin('after-emit', this.uploadFiles.bind(this));
    }

    uploadFiles() {

    }
}

module.exports = WebpackDynamicsPlugin;