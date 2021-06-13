
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let param = new URLSearchParams(search);
  let city = param.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let d = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`);
    let data = await d.json();
    return data;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let prnt = document.querySelector("#data");
  adventures.forEach(adv=>{
    
    let card = document.createElement("div");
    card.setAttribute("class"," card activity-card");
    let img = document.createElement("img");
    img.setAttribute("src",`${adv.image}`);
    img.setAttribute("class","img img-fluid card-img-top border-0");
    card.appendChild(img);
    let banner = document.createElement("div");
    banner.setAttribute("class","category-banner");
    banner.innerText = adv.category;
    

    let body1 = document.createElement("div");
    body1.setAttribute("class","row justify-content-between w-100 p-2");
    let body2 = document.createElement("div");
    body2.setAttribute("class","row justify-content-between w-100 p-2");
    body1.innerHTML = `<div><h6>${adv.name}</h6></div>
                       <div><h6>&#x20B9;${adv.costPerHead}</h6></div>`;
    body2.innerHTML = `<div><h6>Duration</h6></div>
                       <div"><h6>${adv.duration} hours</h6></div>`;
    card.appendChild(body1);
    card.appendChild(body2);
    let link = document.createElement("a");
    link.setAttribute("href",`detail/?adventure=${adv.id}`);
    link.setAttribute("id",`${adv.id}`);
    link.setAttribute("class","col-6 col-md-3 mb-5");
    link.appendChild(card);
    link.appendChild(banner);
    
    prnt.appendChild(link);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let res = list.filter(e=>{
    return e.duration>=low&&e.duration<=high;
  })
  return res;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let res = list.filter((e)=>categoryList.includes(e.category));
  return res;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category.length!==0&&filters.duration.length!=0){
    let res = filterByCategory(list,filters.category);
    let lh = filters.duration.split("-");
    res = filterByDuration(res,parseInt(lh[0]),parseInt(lh[1]));
    return res;
  }
  
  if(filters.category.length!==0){
     let res = filterByCategory(list,filters.category);
     return res;
  }
  
  if(filters.duration.length!=0){
    let lh = filters.duration.split("-");
    
    let res = filterByDuration(list,parseInt(lh[0]),parseInt(lh[1]));
    return res;
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  return JSON.parse(window.localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  let main = document.querySelector("#category-list")
  if(filters.category.length!=0){
    filters.category.forEach(e=>{
        let pill = document.createElement("button");
        pill.setAttribute("class","category-filter");
        pill.innerText = e;
        main.appendChild(pill);
    })
  }
  if(filters.duration.length!=0){
        let pill = document.createElement("button");
        pill.setAttribute("class","category-filter");
        pill.innerText = filters.duration;
        main.appendChild(pill);
    
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
