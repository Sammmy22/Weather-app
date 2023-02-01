const apiKey = "Your API key";
const query = document.querySelector("#location");
const btn = document.querySelector("#get");
const display = document.querySelector("#result");

btn.addEventListener("click", function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query.value}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      display.innerHTML = `
            <h2 id="title"><img src="http://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@2x.png"> Weather for: ${data.name}, ${data.sys.country} </h2>
            <table role="grid">
            <tr>
            <th>Temperature</th>
            <td>${data.main.temp} &#8451;</td>
            </tr>
            <tr>
            <th>Feels Like</th>
            <td>${data.main.feels_like} &#8451;</td>
            </tr>
            <tr>
                <th>Humidity</th>
                <td>${data.main.humidity}%</td>
                </tr>
                <tr>
                <th>Wind Speed</th>
                <td>${data.wind.speed} m/s</td>
            </tr>
            <tr>
            <th>Weather</th>
            <td>${data.weather[0].main}</td>
            </tr>
            <tr>
            <th>Pressure</th>
            <td>${data.main.pressure} hPa</td>
            </tr>
            <tr>
                <th>Sunrise</th>
                <td>${new Date(
                  data.sys.sunrise * 1000
                ).toLocaleTimeString()}</td>
                </tr>
                <tr>
                <th>Sunset</th>
                <td>
            ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</td>
            </tr>
            </table>
          `;
    })
    .catch((error) => {
      display.innerHTML = `<p>${error.message}</p>`;
    });
  query.value = "";
});
