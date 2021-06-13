import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let w = new URLSearchParams(search);
  return w.get('adventure');

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let d = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let data = await d.json();
    return data;
  }
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name = document.querySelector("#adventure-name");
  let sub = document.querySelector("#adventure-subtitle");
  let con = document.querySelector("#adventure-content");
  let pg = document.querySelector("#photo-gallery");
  name.innerHTML = adventure.name;
  sub.innerHTML = adventure.subtitle;
  con.innerHTML = adventure.content;
  adventure.images.forEach(img=>{
    let im = document.createElement("img");
    im.src = img;
    im.className = " activity-card-image";
    pg.appendChild(im);
  })
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let slide = document.createElement("div");
  slide.setAttribute("id","carouselExampleIndicators");
  slide.setAttribute("class","carousel slide");
  slide.setAttribute("data-ride","carousel");
  let ol = document.createElement("ol");
  ol.className="carousel-indicators";
  for(let i=0;i<images.length;i++){
    let li = document.createElement("li");
    li.setAttribute("data-target","#carouselExampleIndicators");
    li.setAttribute("data-slide-to",`${i}`);
    if(i==0){
      li.className="active";
    }
    ol.appendChild(li);
  }
  slide.appendChild(ol);

  let inn = document.createElement("div");
  inn.className = "carousel-inner";
  for(let i=0;i<images.length;i++){
    let d = document.createElement("div");
    if(i==0){
      d.setAttribute("class","carousel-item active");
    }
    else
      d.className ="carousel-item";
    d.innerHTML = `<img class="d-block w-100 activity-card-image" src=${images[i]}>`; 
    inn.appendChild(d);
  }
  slide.appendChild(inn);
  for(let i=0;i<2;i++){
    let a = document.createElement("a");
    a.setAttribute("href","#carouselExampleIndicators");
    a.setAttribute("role","button");
    if(i==0){
      a.setAttribute("class","carousel-control-prev");
      a.setAttribute("data-slide","prev")
      a.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>`;
    }
    else{
      a.setAttribute("class","carousel-control-next");
      a.setAttribute("data-slide","next")
      a.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>`
    }
    
    slide.appendChild(a);
  }

  let pg = document.querySelector("#photo-gallery");
  pg.innerHTML="";
  pg.appendChild(slide);
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.querySelector("#reservation-panel-sold-out").style.display = "none";
    document.querySelector("#reservation-panel-available").style.display = "block";
    document.querySelector("#reservation-person-cost").innerHTML = String(adventure.costPerHead);
  }
  else{
    document.querySelector("#reservation-panel-available").style.display = "none";
    document.querySelector("#reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.querySelector("#reservation-cost").innerHTML = String(adventure.costPerHead*persons);
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $("#myForm").on("submit",function(event){
      event.preventDefault();
      let data = $("#myForm").serialize()+'&adventure='+adventure.id;
      let url = `${config.backendEndpoint}/reservations/new`;
      console.log(data);
      console.log(url);
      $.ajax({
          url: url,
          type: "POST",
          dataType: "JSON",
          data: data,
          success: function(){
            alert("Success!");
            location.reload();
          },
          error: function() {
            alert("Failed!");
         }
      });
      //
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.querySelector("#reserved-banner").style.display = "block";
  }
  else{
    document.querySelector("#reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
