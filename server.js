const express = require('express');
const app = express();
const port = 3000;

let guitars = [
    {
        brand: "Fender",
        model: "Telecaster 62",
        color: "Sunburst",
        id: 1
    },
    {
        brand: "Rickenbacker",
        model: "360",
        color: "Sunburst",
        id: 2 
    }
];

app.use(express.json());

app.use(express.static('./client'))

// Get all guitars
app.get('/api/guitars', (req, res) => {
    res.status(200).json(guitars);
})

// Get one guitar
app.get('/api/guitars/:id', (req,res) => {
    const id = req.params.id

    const foundGuitar = guitars.find((guitar) => {
        return guitar.id == id
    })
    if(!foundGuitar) {
        res.status(404).json({error: `This guitar doesn't exist!`})
    }
    res.json(foundGuitar)
})

// Create a guitar
app.post('/api/guitars', (req, res) => {
    const brandToSave = req.body.brand
    const modelToSave = req.body.model
    const colorToSave = req.body.color

    let idToSave = 0
    guitars.forEach((guitar) => {
        if(guitar.id > idToSave) {
            idToSave = guitar.id
        }
    })
    idToSave++
    
    guitars.push({
        brand: brandToSave,
        model: modelToSave,
        color: colorToSave,
        id: idToSave
    })
    res.status(201).json({brandToSave,modelToSave, colorToSave, idToSave})
})

// Update a guitar
app.put('/api/guitars/:id', (req, res) => {
    guitars = guitars.map((guitar) => guitar.id === Number(req.params.id) ? req.body : guitar);
    res.status(200).json(req.body);
});

// Delete a guitar
app.delete('/api/guitars/:id', (req, res) => {
    guitars = guitars.filter((guitar) => guitar.id !== Number(req.params.id));
    res.status(200).json({});
})

// Server
app.listen(port, () => console.log(`server is running on http://localhost:${port}`));