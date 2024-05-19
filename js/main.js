const airports = [
    {id:1, iata: "ADZ", name: "San Andrés"},
    {id:2, iata: "AXM", name: "Armenia"},
    {id:3, iata: "BAQ", name: "Barranquilla"},
    {id:4, iata: "BGA", name: "Bucaramanga"},
    {id:5, iata: "BOG", name: "Bogotá"},
    {id:6, iata: "CLO", name: "Cali"},
    {id:7, iata: "CTG", name: "Cartagena"},
    {id:8, iata: "CUC", name: "Cucuta"},
    {id:9, iata: "LET", name: "Leticia"},
    {id:10, iata: "MDE", name: "Medellin"},
    {id:11, iata: "MTR", name: "Monteria"},
    {id:12, iata: "PEI", name: "Pereira"},
    {id:13, iata: "SMR", name: "Santa Marta"}
]

function loadCities(){
    let selectOriginCities = document.getElementById("originCity")
    let selectDestinationCities = document.getElementById("destinityCity")
    airports.forEach((airport) => {
        let newAirport = document.createElement("option");
        (newAirport.value = airport.id),
        (newAirport.textContent = airport.iata + " - " + airport.name),
        selectOriginCities.appendChild(newAirport)
    });
    airports.forEach((airport) => {
        let newAirport = document.createElement("option");
        (newAirport.value = airport.id),
        (newAirport.textContent = airport.iata + " - " + airport.name),
        selectDestinationCities.appendChild(newAirport);
    });
}

function selectCity(){
    let selectCityOrigin = document.getElementById("originCity").selected
    let selectCityDestination = document.getElementById("destinityCity").selected

    if (selectCityOrigin){
        selectCityDestination.setAttribute("disabled","");
    }else{
        selectCityOrigin.setAttribute("disabled","");
    }
}

loadCities();
selectCity();