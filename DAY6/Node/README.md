# Node.js Core Modules & Event Emitter

## What are core modules in Node.js? Name at least 10.
Core modules are built-in modules provided by Node.js that can be used without installing any external packages. They provide essential functionality for system-level operations and application development. Common core modules include fs, path, http, https, os, url, querystring, events, crypto, buffer, stream, util, and child_process.

## Explain the 'fs' module. What's the difference between fs and fs/promises?
The fs module provides an API for interacting with the file system, allowing reading, writing, updating, and deleting files and directories. The traditional fs module uses callback-based and synchronous methods, while fs/promises provides a promise-based 
API that works naturally with async/await, offering cleaner and more readable asynchronous code.

## What is the 'path' module used for?
The path module is used to handle and transform file paths in a way that works consistently across different operating systems. It helps in joining paths, resolving absolute paths, extracting file extensions, and normalizing path strings to avoid platform-specific issues.

## Explain the EventEmitter class. How do you use it?
The EventEmitter class, provided by the events module, is used to implement the observer pattern in Node.js. It allows objects to emit named events and register listeners that respond when those events occur. Developers create an instance of EventEmitter, register listeners using methods like on(), and emit events using the emit() method.

## What is the difference between on() and once() in EventEmitter?
The on() method registers a listener that will be called every time the event is emitted. The once() method registers a listener that is automatically removed after it is called the first time, making it useful for one-time event handling.

## How does error handling work with EventEmitters?
Error handling in EventEmitters is typically done using the special 'error' event. If an EventEmitter emits an 'error' event and no listener is registered for it, Node.js will treat it as an uncaught exception and crash the process. To prevent this, developers should always attach an error event listener when emitting errors.

## What is the 'cluster' module? Why would you use it?
The cluster module allows a Node.js application to create multiple worker processes that share the same server port. It is used to take advantage of multi-core CPU systems, improving performance and reliability by distributing incoming requests across multiple processes.

## What are child processes? When would you spawn one?
Child processes allow Node.js to execute external system commands or run scripts in separate processes. They are spawned when tasks are CPU-intensive, need isolation, or require running non-JavaScript programs, preventing blocking of the main event loop.

## What is the difference between spawn, exec, and fork?
The spawn method starts a new process and streams its output, making it suitable for long-running processes or large data output. The exec method runs a command in a shell and buffers the output in memory, which is convenient for small commands but not ideal for large output. The fork method is a special case of spawn used to create new Node.js processes with an IPC channel, commonly used for communication between parent and child Node.js processes.
