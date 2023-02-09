





let searchBtn = document.querySelector('.btn');
let showCurrent = document.querySelector('.show-current-city');
let searchList = document.querySelector('.list-group');
let dayOne = document.querySelector('.day-1');
let dayTwo = document.querySelector('.day-2');
let dayThree = document.querySelector('.day-3');
let dayFour = document.querySelector('.day-4');
let dayFive = document.querySelector('.day-5');
let apiKey = "167274a7d409a7fb3257f51020307787"
let newUrl = 'https://api.openweathermap.org/data/2.5';

function getWeather() {
    const city = JSON.parse(localStorage.getItem('coords'));
    fetch(`${newUrl}/weather?lat=${city.lat}&lon=${city.long}&appid=${apiKey}&units=imperial`)
        .then(function(response){
            return response.json()
        })
        .then(function (data) {
            showCurrent.style.background = '#1986e6';
            showCurrent.style.opacity = '.7';
            showCurrent.style.borderRadius = '10px';
            showCurrent.innerHTML = `<p>${data.name} ${dayjs().format('MM/DD/YYYY')}<p/>
                    <img  class ="icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${data.main.temp} <p>
                    <p> ${'Humidity:'} ${data.main.humidity}</p>
                    <p>  ${'Wind:'} ${data.wind.speed}</p>`
        
    });