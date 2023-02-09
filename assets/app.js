





let searchBtn = document.querySelector('.btn');
let today = document.querySelector('.show-current-city');
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
            today.style.background = '#6A615F';
            today.style.opacity = '.7';
            today.style.borderRadius = '10px';
            today.innerHTML = `<p>${data.name} ${dayjs().format('MM/DD/YYYY')}<p/>
                    <img  class ="icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt=""> 
                    <p> ${'Temprature:'} ${data.main.temp} <p>
                    <p> ${'Humidity:'} ${data.main.humidity}</p>
                    <p>  ${'Wind:'} ${data.wind.speed}</p>`
        
                    fetch(`${newUrl}/forecast?lat=${city.lat}&lon=${city.long}&appid=${apiKey}&units=imperial`)
                    .then(function(response) {
                        return response.json()
                            .then(function (data) {
                                data.list.every(myFunction);
                                function myFunction(value, index, array) {
                                    var arr = [];
                                    for (i = 0; i < array.length; i = i + 8) {
                                        arr.push(array[i]);
                                    }
                                    dayOne.innerHTML =
                                        `
                                        <p>${dayjs().add(1, 'day').format('MM/DD/YY')}</p>
                        <img src="http://openweathermap.org/img/wn/${array[0].weather[0].icon}.png" alt=""> 
                        <p> ${'Temprature:'} ${array[0].main.temp} <p>
                        <p> ${'Humidity:'} ${array[0].main.humidity}</p>
                        <p>  ${'Wind:'} ${array[0].wind.speed}</p>`;
                                    dayTwo.innerHTML =
                                        `<p>${dayjs().add(2, 'day').format('MM/DD/YY')}</p>
                                        <img src="http://openweathermap.org/img/wn/${array[1].weather[0].icon}.png" alt=""> 
                        <p> ${'Temprature:'} ${array[1].main.temp} <p>
                        <p> ${'Humidity:'} ${array[1].main.humidity}</p>
                        <p>  ${'Wind:'} ${array[1].wind.speed}</p>`;
                                    dayThree.innerHTML =
                                        `<p>${dayjs().add(3, 'day').format('MM/DD/YY')}</p>
                                        <img src="http://openweathermap.org/img/wn/${array[2].weather[0].icon}.png" alt=""> 
                        <p> ${'Temprature:'} ${array[2].main.temp} <p>
                        <p> ${'Humidity:'} ${array[2].main.humidity}</p>
                        <p>  ${'Wind:'} ${array[2].wind.speed}</p>`;
                                    dayFour.innerHTML =
                                        `<p>${dayjs().add(4, 'day').format('MM/DD/YY')}</p>
                                        <img src="http://openweathermap.org/img/wn/${array[3].weather[0].icon}.png" alt=""> 
                        <p> ${'Temprature:'} ${array[3].main.temp} <p>
                        <p> ${'Humidity:'} ${array[3].main.humidity}</p>
                        <p> ${'Wind:'} ${array[3].wind.speed}</p>`;
                                    dayFive.innerHTML =
                                        `<p>${dayjs().add(5, 'day').format('MM/DD/YY')}</p>
                                        <img src="http://openweathermap.org/img/wn/${array[4].weather[0].icon}.png" alt=""> 
                        <p> ${'Temprature:'} ${array[4].main.temp} <p>
                        <p> ${'Humidity:'} ${array[4].main.humidity}</p>
                        <p>  ${'Wind:'} ${array[4].wind.speed}</p>`;
                                }
                            }) 
                    })
            })
        addText();
    }
    // Shows text above 5day forecast
    function addText() {
        document.querySelector('.text').innerHTML = `
        <h3>5Day forecast</h3>
        `
    }
    
     // Get the latitude and longitude of the city
    function getLatitudeAndLongitude(name) {
        let cityName = name.length ? name : document.querySelector('#tags').value;
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (!data.length) {
                    alert('City not found!')
                    return
                }
                localStorage.clear()
                localStorage.setItem('coords', JSON.stringify({ lat: `${data[0].lat}`, long: `${data[0].lon}`, name: cityName }));
                getWeather();
                createButton();
            })
    }
    // Show weather clicking on a button.
    function showWeatherClickingOnButton(name) {
        let cityName = name.length ? name : document.querySelector('#tags').value;
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (!data.length) {
                    testResult.style.border = "1px solid red";
                    alert('City not found!')
                    return
                }
                localStorage.clear();
                localStorage.setItem('coords', JSON.stringify({ lat: `${data[0].lat}`, long: `${data[0].lon}`, name: cityName }));
                getWeather();
            })
    }
    // Create a new city button
    function createButton() {
        const city = JSON.parse(localStorage.getItem('coords'));
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.long}&appid=${apiKey}&units=imperial`)
        .then(function (response) {
            return response.json()
                .then(function (data) {
                        let list = document.createElement('button');
                        list.classList.add('btn', 'bg-primary', 'text-light', 'mt-2', 'btn-city');
                        list.setAttribute('data-city', city.name);
                        searchList.append(list);
                        list.textContent = city.name;
                })
        })
    }
    
    // Adds event listeners to the search list.
    searchList.addEventListener('click', function (event) {
        let dataFromButton = event.target.getAttribute('data-city');
        showWeatherClickingOnButton(dataFromButton);
    })
    searchBtn.addEventListener('click', getLatitudeAndLongitude); 