//Assign global variables to work into functions
var inputValueEl = document.querySelector('#searchInput');
var searchDisplayed = document.querySelector('.col');
var cityContainer = document.querySelector('.col-8');
var btnSearch = document.querySelector('#searchButton');
var searchFormContainer = document.querySelector('#searchForm');

//We get the parameters from the API
function getParams(){
    var arraySearchElements = document.location.onecall.split('&');

    var query = arraySearchElements[0].split('=').pop();
    var format = arraySearchElements[1].split('=').pop();
    
    searchApi(query, format);
}

//Card elements created inside of Search functions => User input's value
//will match with API information and be displayed on the screen.

function printSearch(){
    //Call the requestAPI function.

    var liContainer = document.createElement('div');
    liContainer.classList.add('list-group');

    //when they press in each saved cityBtn - info will be displayed.
    var btnCities = document.createElement('button');
    btnCities.textContent = inputValueEl.value;
    console.log(inputValueEl);
    btnCities.classList.add('list-group-item', 'list-group-item-action');
    btnCities.setAttribute('type', 'button');

    liContainer.append(btnCities);
    searchDisplayed.append(liContainer);

}

btnSearch.addEventListener('click', (e)=>{
    e.preventDefault()
    printSearch()
    //They need to be saved in localStorage for Search History.
})

//API call and request.
function searchApi(){
    //Request from that API => 
    // city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

    var callApi = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid=ec0ea5aae4cf2181b6d4de5b98e0bd90';

    if(format){
        callApi = 'https://api.openweathermap.org/data/3.0/' + format + '?lat={lat}&lon={lon}&appid=ec0ea5aae4cf2181b6d4de5b98e0bd90';
    }

    callApi = callApi + '&q=' + query;

    fetch(callApi)
    .then(function(response){
        if(!response.ok){
            throw response.json()
        }
        return response.json()
    })
    .then(function(apiRes){
        //write query params in the link so the user knows what they're viewing.
        cityContainer.textContent = apiRes.onecall.query;
        console.log(apiRes);

        if(!apiRes.results.length){
            console.log('Error');
            cityContainer.createElement('h3').textContent = 'No results found';
        }else{
            //Creates a card Container that displays the city info.
            var cardContainer = document.createElement('div'); //width 100%
            cardContainer.classList.add('card')

            var cityDisplayed = document.createElement('div');
            cityDisplayed.classList.add('card-body');
            //whatever text is going to display city name - date and specifications

            cityContainer.append(cardContainer);
            cardContainer.append(cityDisplayed);
            cityDisplayed.textContent = '';
            for(var i = 0; i < apiRes.results.length; i++){
                printSearch(apiRes.results[i]);
            }
        }
    })
}

function dailyForecast(){
    //We can call through this function to display all the forecast information.

    var forecastContainer = document.createElement('div');
    forecastContainer.classList.add('card').setAttribute('style', 'width: 18rem');

    var infoContainer = document.createElement('div');
    infoContainer.classList.add('card-body');
    //date
    var date = document.createElement('h5');
    date.classList.add('card-title').textContent = '';
    //Icon
    var icon = document.createElement('img');
    icon.classList.add('card-img').setAttribute() //Attribute will be set to display either sunny, cloudy, rainy.
    //General Information - temperature, the humidity, and the wind speed.
    var conditions = document.createElement('p');
    conditions.classList.add('card-text').textContent = '';

    infoContainer.append(date, icon, conditions);
    forecastContainer.append(infoContainer);
    cityContainer.append(forecastContainer); //Flex-wrap styles.

} 

// searchApi()

//Option selected function => will create a second card on the side displaying the city
//information with the 5 day forecast.

//API functionality and localStorage function needs to be fixed.
