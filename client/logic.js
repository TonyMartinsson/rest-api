window.addEventListener("load", initSite);

async function initSite() {
  await eventListeners();
}

async function eventListeners() {
  const fetchGuitarsButton = document.getElementById("fetchGuitars");
  fetchGuitarsButton.addEventListener("click", getAllGuitars);
}

async function getAllGuitars() {
  try {
    const response = await makeRequest("/api/guitars", "GET");
    handleResponse(response);
  } catch (error) {
    console.error(error);
    showError("Error fetching guitars");
  }
}

async function getSpecificGuitar(id) {
  try {
    const response = await makeRequest(`/api/guitars/${id}`, "GET");
    handleResponse(response);
  } catch (error) {
    console.error(error);
    showError("Error fetching guitar");
  }
}

async function saveNewGuitar(event) {
  event.preventDefault();
  const brandInput = document.getElementById("brand").value;
  const modelInput = document.getElementById("model").value;
  const colorInput = document.getElementById("color").value;
  const body = { brand: brandInput, model: modelInput, color: colorInput };
  try {
    const response = await makeRequest("/api/guitars", "POST", body);
    handleResponse(response);
  } catch (error) {
    console.error(error);
    showError("Error creating new guitar");
  }

  // Rensa input-fälten
  const inputs = document.querySelectorAll("#form input");
  inputs.forEach((input) => {
    if (input.type === "submit") {
      input.value = "Add";
    } else {
      input.value = "";
    }
  });

  // return false;
}

function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.innerHTML = message;
  errorDiv.style.color = "red";
  document.body.appendChild(errorDiv);
}

async function updateAGuitar(brand, model, color, id) {
  const body = { brand, model, color, id };
  try {
    const response = await makeRequest(`/api/guitars/${id}`, "PUT", body);
    handleResponse(response);
  } catch (error) {
    console.error(error);
    showError("Error updating guitar");
  }
}

async function deleteSpecificGuitar(id) {
  const body = { id };
  try {
    const response = await makeRequest(`/api/guitars/${id}`, "DELETE", body);
    handleResponse(response);
  } catch (error) {
    console.error(error);
    showError("Error deleting guitar");
  }
  document.getElementById(id).remove();
}

async function makeRequest(url, method, body) {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  
  function handleResponse(response) {
      const container = document.getElementById("container");
      container.innerHTML = "";
      if (container.style.display === "none") {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
  
      let responseArray = [];
      if (Array.isArray(response)) {
          responseArray = response;
      } else {
          responseArray = [response];
      }
  
      for (const guitar of responseArray) {
        const { id, brand, model, color } = guitar;
    
        const div = document.createElement("div");
        const buttonDiv = document.createElement("div");
        const brandPara = document.createElement("h3");
        const modelPara = document.createElement("h3");
        const colorPara = document.createElement("h3");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
    
        brandPara.innerHTML = `Brand: <b>${brand}</b>`;
        modelPara.innerHTML = `Model: <b>${model}</b>`;
        colorPara.innerHTML = `Color: <b>${color}</b>`;
        editButton.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";
    
        container.append(div);
        div.id = id;
        div.classList.add("box", "fadeIn");
        editButton.classList.add("buttons", "editButton");
        deleteButton.classList.add("buttons", "deleteButton");
        buttonDiv.classList.add("buttonDiv");
        div.appendChild(brandPara);
        div.appendChild(modelPara);
        div.appendChild(colorPara);
        div.appendChild(buttonDiv);
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
    
        deleteButton.addEventListener("click", () => deleteSpecificGuitar(id));
      }
    }



  
  

