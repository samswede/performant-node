/*
Why do we use pm2?

It comes with clustering built in.
PM2 will fork our process for us.

That means we can remove the whole master part of our code.

This simplifies our code. We don't need to import cluster or os.

*/
/*
// Before
const express = require('express');
const cluster = require('cluster')
const os = require('os')
*/
// After
const express = require('express');
//const pm2 = require('pm2')


const app = express();

/*
The function below is an unrealistic blocking function.
*/
function delay(duration) {
    const start = Date.now();
    while (Date.now() < start + duration) {
        // event loop is blocked!
    };
};

app.get('/', (req, res) => {
    res.send(`Performance example ${process.pid}`);
    });

app.get('/timer', (req, res) => {
    delay(5000);
    res.send('Timer done!');
    });

console.log('Running server.js')
console.log('Worker process started.')
// Its only the workers that we want to handle http requests
// So, we will only call app.listen() if we have a worker process
app.listen(3000, () => console.log('Server ready'));


