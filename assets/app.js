// const newUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={167274a7d409a7fb3257f51020307787}"
// fetch(newUrl)
//     .then(function (response){
//         return response.json();
//     })

// console.log("newUrl")

let apiKey = "167274a7d409a7fb3257f51020307787"
let today = dayjs()

let geWeather = function getApi(){
    let gUrl = "https://openweathermap.org/api/geocoding-api";
    let lat = "";
    let lon = "";

    fetch(gUrl) .then (function(response){
        if(response.ok){
            response.json()
            .then(function(data) {
                console.log(data)
            })
        }  else {
            alert("error" + response.statusText)

        }

        let newApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon" + lon + "&apiid=" + apiKey
    })
}