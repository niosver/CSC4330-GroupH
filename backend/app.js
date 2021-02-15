const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req,res) => {
    res.send('Test');
});

app.listen(port, () => {
    console.log(`Sever running on port ${port}`)
});
