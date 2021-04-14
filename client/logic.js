window.addEventListener("load", initSite);

async function initSite() {
    await eventListeners()
}

async function eventListeners() {
    let fetchGuitarsButton = document.getElementById('fetchGuitars')
    fetchGuitarsButton.addEventListener('click',getAllGuitars)
}

async function getAllGuitars() {
    const guitars = await makeRequest("/api/guitars", "GET")
    const container = document.getElementById('container')
    container.innerHTML = ''

    guitars.map((guitar) => {
        const div = document.createElement('div')
        const buttonDiv = document.createElement('div')
        const brandPara = document.createElement('h3')
        const modelPara = document.createElement('h3')
        const colorPara = document.createElement('h3')
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        brandPara.innerHTML = "Brand:" + ' ' +  guitar.brand
        modelPara.innerHTML = "Model:" + ' ' +   guitar.model
        colorPara.innerHTML = "Color:" + ' ' +  guitar.color
        editButton.innerHTML = "Edit"
        deleteButton.innerHTML = "Delete"
        
        container.append(div)
        div.id = guitar.id
        div.classList.add("box", "fadeIn");
        editButton.classList.add("buttons", "editButton")
        deleteButton.classList.add("buttons", "deleteButton")
        div.appendChild(brandPara)
        div.appendChild(modelPara)
        div.appendChild(colorPara)
        div.appendChild(buttonDiv)
        buttonDiv.appendChild(editButton)
        buttonDiv.appendChild(deleteButton)
        
        deleteButton.addEventListener("click", () =>  deleteSpecificGuitar(guitar.id));
    })
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

async function deleteSpecificGuitar(id) {
    const body = { id: id }
    const deletedGuitar = await makeRequest("/api/guitars/" + id, "DELETE", body)
    document.getElementById(id).remove();
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