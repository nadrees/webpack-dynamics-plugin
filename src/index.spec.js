import WebpackDynamicsPlugin from './index';
import {expect} from 'chai';
import sinon from 'sinon';

describe('The WebpackDynamicsPlugin', () => {
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

            let plugin = new WebpackDynamicsPlugin();

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
        //TODO
    });

    describe('uploadFiles function', () => {
        //TODO
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