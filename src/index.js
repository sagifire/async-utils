

/**
 * @param syncFunction {function(...args: any, function)}
 * @return {function(...[*]): Promise<unknown>}
 */
export const promisifySyncFunction = (syncFunction) => (...fArgs) => {
    return new Promise((resolve, reject) => {
        const callbackHandler = (error, ...cArgs) => {
            if (error) reject(error)
            resolve (cArgs)
        }
        syncFunction(...fArgs, callbackHandler)
    })
}

/**
 * @param syncFunction {function(...args: any, function)}
 * @param fArgs {any}
 * @return {Promise<function(...[*]): Promise<unknown>>}
 */
export const waitCallback = async (syncFunction, ...fArgs) => {
    const asyncFunction = promisifySyncFunction(syncFunction)
    return await asyncFunction(...fArgs)
}

/**
 * @param eventEmitter {EventEmitter}
 * @param eventId {string}
 * @return {Promise<unknown>}
 */
export const waitOnce = (eventEmitter, eventId) => {
    return new Promise((resolve) => {
        eventEmitter.once(eventId, resolve)
    })
}

