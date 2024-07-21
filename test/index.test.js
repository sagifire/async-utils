import { expect } from 'chai';
import { promisifySyncFunction, waitCallback, waitOnce } from '../src/index.js';
import sinon from 'sinon';
import { EventEmitter } from 'events';

describe('promisifySyncFunction', () => {
    it('should convert a callback-based function to a promise-based one', async () => {
        const syncFunction = (arg1, arg2, callback) => {
            callback(null, arg1, arg2);
        };
        const asyncFunction = promisifySyncFunction(syncFunction);

        const result = await asyncFunction('foo', 'bar');
        expect(result).to.eql(['foo', 'bar']);
    });

    it('should reject the promise if the callback returns an error', async () => {
        const syncFunction = (arg1, arg2, callback) => {
            callback(new Error('Test Error'));
        };
        const asyncFunction = promisifySyncFunction(syncFunction);

        try {
            await asyncFunction('foo', 'bar');
        } catch (error) {
            expect(error).to.be.an('error').with.property('message', 'Test Error');
        }
    });
});

describe('waitCallback', () => {
    it('should wait for the callback to be called and return the result as a promise', async () => {
        const syncFunction = (arg1, arg2, callback) => {
            callback(null, arg1, arg2);
        };

        const result = await waitCallback(syncFunction, 'foo', 'bar');
        expect(result).to.eql(['foo', 'bar']);
    });

    it('should reject the promise if the callback returns an error', async () => {
        const syncFunction = (arg1, arg2, callback) => {
            callback(new Error('Test Error'));
        };

        try {
            await waitCallback(syncFunction, 'foo', 'bar');
        } catch (error) {
            expect(error).to.be.an('error').with.property('message', 'Test Error');
        }
    });
});

describe('waitOnce', () => {
    it('should wait for an event to be emitted and resolve the promise', async () => {
        const eventEmitter = new EventEmitter();
        const eventId = 'testEvent';

        setTimeout(() => {
            eventEmitter.emit(eventId, 'eventData');
        }, 50);

        const result = await waitOnce(eventEmitter, eventId);
        expect(result).to.equal('eventData');
    });
});