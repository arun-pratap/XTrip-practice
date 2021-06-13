import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let d = await fetch(`${config.backendEndpoint}/reservations`);
    let data = await d.json();
    return data;
  }
  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  
  if(reservations.length!=0){
    document.querySelector("#no-reservation-banner").style.display="none";
    document.querySelector("#reservation-table-parent").style.display="block";
    let tb = document.querySelector("#reservation-table");
    reservations.forEach(ele=>{
      let tr = document.createElement("tr");
      let d = new Date(ele.date);
      let t = new Date(ele.time);
      const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

      var dd = d.getDate();
      var mm = d.getMonth()+1; 
      var yyyy = d.getFullYear();
      tr.innerHTML = `<td scope="col">${ele.id}</td>
                      <td scope="col">${ele.name}</td>
                      <td scope="col">${ele.adventureName}</td>
                      <td scope="col">${ele.person}</td>
                      <td scope="col">${dd}/${mm}/${yyyy}</td>
                      <td scope="col">${ele.price}</td>
                      <td scope="col">${t.getDate()} ${monthNames[t.getMonth()]} ${t.getFullYear()}, ${t.toLocaleTimeString().toLowerCase()}</td>
                      <td scope="col"><button id=${ele.id} class="reservation-visit-button"><a  href="../detail/?adventure=${ele.adventure}">Visit Adventure</a></button></td>`;
      tb.appendChild(tr);
    })
  }
  else{
    document.querySelector("#no-reservation-banner").style.display="block";
    document.querySelector("#reservation-table-parent").style.display="none";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
