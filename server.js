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

// Endpoint test
app.get('/api', (req, res) => {
    res.send('Hello World');
})
// Get all guitars
app.get('/api/guitars', (req, res) => {
    res.json(guitars);
})
// Get one guitar
app.get('/api/guitars/:id', (req,res) => {
    const id = req.params.id

    const foundGuitar = guitars.find((guitar) => {
        return guitar.id == id
    })
    if(!foundGuitar) {
        res.status(404).json({error: "Guitar not found!"})
    }
    res.json(foundGuitar)
})
// Create a guitar
app.post('/api/guitars', (req, res) => {
    guitars.push(req.body);
    res.status(201).json(req.body);
})
// Update a guitar
app.put('/api/guitars/:id', (req, res) => {
    guitars = guitars.map((guitar) => guitar.id === Number(req.params.id) ? req.body : guitar);
    res.status(200).json(req.body);
});
// Delete a guitar
app.delete('/api/guitars/:id', (req, res) => {
    guitars = guitars.filter((guitar) => guitar.id !== Number(req.params.id));
    res.status(204).json({});
})
// Server
app.listen(port, () => console.log(`server is running on http://localhost:${port}`));