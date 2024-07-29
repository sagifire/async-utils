import { EventEmitter } from 'events';

/**
 * Converts a callback-based function to a promise-based one.
 */
export function promisifySyncFunction<ARGS extends any[], R extends void>(
    syncFunction: (...params: [...ARGS, (error: any, ...cArgs: any[]) => R]) => void
): (...params: ARGS) => Promise<R>;

/**
 * Waits for a callback-based function to complete and returns the result as a promise.
 */
export function waitCallback<ARGS extends any[], R extends any[]>(
    syncFunction: (...args: [...ARGS, (error: any, ...cArgs: R) => void]) => void,
    ...fArgs: ARGS
): Promise<R>;

/**
 * Waits for an event to be emitted and resolves the promise.
 */
export function waitOnce(
    eventEmitter: EventEmitter,
    eventId: string
): Promise<any>;