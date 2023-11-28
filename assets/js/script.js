//Assign global variables to work into functions
var inputValueEl = document.querySelector('#searchInput');
var searchDisplayed = document.querySelector('.col');
var cityContainer = document.querySelector('.col-8');
var btnSearch = document.querySelector('#searchButton');
var searchFormContainer = document.querySelector('#searchForm');
var forecastDiv = document.querySelector('#forecast');

function printSearch(){

    //Card elements created inside of printSearch functions => User input's value
    //will match with API information and be displayed on the screen.

    var liContainer = document.createElement('div');
    liContainer.classList.add('list-group');

    //When they press in each saved cityBtn - info will be displayed.
    var btnCities = document.createElement('button');
    btnCities.classList.add('btnCities');
    //Grab the values that the User is entering
    btnCities.textContent = inputValueEl.value;
    console.log(inputValueEl);
    btnCities.classList.add('list-group-item', 'list-group-item-action');
    btnCities.setAttribute('type', 'button');

    liContainer.append(btnCities);
    searchDisplayed.append(liContainer);

}

//Functions for the Search btn
btnSearch.addEventListener('click', (e)=>{
    var city = inputValueEl.value;
    e.preventDefault()
    printSearch();
    getApi(city)
    searchApi(city);
    dailyForecast();
})

//We set up the API request function.
function getApi(cityName){
    var apiKey = 'ec0ea5aae4cf2181b6d4de5b98e0bd90';
    var callApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + encodeURIComponent(cityName) + '&appid=' + apiKey;
    //Encode values for URL parameter => empty spaces.
    console.log(callApi)

    fetch(callApi)
    .then(function(response){
        if(!response.ok){
            throw response.json()
        }
        return response.json()
    })
    .then(function(apiRes){
        searchApi(apiRes)
        dailyForecast(apiRes)
    })
    
};

//Elements will be created regarding the API call
function searchApi(apiRes){
    // City name, date and weather conditions, the temperature, the humidity, and the Wind Speed.
        cityContainer.textContent = '';
        console.log(apiRes);

            //Creates a card Container that displays the city info.
            var cardContainer = document.createElement('div'); //width 100%
            cardContainer.classList.add('card');

            var cityDisplayed = document.createElement('div');
            cityDisplayed.classList.add('card-body');

            var textInfo = document.createElement('p');
            textInfo.classList.add('card-text');
            //whatever text is going to display city name - date and specifications


            cityContainer.appendChild(cardContainer);
            cardContainer.appendChild(cityDisplayed);
            cardContainer.appendChild(textInfo);
            cityDisplayed.textContent = apiRes.city.name;

            //API parameters are catched and displayed on the screen.
            textInfo.innerHTML = '<strong>Humidity:</strong>' + apiRes.list[0].main.humidity + ' <strong>Temperature: </strong>' + apiRes.list[0].main.temp + ' <strong>Wind Speed: </strong>' + apiRes.list[0].wind.speed;    

        }


function dailyForecast(apiRes){
    
    forecastDiv.textContent = '';
    //From the API reponse, we call through this function to display all the forecast information.
    for(var i = 0; i < apiRes.list.length; i++){
        var currentDay = dayjs();
        currentDay.format('DD-MM-YYYY');
        //dayjs library is set up
        var dayCast = dayjs(apiRes.list[i].dt_txt).format('DD-MM-YYYY');
        //This dayCast value is displaying just the 5 days forecast.
        console.log(dayCast)

        //If the dayCast value is greater or equal than the current date, 5day forecast will be displayed instead of the each 3 hours format that 
        //the API offers.
        if(dayCast >= currentDay){
            dayCast = apiRes.list[i];
        }
    }
    //For loop to create each forecast container with the information requested.
    for(var i = 0; i < dayCast.length; i++){
        var forecastContainer = document.createElement('div');
        forecastContainer.classList.add('col');
    
        var infoContainer = document.createElement('div');
        infoContainer.classList.add('card-body');
        //date
        var date = document.createElement('h5');
        date.classList.add('card-title');
        date.textContent = dayCast;
    
        //General Information - temperature, the humidity, and the wind speed.
        var temperature = document.createElement('p');
        temperature.innerHTML = '<strong>Temperature:</strong>' + apiRes.list[0].main.temp;

        var humidity = document.createElement('p');
        humidity.innerHTML = '<strong>Humidity:</strong>' + apiRes.list[0].main.humidity;

        var wind = document.createElement('p');
        wind.innerHTML = '<strong>Wind:</strong>' + apiRes.list[0].wind.speed;

        forecastDiv.append(forecastContainer); //Flex-wrap styles.
        forecastContainer.append(infoContainer);
        infoContainer.append(date, temperature, humidity, wind);
    }

} 
