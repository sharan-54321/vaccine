// Getting states for select tag
document.addEventListener("DOMContentLoaded", function () {
  var state0 = document.getElementById("state");

  fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
    .then((response) => response.json())
    .then((data) => {
      var states = data.states;

      for (var i = 0; i < states.length; i++) {
        state0.innerHTML += `<option value="${states[i].state_id}">${states[i].state_name}</option>`;
      }
    });

  //Getting states using dynamic id
  document.getElementById("state").onchange = function () {
    // Clear district option
    document.getElementById("district").options.length = 1;

    var value = document.getElementById("state").value;

    document.getElementById("d").style.display = "block"; //district

    var url =
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + value;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        var districts = data.districts;
        var district0 = document.getElementById("district");
        for (var i = 0; i < districts.length; i++) {
          district0.innerHTML += `<option value="${districts[i].district_id}">${districts[i].district_name}</option>`;
        }
      });
  };

  document.getElementById("district").onchange = function () {
    document.getElementById("dp").style.display = "block"; //datepicker
  };

  // Final output

  // id="cards-parking"

  //getting dynamic vax cards

  document.getElementById("datepicker").onchange = function () {
    document.getElementById("search_button").style.display = "block";
  };

  document.getElementById("search_button").onclick = function () {
    document.getElementById("search_button").style.display = "block";
    document.getElementById("cards-parking").innerHTML = "";

    var date = document.getElementById("datepicker").value;

    var district_id = document.getElementById("district").value;
    // console.log(date);
    // console.log(district);
    if (district_id == "NONE") {
      alert("Select a District.");
    }

    var vaxCard = document.getElementById("vax-card");

    var url =
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
      district_id +
      "&date=" +
      date;

    fetch(url)
      // Put response into json form
      .then((response) => response.json())
      .then((data) => {
        var sessions = data.sessions;

        // console.log(sessions.length);
        let nearby_loc = document.createElement("div");

        var loc = `
                       <h2 class="heading-4">
                          Vaccination centers near you - <span class="v-centers">${sessions.length}</span>
                      </h2>
                    `;
        nearby_loc.innerHTML = loc;

        document.getElementById("cards-parking").appendChild(nearby_loc);

        for (var i = 0; i < sessions.length; i++) {
          let newCard = document.createElement("div");
          var row = `<div class="vaccine-card" data-aos="slide-up" data-aos-offset="5" data-aos-delay="15" data-aos-duration="1000" data-aos-once="true" data-aos-easing="ease-in-out"> <div class="hospital-details"> <h6 class="heading-3">Hospital/ center Name</h6> <div class="hospital-address"> <span class="hospital-name" ><strong class="bold-text-2">${sessions[i].name}</strong></span >${sessions[i].address}<br/> </div><div class="district-pincode">${sessions[i].district_name}, ${sessions[i].pincode}</div></div><div class="vaccine-details flexbox-first"> <h3 class="heading-2">VACCINE AVAILABLE</h3> <div class="vaccine-name">${sessions[i].vaccine}</div><div class="dose-available"> <div class="dose-details"> <div class="dose-1">available dose 1</div><div class="image"> <img src="https://uploads-ssl.webflow.com/6181638c04f8b017504fb98f/61822c3690bdeb5637e09b3b_arrow_downward_24px.svg" loading="lazy" alt="" class="image-5"/> </div><div class="dose-number">${sessions[i].available_capacity_dose1}</div></div><div class="dose-details"> <div class="dose-1">available dose 2</div><div class="image"> <img src="https://uploads-ssl.webflow.com/6181638c04f8b017504fb98f/61822c3690bdeb5637e09b3b_arrow_downward_24px.svg" loading="lazy" alt="" class="image-5"/> </div><div class="dose-number">${sessions[i].available_capacity_dose2}</div></div></div></div><div class="fee-details"> <div class="fee-typeface">Fee Type</div><div class="free-paid">${sessions[i].fee_type}</div><div class="price-details"> <div class="fee-typeface">Fee</div><div class="rupee"> <img src="https://uploads-ssl.webflow.com/6181638c04f8b017504fb98f/61823131d433804ae579f29e_rupee%202.svg" loading="lazy" alt="" class="image-6"/> </div><div class="price">${sessions[i].fee}</div></div></div></div>`;
          newCard.innerHTML = row;
          document.querySelector("#cards-parking").appendChild(newCard);
        }
        let last = document.createElement("h2");
        last.classList.add("here-text");
        var thatsit = `
              <span>that's it</span>        
          `;
        last.innerHTML = thatsit;
        document.querySelector("#cards-parking").appendChild(last);
      });
  };
});
