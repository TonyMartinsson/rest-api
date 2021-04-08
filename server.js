const express = require('express');
const app = express();
const port = 3000;

let guitars = [
    {
        brand: "fender",
        model: "telecaster 62",
        color: "sunburst",
        id: 1
    },
    {
        brand: "rickenbacker",
        model: "360",
        color: "sunburst",
        id: 2 
    }
];

app.use(express.json());

app.listen(port, () => console.log(`server is running at http://localhost:${port}`));