const SearchBtn = document.querySelector('.search-btn');



class WeatherIndicators {
    constructor(weather) {

        this.weather = weather;

        this.temp = weather.main.temp;
        this.pressure = weather.main.pressure;
        this.humidity = weather.main.humidity;
        this.speed = weather.wind.speed;
        this.deg = weather.wind.deg;
        this.icon = weather.weather.icon;
        this.city = weather.name;
    }

    render() {
        let WeatherWrap = document.querySelector('.weather-info-wrap');
        let Container = document.querySelector('.container'); 
    
        WeatherWrap.innerHTML = `
            <div class="weather-info">
                <div class="weather-city">${this.city}</div>
                <div class="weather-temp">${this.temp} &#8451;</div>
                <div class="weather-description-info">${this.buildWeatherDescription()}</div>
                <div class="weather-pressure"><span>pressure: </span> ${this.pressure} hPa</div>
                <div class="weather-humidity"><span>humidity: </span>${this.humidity} %</div>
                <div class="weather-wind-info">
                    <span>wind: </span>
                    <div class="weather-speed"> ${this.speed} km/h; </div>
                    <div class="weather-deg"> ${this.deg} ${this.degToCompass()}</div>
                </div>
            </div>
        `;
    }

    degToCompass() {
        let num = this.weather.wind.deg;
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    buildWeatherDescription() {
        let WeatherHtml = '';
        this.weather.weather.forEach( element => {
            console.log('!@#', element);

            let iconURL = `http://openweathermap.org/img/w/${element.icon}.png`;
            let img = document.createElement("img");
            img.setAttribute("src", iconURL);
            
            WeatherHtml += img.outerHTML;
            WeatherHtml += element.description;
        });

        return WeatherHtml;
    }

}

SearchBtn.addEventListener('click', function(e) {
    e.preventDefault()

    let city = document.querySelector('#city').value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
    .then(response => response.json())
    .then(function(weather) {
        var bobject = new WeatherIndicators(weather);
        bobject.render();
    })

    document.querySelector("#city").value = "";
});

