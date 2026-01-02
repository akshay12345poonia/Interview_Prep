# Node.js Fundamentals

## What is Node.js? How does it differ from browser JavaScript?
Node.js is a runtime environment that allows JavaScript to run outside the browser, built on the V8 JavaScript engine. Unlike browser JavaScript, Node.js provides access to system-level features such as the file system, network sockets, and process management. Browser JavaScript is primarily focused on DOM manipulation and user interaction, while Node.js is designed for building scalable server-side and backend applications.

## What is the event loop in Node.js? Explain how it works.
The event loop is a core mechanism in Node.js that handles asynchronous operations. It continuously checks the call stack and the task queues, executing callbacks when the call stack is empty. The event loop processes different phases such as timers, I/O callbacks, idle and prepare, poll, check, and close callbacks, allowing Node.js to perform non-blocking operations efficiently.

## What is non-blocking I/O? How does Node.js achieve it?
Non-blocking I/O allows a program to initiate an operation and continue executing other code without waiting for the operation to complete. Node.js achieves this by using asynchronous APIs and delegating I/O operations to the system or worker threads, while the event loop manages callbacks once the operations finish.

## Explain the difference between synchronous and asynchronous code.
Synchronous code executes line by line and blocks further execution until the current operation completes. Asynchronous code allows long-running tasks to run in the background, enabling the program to continue executing other instructions and handle the result later through callbacks, promises, or async/await.

## What are callbacks? What is callback hell?
Callbacks are functions passed as arguments to other functions and executed after an asynchronous operation completes. Callback hell refers to deeply nested callbacks that make code difficult to read, maintain, and debug, often resulting from handling multiple asynchronous operations sequentially.

## What are Promises? How do they solve callback hell?
Promises are objects that represent the eventual completion or failure of an asynchronous operation. They provide a cleaner way to handle asynchronous logic using chaining with `.then()` and `.catch()`, reducing nesting and improving readability compared to callbacks.

## What is async/await? How does it work internally?
Async/await is syntax built on top of promises that allows asynchronous code to be written in a synchronous-looking manner. Internally, async functions always return promises, and the `await` keyword pauses execution of the function until the promise resolves or rejects, without blocking the event loop.

## What is the difference between process.nextTick() and setImmediate()?
`process.nextTick()` schedules a callback to run immediately after the current operation completes, before the event loop continues to the next phase. `setImmediate()` schedules a callback to run during the check phase of the event loop, after I/O events. `process.nextTick()` has higher priority and can starve the event loop if overused.

## What are streams in Node.js? Name the types of streams.
Streams are abstractions for handling reading or writing data in chunks instead of all at once. This improves performance and memory efficiency. The main types of streams in Node.js are Readable, Writable, Duplex, and Transform streams.

## What is the Buffer class in Node.js?
The Buffer class is used to handle binary data in Node.js. It allows working with raw memory outside the V8 heap and is commonly used when dealing with file systems, network operations, or binary protocols where data is not in string or JSON format.
