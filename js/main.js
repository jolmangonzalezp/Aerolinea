let errors = ['Se ha guardado', 'Exitosamente'];
const reserve = [{ id: "abc123", oneWayFly: 1, awayFly: 1, numberpeople: 2 }];

// Mostrar mensajes
function messages(message) {
  let messagebox = document.getElementById("messagebox");
  msg = document.createElement("p");
  for (let i = 0; i < message.length; i++) {
    msg.innerHTML = message[i];
    messagebox.appendChild(msg);
  }
}

// Envio de datos
function send() {
  let typeFly = "";
  let oneWay = document.getElementById("oneWay").checked;
  if (oneWay == true) {
    typeFly = "OneWay";
  } else {
    typeFly = "RoundTrip";
  }
  let landingCity = document.getElementById("originCity").value;
  if (landingCity == 0) {
    errors.push = "Seleccione la ciudad de origen";
  }

  let destinationCity = document.getElementById("destinationCity").value;
  let pax = document.getElementById("NPersonas").value;
  if (pax <= 0) {
    errors.push = "Debe tener por lo menos 1 pasajero.";
  }
  let departureDate = document.getElementById("departureDate").value;
  if (departureDate == "") {
    errors.push = "Ingrese una fecha de salida válida";
  }

  let arriveDate = document.getElementById("arriveDate").value;

  if (arriveDate == "" || arriveDate < departureDate) {
    errors.push = "Ingrese una fecha de llegada válida";
  }

  if (errors.length == 0) {
    fetch("http://localhost:3000/prev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        travel: typeFly,
        departureCity: landingCity,
        arriveCity: destinationCity,
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
    messages(errors);
  }
}

// Cargar las ciudades en SELECT
function loadCities() {
  let selectOriginCities = document.getElementById("originCity");
  let selectDestinationCities = document.getElementById("destinationCity");

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
      showFlies(data[0].departureCity, data[0].arriveCity);
    });
}

function showFlies(departure, arrive) {
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
          console.log(i);
          console.log(j);
          if (
            departure == resp[i].OriginCity &&
            arrive == resp[j].DestinationCity
          ) {
            let orgin = resp[i].OriginCity - 1;
            let destination = resp[j].DestinationCity - 1;
            let new_fly = document.createElement("div");
            new_fly.classList.add("fly");
            new_fly.innerHTML =
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
            deleteData();
            fly.appendChild(new_fly);
          }
        }
      }
    });
}

function deleteData() {
  fetch("http://localhost:3000/prev/", { method: "GET" })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

