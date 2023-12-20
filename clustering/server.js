
const express = require('express');
const cluster = require('cluster')
const os = require('os')

const app = express();

/*
The function below is an unrealistic blocking function.
*/
function delay(duration) {
    const start = Date.now();
    while (Date.now() < start + duration) {
        // event loop is blocked!
    };
}

app.get('/', (req, res) => {
    res.send(`Performance example ${process.pid}`);
    // Seeing the process.pid is useful because
    // our master thread and worker threads will all have
    // different process pid's, because they are different processes.

    // This lets us verify that different processes are sharing the load.
    });

app.get('/timer', (req, res) => {
    delay(5000);
    res.send('Timer done!');
    });

if (cluster.isMaster) {
    console.log('Master has been started...')

    // Create as many forks as there logical or physical cores in our cpu(s)
    // physical cores are exactly what they sound like
    // logical cores are more complex...
    //      - fancy logic lets us run many threads on one physical core
    //      - only in certain cases, and not as efficiently

    // to maximize performance, we take the max num logical cores

    const NUM_WORKERS = os.cpus().length 

    console.log(`num workers: ${NUM_WORKERS}`)

    for (let i = 0; i < NUM_WORKERS; i++) {

        cluster.fork();
    }
    
    /*
    In the line above, we will run this same script again.

    Each fork will create a worker.
    And in a worker, cluser.isMaster === false

    Thus the else statement will execute.

    !!!
    Every time we fork, we are still running exactly the same code.
    Namely, server.js .
    The only difference is the boolean value in cluster.isMaster

    !!!

    */
} else {
    console.log('Worker process started.')
    // Its only the workers that we want to handle http requests
    // So, we will only call app.listen() if we have a worker process
    app.listen(3000, () => console.log('Server ready'));

    // The node server knows to divide the requests on port 3000
    // even though we have not specified a routing strategy

    // I suspect its round robin by default.
}

