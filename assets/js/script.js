//Assign global variables to work into functions
var inputValueEl = document.querySelector('#searchInput').value;
var searchDisplayed = document.querySelector('.col');
var cityContainer = document.querySelector('.col-8');
var btnSearch = document.querySelector('#searchButton');

//Card elements created inside of Search functions => User input's value
//will match with API information and be displayed on the screen.

function printSearch(){
    //Call the requestAPI function.

    var liContainer = document.createElement('div');
    liContainer.classList.add('list-group');

    var btnCities = document.createElement('button');
    btnCities.textContent = inputValueEl.value('');
    console.log(inputValueEl);
    btnCities.classList.add('list-group-item', 'list-group-item-action');
    btnCities.setAttribute('type', 'button');

    liContainer.append(btnCities);
    searchDisplayed.append(liContainer);

}

//API call and request.
function searchApi(){
    var callApi = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid='
}

//Option selected function => will create a second card on the side displaying the city
//information with the 5 day forecast.

//Brush up on API request.
//API methods => .subject? 

