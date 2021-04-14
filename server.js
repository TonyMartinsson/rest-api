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
    const guitar = guitars.find(g => g.id === parseInt(req.params.id));
    if(!guitar) {
        res.status(404).json(`Guitar with id:${req.params.id} not found`)
        return
    }
    guitar.brand = req.body.brand;
    guitar.model = req.body.model;
    guitar.color = req.body.color;
    guitar.id = req.body.id;
    res.status(200).json(guitar);
 });


// Delete a guitar
app.delete('/api/guitars/:id', (req, res) => {
    guitars = guitars.filter((guitar) => guitar.id !== Number(req.params.id));
    res.status(200).json(`Guitar with id:${req.params.id} was deleted`);
});

// Server
app.listen(port, () => console.log(`server is running on http://localhost:${port}`));