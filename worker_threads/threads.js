const { Worker, 
        isMainThread,
        workerData } = require('worker_threads');

if (isMainThread) {
    console.log('Inside Main Thread!');
    console.log(`main process id is: ${process.pid}`)
    console.log('Main thread id is: ', require('worker_threads').threadId);
    new Worker(__filename, { 
        workerData: [1, 4, 2, 9, 4, 2] 
    });
    new Worker(__filename, { 
        workerData: [4, 2, 7, 5, 2, 0, 2, 1] 
    });
} else {
    console.log('Inside Worker! (not main thread)');
    console.log(`Inside process id is: ${process.pid}`)
    console.log('Worker thread id is: ', require('worker_threads').threadId);

    // now lets perform a blocking operation
    const arr = workerData;
    console.log(`Array to be sorted: ${arr}`);
    console.log('Sorting...');
    arr.sort((a, b) => a - b);
    console.log(`Sorted array: ${arr}`);
}

/*
RUN by command: node threads.js

This is efficient because the main thread is not blocked by the sorting operation.
The main thread can continue to do other work while the worker thread is sorting the array.
*/