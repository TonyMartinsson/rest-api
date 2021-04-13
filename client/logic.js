window.addEventListener("load", initSite);

function initSite() {
    // getAllGuitars()
    // getSpecificGuitar()
    // saveNewGuitar()
    // updateAGuitar()
    deleteOneGuitar(1)
}

async function getAllGuitars() {
    const guitars = await makeRequest("/api/guitars", "GET")
    console.log(guitars);
}
async function getSpecificGuitar(id) {
    const guitar = await makeRequest("/api/guitars/" + id, "GET")
    console.log(guitar)
}
async function saveNewGuitar(brand, model, color) {
    const body = { brand: brand, model: model, color: color }

    const newGuitar = await makeRequest("/api/guitars", "POST", body)
    console.log(newGuitar)
}
async function updateAGuitar(brand, model, color, id) {
    let body = { brand: brand, model: model, color: color, id: id }

    const updatedGuitar = await makeRequest("/api/guitars/" + id, "PUT", body)
    console.log(updatedGuitar)
}
async function deleteOneGuitar(id) {
    const body = { id: id }
    const deletedGuitar = await makeRequest("/api/guitars/" + id, "DELETE", body)
    console.log(deletedGuitar)
}

async function makeRequest(url, method, body) {
    
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log(response)

    const result = await response.json();

    return result
}