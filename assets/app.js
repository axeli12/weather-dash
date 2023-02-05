const newUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={167274a7d409a7fb3257f51020307787}"
fetch(newUrl)
    .then(function (response){
        return response.json();
    })

console.log("newUrl")