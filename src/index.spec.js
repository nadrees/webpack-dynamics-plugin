import os from 'os';

import WebpackDynamicsPlugin from './index';
import {expect} from 'chai';
import sinon from 'sinon';

describe('The WebpackDynamicsPlugin', () => {
    let args = null;

    function createInstance() {
        return new WebpackDynamicsPlugin(args);
    }

    beforeEach(() => {
        args = {
            dynamics: {
                connectionString: 'test'
            },
            files: []
        };
    });

    describe('prototype', () => {
        it('should have an apply function', () => {
            expect(WebpackDynamicsPlugin.prototype.apply).to.not.be.null;
        });
    });

    describe('apply function', () => {
        it('should register the plugin on the ```after-emit``` step', () => {
            let compiler = {
                plugin: function () {}
            };
            sinon.spy(compiler, 'plugin');

            let plugin = createInstance();

            plugin.apply(compiler);

            expect(compiler.plugin.called).to.be.true;
            expect(compiler.plugin.callCount).to.equal(1);

            let args = compiler.plugin.lastCall.args;
            expect(args.length).to.equal(2);
            expect(args[0]).to.equal('after-emit');
            expect(args[1]).not.to.be.null;
        });
    });

    describe('constructor', () => {
        it('should handle the `dynamics` key missing', () => {
            delete args.dynamics;

            expect(createInstance).to.throw();
        });

        it('should validate that the connection string is required', () => {
            args.dynamics.connectionString = null;

            expect(createInstance).to.throw();
        });

        it('should default the solution name to empty string', () => {
            let plugin = createInstance();

            expect(plugin.options.dynamics.solutionName).to.eql('');
        });

        it('should not replace solution name if it was provided', () => {
            args.dynamics.solutionName = 'testSolutionName';

            let plugin = createInstance();

            expect(plugin.options.dynamics.solutionName).to.eql(args.dynamics.solutionName);
        });

        it('should default the files key to an empty array', () => {
            args.files = null;

            let plugin = createInstance();

            expect(plugin.options.files).to.eql([]);
        });

        it('should not override the files key if it was provided', () => {
            let plugin = createInstance();

            expect(plugin.options.files).to.eql(args.files);
        });
    });

    describe('uploadFiles function', () => {
        let plugin = null,
            stub = null;

        beforeEach(() => {
            args.files.push('test/*.js');

            plugin = createInstance();
            stub = sinon.stub(plugin, '__sendToDynamics');
        });

        it('should support an explicit file path', () => {
            plugin.options.files = ['test/test1.js'];

            plugin.uploadFiles();

            expect(stub.calledOnce).to.be.true;

            let args = stub.lastCall.args;
            expect(args.length).to.equal(2);
            expect(args[0].length).to.equal(1);
            expect(args[0][0]).to.equal('test/test1.js');
        });

        it('should support the glob format', () => {
            plugin.uploadFiles();

            expect(stub.calledOnce).to.be.true;

            let args = stub.lastCall.args;
            expect(args.length).to.equal(2);
            expect(args[0].length).to.equal(2);
        });

        it('should dedup files if matched multiple times', () => {
            plugin.options.files = ['test/test1.js', 'test/**/*.js'];

            plugin.uploadFiles();

            expect(stub.calledOnce).to.be.true;

            let args = stub.lastCall.args;
            expect(args.length).to.equal(2);
            expect(args[0].length).to.equal(2);
        });

        it('should require at least 1 file to be matched', () => {
            plugin.options.files = [];

            expect(() => plugin.uploadFiles()).to.throw();
        });

        it('should copy the matched files to a temp dir', () => {
            stub.restore();
            stub = sinon.stub(os, 'tmpdir');
        });

        describe('when calling ```wrp```', () => {
            it('should pass the correct arguments');

            it('should report an errors to ```console.error```');

            it('should delete the temp dir when done');
        });
    });

    // clean up the spies on console.* methods
    // to prevent any issues when running tests in 'watch' mode
    afterEach(() => {
        if(console.log.restore) {
            console.log.restore();
        }

        if (console.error.restore) {
            console.error.restore();
        }
    });
});