import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
    
    try{
       let data = await fetch(`${config.backendEndpoint}/cities`);
       let da = await data.json();
       return da;
    }
    catch(err){
      return null;
    } 
    
    
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  let prnt = document.getElementById("data");
  let card = document.createElement("div");
  card.setAttribute("class","tile card border-0");
  
  let img = document.createElement("img");
  img.setAttribute("src",image);
  img.setAttribute("class","img img-fluid border-0");
  let text = document.createElement("div");
  text.setAttribute("class","tile-text border-0");
  text.innerHTML = `<h5>${city}</h5>
                    <p>${description}</p>`;
  card.appendChild(img);
  card.appendChild(text);
  let link = document.createElement("a");
  link.setAttribute("href",`pages/adventures/?city=${id.toLowerCase()}`);
  link.setAttribute("class"," col-6 col-md-3 mb-3 border-0");
  link.setAttribute("id",`${id}`);
  link.appendChild(card);
  prnt.append(link);
  
}

export { init, fetchCities, addCityToDOM };
