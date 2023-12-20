
const express = require('express');
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
/*
Some real blocking functions that are common are:
    - Machine learning inference
    - Solving a DAE
    - Solving a PDE
    - Solving a large ODE
    - Solving a large LP
    - Solving a large MIP
    - Solving a large QP

    These are all common tasks in engineering and data science.

But simpler ones include:
    JSON.stringify() // takes a JS object and returns a string
    JSON.parse() // the opposite of stringify
    [0, 2, 1, 7, 8, 4, 2, 1].sort()

    This is common when logging objects.

    With typical JSON objects, these functions take only a few milliseconds.
    But if you have a server that takes many requests,
    then these can add up.

*/

app.get('/', (req, res) => {
    res.send('Performance Example');
    });

app.get('/timer', (req, res) => {
    delay(5000);
    res.send('Timer done!');
    });

app.listen(3000, () => console.log('Server ready'));