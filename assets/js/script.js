//Assign global variables to work into functions
var inputValueEl = document.querySelector('#searchInput');
var searchDisplayed = document.querySelector('.col');
var cityContainer = document.querySelector('.col-8');
var btnSearch = document.querySelector('#searchButton');
var searchFormContainer = document.querySelector('#searchForm');
var forecastDiv = document.querySelector('#forecast');

//Card elements created inside of Search functions => User input's value
//will match with API information and be displayed on the screen.

function printSearch(){
    //Call the requestAPI function.

    var liContainer = document.createElement('div');
    liContainer.classList.add('list-group');

    //when they press in each saved cityBtn - info will be displayed.
    var btnCities = document.createElement('button');
    btnCities.classList.add('btnCities');
    btnCities.textContent = inputValueEl.value;
    console.log(inputValueEl);
    btnCities.classList.add('list-group-item', 'list-group-item-action');
    btnCities.setAttribute('type', 'button');

    liContainer.append(btnCities);
    searchDisplayed.append(liContainer);

}

btnSearch.addEventListener('click', (e)=>{
    var city = inputValueEl.value;
    e.preventDefault()
    printSearch();
    getApi(city)
    searchApi(city);
    dailyForecast();
    //They need to be saved in localStorage for Search History.
})

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


//API call and request.
function searchApi(apiRes){
    //Request from that API => 
    // city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
        cityContainer.textContent = '';
        console.log(apiRes);

            //Creates a card Container that displays the city info.
            var cardContainer = document.createElement('div'); //width 100%
            cardContainer.classList.add('card');

            var cityDisplayed = document.createElement('div');
            cityDisplayed.classList.add('card-body');
            // cityDisplayed.classList.add('card-body').innerHTML += '<h5>City:</h5>' + apiRes.city[i].name;

            var textInfo = document.createElement('p');
            textInfo.classList.add('card-text');
            //whatever text is going to display city name - date and specifications


            cityContainer.appendChild(cardContainer);
            cardContainer.appendChild(cityDisplayed);
            cardContainer.appendChild(textInfo);
            cityDisplayed.textContent = apiRes.city.name;
            textInfo.innerHTML = '<strong>Humidity:</strong>' + apiRes.list[0].main.humidity + ' <strong>Temperature: </strong>' + apiRes.list[0].main.temp + ' <strong>Wind Speed: </strong>' + apiRes.list[0].wind.speed;    
            }
    // })
    // .catch(function(error){
    //     console.log('Error');
    // })


function dailyForecast(apiRes){

    for(var i = 0; i < apiRes.list.length; i++){
        var currentDay = dayjs();
        currentDay.format('DD-MM-YYYY');
        var dayCast = dayjs(apiRes.list[i].dt_txt).format('DD-MM-YYYY');
        console.log(dayCast)

        if(dayCast >= currentDay){
            dayCast = apiRes.list[i];
        }
    //We can call through this function to display all the forecast information.
    }

    for(var i = 0; i < dayCast.length; i++){
        var forecastContainer = document.createElement('div');
        forecastContainer.classList.add('card');
    
        var infoContainer = document.createElement('div');
        infoContainer.classList.add('card-body');
        //date
        var date = document.createElement('h5');
        date.classList.add('card-title');
        date.textContent = dayCast;
    
        //General Information - temperature, the humidity, and the wind speed.
        var temperature = document.createElement('p');
        temperature.innerHTML = '<strong>Temperature:</strong>' + apiRes.list[0].main.temp;
        // conditions.classList.add('card-text').textContent = '';
        var humidity = document.createElement('p');
        humidity.innerHTML = '<strong>Humidity:</strong>' + apiRes.list[0].main.humidity;

        var wind = document.createElement('p');
        wind.innerHTML = '<strong>Wind:</strong>' + apiRes.list[0].wind.speed;

        forecastDiv.append(forecastContainer); //Flex-wrap styles.
        forecastContainer.append(infoContainer);
        infoContainer.append(date, temperature, humidity, wind);

    }

} 


//Option selected function => will create a second card on the side displaying the city
//information with the 5 day forecast.

//API functionality and localStorage function needs to be fixed.
