let typeFly = "";
const reserve = [{ id: "abc123", oneWayFly: 1, awayFly: 1, numberpeople: 2 }];

// Show messages
function messages(message) {
  let messagebox = document.getElementById("messagebox");
  msg = document.createElement("p");

  msg.innerHTML += message + "\n";
  messagebox.appendChild(msg);
}

// Send data
function send() {
  document.getElementById("messagebox").innerHTML="";
  // Variables declarate
  let errors = 0;
  // Get Data
  let oneWay = document.getElementById("oneWay").checked;
  let departureCity = document.getElementById("originCity").value;
  let arriveCity = document.getElementById("destinationCity").value;
  let pax = document.getElementById("NPersonas").value;
  let departureDate = document.getElementById("departureDate").value;
  let arriveDate = document.getElementById("arriveDate").value;

  // Type of fly
  if (oneWay == true) {
    typeFly = "OneWay";
  } else {
    typeFly = "RoundTrip";
  }
  // Select departure cities
  if (departureCity == 0) {
    messages("Seleccione la ciudad de origen");
    errors +=1;
  }
  // Select departure cities
  if (arriveCity == 0) {
    messages("Seleccione la ciudad de destino");
    errors +=1;
  }
  // Set people number
  if (pax < 1) {
    messages("Debe tener por lo menos 1 pasajero.");
    errors +=1;
  }
  // Set departure date
  if (departureDate == "") {
    messages("Ingrese una fecha de salida válida");
    errors +=1;
  }
  // Set arrive date
  if (arriveDate == "" || arriveDate < departureDate) {
    messages("Ingrese una fecha de llegada válida");
    errors +=1;
  }

  if (errors == 0) {
      fetch("http://localhost:3000/prev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          travel: typeFly,
          departureCity: departureCity,
          arriveCity: arriveCity,
          Npax: pax,
          departureDate: departureDate,
          arriveDate: arriveDate,
        }),
      })
        .then((respuesta) => respuesta.json)
        .then((data) => {
          location.href = "./selectFly.html";
        })
        .catch((e) => console.log(e));
    }else{
      errors = 0;
    }
}
// Cargar las ciudades en SELECT
function loadCities() {
  // Get data from HTML
  let selectOriginCities = document.getElementById("originCity");
  let selectDestinationCities = document.getElementById("destinationCity");
  // Get data from database
  fetch("http://localhost:3000/airports")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((airport) => {
        let newAirport = document.createElement("option");
        (newAirport.value = airport.id),
          (newAirport.textContent = airport.iata + " - " + airport.name),
          selectOriginCities.appendChild(newAirport);
      });

      data.forEach((airport) => {
        let newAirport = document.createElement("option");
        (newAirport.value = airport.id),
          (newAirport.textContent = airport.iata + " - " + airport.name),
          selectDestinationCities.appendChild(newAirport);
      });
    });
}

//  Controlar las ciudades
function originCity() {
  let landingCity = document.getElementById("originCity").value;
  if (landingCity != 0) {
    document
      .querySelector('#destinationCity option[value="' + landingCity + '"')
      .remove();
  }
}
//  Controlar las ciudades
function destinationCity() {
  let destinationCity = document.getElementById("destinationCity").value;
  if (destinationCity != 0) {
    document
      .querySelector('#originCity option[value="' + destinationCity + '"')
      .remove();
  }
}

// Show flies
function getFlies() {
  fetch("http://localhost:3000/prev")
    .then((response) => response.json())
    .then((data) => {
      compareData(data[0].departureCity, data[0].arriveCity);
    });
}

function getFliesVuelta() {
  fetch("http://localhost:3000/prev")
    .then((response) => response.json())
    .then((data) => {
      compareData(data.arriveCity, data.departureCity);
    });
}

function compareData(departure, arrive) {
  fetch("http://localhost:3000/flies")
    .then((response) => response.json())
    .then((data) => {
      loadFlies(departure, arrive, data);
    });
}

function loadFlies(departure, arrive, resp) {
  let fly = document.getElementById("flies");
  fetch("http://localhost:3000/airports")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
          
          if (
            departure == resp[i].OriginCity &&
            arrive == resp[j].DestinationCity
          ) {
            let orgin = resp[i].OriginCity - 1;
            let destination = resp[j].DestinationCity - 1;
            let new_fly = document.createElement("div");
            new_fly.classList.add("fly");
            new_fly.innerHTML +=
              '<div class="fly_item id="Nfly""><p>' +
              resp[j].numberFly +
              '</p></div><div class="fly_item" id="originC"><p>' +
              data[orgin].iata +
              '</p></div><div class="fly_item" id="departureH"><p>' +
              resp[j].landingHour +
              '</p></div><div class="fly_item" id="flyTinme"><p>' +
              resp[j].flyTime +
              '</p></div><div class="fly_item" id="destinationC"><p>' +
              data[destination].iata +
              '</p></div><div class="fly_item" id="arriveH"><p>' +
              resp[j].arriveHour +
              "</p></div>";
            fly.appendChild(new_fly);
          }
        }
      }
    });
}

function continuar(){
  fetch("http://localhost:3000/prev")
    .then((response) => response.json())
    .then((data) => {
      if(data[0].travel == "RoundTrip"){
        // let element = document.querySelector("div.flies div");
        // element.innerHTML = "";
        getFliesVuelta();
      }else{

    }});
}

// function deleteData() {
//   fetch("http://localhost:3000/prev/", { method: "GET" })
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }
