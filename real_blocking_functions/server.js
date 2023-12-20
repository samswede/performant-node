
const express = require('express');
const app = express();

/*
We will make a blocking call to the server. 

While this function is running, the server will not be able to handle any other requests.

This function is simulating a very expensive computation, like a machine learning inference,
or using pyomo to solve a DAE.

Think about many people requesting this same server at once.

This is really bad.
*/
function delay(duration) {
    const start = Date.now();
    while (Date.now() < start + duration) {
        // event loop is blocked!
    };
}

app.get('/', (req, res) => {
    res.send('Performance Example');
    });

app.get('/timer', (req, res) => {
    delay(5000);
    res.send('Timer done!');
    });

app.listen(3000, () => console.log('Server ready'));