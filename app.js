const SearchBtn = document.querySelector('.search-btn');

class WeatherIndicators {
    constructor(weather) {
        this.data = weather;
    }

    render() {
        if (this.data.cod != 200) {
            this.renderNotice();
        } else {
            this.renderWeather();
        }
    }

    renderNotice() {
        let WeatherWrap = document.querySelector('.weather-info-wrap');

        WeatherWrap.innerHTML = `
            <div class="weather-info">
                <div class="weather-city">${this.data.message}</div>
            </div>
        `;
    }

    renderWeather() {
        let WeatherWrap = document.querySelector('.weather-info-wrap');

        WeatherWrap.innerHTML = `
        <div class="weather-info">
            <div class="weather-city">${this.data.name}</div>
            <div class="weather-temp">${this.data.main.temp} &#8451;</div>
            <div class="weather-description-info">${this.buildWeatherDescription()}</div>
            <div class="weather-pressure"><span>pressure:</span> ${this.data.main.pressure} hPa</div>
            <div class="weather-humidity"><span>humidity:</span> ${this.data.main.humidity} %</div>
            <div class="weather-wind-info">
                <span>wind:</span>
                <div class="weather-speed"> ${this.data.wind.speed} km/h; </div>
                <div class="weather-deg"> ${this.data.wind.deg} ${this.degToCompass(this.data.wind.deg)}</div>
            </div>
        </div>
        `;
    }

    degToCompass(deg) {
        var val = Math.floor((deg / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    buildWeatherDescription() {
        let WeatherHtml = '';
        this.data.weather.forEach( element => {
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
    .then(function(data) {
        var weatherRender = new WeatherIndicators(data);
        weatherRender.render();
    })

    document.querySelector("#city").value = "";
});

