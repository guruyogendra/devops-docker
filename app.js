const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello from Node.js App running on Docker + Jenkins + AWS!'));
app.listen(3000, () => console.log('App running on port 3000'));
//hi
