# @sagifire/async-utils

A NodeJS library providing utilities for managing and simplifying asynchronous code tasks. It provides a set of functions to simplify the usage of callback-based APIs and EventEmitters by converting them to Promises.

## Installation

Install the package using npm:

```sh
npm install @sagifire/async-utils
```

## Usage

You can use this library in both CommonJS and ES Modules environments.

### CommonJS

```javascript
const { promisifySyncFunction, waitCallback, waitOnce } = require('@sagifire/async-utils');

// Example usage
const asyncFunction = promisifySyncFunction(syncFunction);
asyncFunction(arg1, arg2).then(result => console.log(result));
```

### ES Modules
```javascript
import { promisifySyncFunction, waitCallback, waitOnce } from '@sagifire/async-utils';

// Example usage
const asyncFunction = promisifySyncFunction(syncFunction);
asyncFunction(arg1, arg2).then(result => console.log(result));
```

## API

### promisifySyncFunction(...)

Converts a callback-based function to a promise-based one.

#### Parameters

* `syncFunction {function(...args: any, function)}` - The callback-based function to be converted.

#### Returns

* `function(...[*]): Promise<unknown>` - A function that returns a Promise resolving with the callback results or rejecting with an error.

#### Example

```javascript
const syncFunction = (arg1, arg2, callback) => {
  callback(null, arg1, arg2);
};

const asyncFunction = promisifySyncFunction(syncFunction);
asyncFunction('foo', 'bar').then(result => {
  console.log(result); // ['foo', 'bar']
});
```

### waitCallback(...)

Waits for a callback-based function to complete and returns the result as a promise.

#### Parameters

* `syncFunction {function(...args: any, function)}` - The callback-based function to be executed.
* `fArgs {any}` - The arguments to be passed to the function. 

#### Returns

* `Promise<function(...[*]): Promise<unknown>>` - A Promise resolving with the callback results or rejecting with an error.

#### Example

```javascript
const syncFunction = (arg1, arg2, callback) => {
  callback(null, arg1, arg2);
};

waitCallback(syncFunction, 'foo', 'bar').then(result => {
  console.log(result); // ['foo', 'bar']
});
```

### waitOnce(...)

#### Parameters

* `eventEmitter {EventEmitter}` - The EventEmitter instance.
* `eventId {string}` - The event ID to listen for.

#### Returns

* `Promise<unknown>` - A Promise resolving with the event data.

#### Example
```javascript
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();
const eventId = 'testEvent';

setTimeout(() => {
  eventEmitter.emit(eventId, 'eventData');
}, 50);

waitOnce(eventEmitter, eventId).then(result => {
  console.log(result); // 'eventData'
});
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the LICENSE file for details.